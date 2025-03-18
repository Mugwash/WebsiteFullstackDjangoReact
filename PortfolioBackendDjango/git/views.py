from django.shortcuts import render
import requests
from rest_framework.response import Response
from rest_framework.views import APIView
from decouple import config # type: ignore
from .models import GitProfile, Repository, Commit, LastUpdated
import logging
import requests
from datetime import datetime

logger = logging.getLogger(__name__)

def get_AI_Summary(content):
    token = config('OPENAI_API_KEY')
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
    }
    data = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "user",
                "content": f"give a short summary limited to 10 lines of what the following commit patch has done using bulletpoints: {content}"
            }
        ]
    }
    response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data)
    return response.json()['choices'][0]['message']['content'] if response.ok else "An error occurred while fetching the summary."


def submit_github_request(url, headers=None, params=None):
    if headers is None:
        headers = {}
    headers['Authorization'] = f"Bearer {config('GIT_PERSONAL_ACCESS_TOKEN')}"
    response = requests.get(url, headers=headers, params=params)
    return response
    
def update_reposiotries(request):
    try:
        git_profile = GitProfile.objects.first()
    except GitProfile.DoesNotExist:
        return {'message': 'GitProfile does not exist for the user'}
    
    try:
        # Fetch the repositories from GitHub
        response = submit_github_request(
            f'https://api.github.com/users/{git_profile.git_username}/repos',
        )
        repositories = response.json()
        
        if not isinstance(repositories, list):  # Check if the response is as expected
            return {'message': 'Invalid response from GitHub'}

        # Sort by last pushed date and take the top 4
        four_recent_repositories = sorted(repositories, key=lambda x: x.get('pushed_at', ''), reverse=True)[:4]
        recent_repo_names = [repo['name'] for repo in four_recent_repositories]

        # Fetch the repositories in the local database for the GitProfile
        existing_repositories = Repository.objects.filter(git_profile=git_profile)
        existing_repo_names = [repo.name for repo in existing_repositories]

        # Remove repositories that are not in the top 4 recent repositories
        for repo in existing_repositories:
            if repo.name not in recent_repo_names:
                repo.delete()

        # Add new repositories if they don't exist in the database
        for repo in four_recent_repositories:
            if not Repository.objects.filter(git_profile=git_profile, name=repo['name']).exists():
                Repository.objects.create(git_profile=git_profile, name=repo['name'])

        return {'message': 'Repositories updated successfully'}
    
    except requests.exceptions.RequestException as e:
        logger.error(f'Error fetching repositories: {e}')
        return {'message': 'Error fetching repositories'}
    
    except Exception as e:
        logger.error(f'Unexpected error: {e}')
        return {'message': 'Error updating repositories'}
    
def update_commits(request):
    git_profile = GitProfile.objects.first()
    repositories = Repository.objects.filter(git_profile=git_profile)
    ai_call_count = 0
    for repo in repositories:
        # Fetch commits from GitHub
        response = submit_github_request(f'https://api.github.com/repos/{git_profile.git_username}/{repo.name}/commits')
        
        # Check if the response is valid and is a list
        try:
            commits = response.json()
            if not isinstance(commits, list):
                logger.error(f'Unexpected response format when fetching commits for {repo.name}: {commits}')
                continue
        except ValueError as e:
            logger.error(f'Error parsing commits for {repo.name}: {e}')
            continue
        
        # Get the top 3 recent commits
        recent_commits = commits[:3]
        recent_commit_shas = [commit['sha'] for commit in recent_commits]

        # Fetch existing commits in the local database for this repository
        existing_commits = Commit.objects.filter(repository=repo)
        existing_commit_shas = [commit.sha for commit in existing_commits]

        # Remove commits from the local database that are not part of the 3 most recent commits
        for commit in existing_commits:
            if commit.sha not in recent_commit_shas:
                commit.delete()

        # Add new commits or update existing ones
        for commit in recent_commits:
            sha = commit['sha']
            commit_info = submit_github_request(f'https://api.github.com/repos/{git_profile.git_username}/{repo.name}/commits/{sha}').json()

            try:
                patch = commit_info['files'][0].get('patch', None)
            except (KeyError, IndexError):
                patch = None

            # Check if the commit already exists
            existing_commit = Commit.objects.filter(repository=repo, sha=sha).first()
            if existing_commit:
                # Update the existing commit without calling get_AI_Summary
                existing_commit.message = commit_info['commit']['message']
                existing_commit.date = commit_info['commit']['author']['date']
                existing_commit.patch = patch
                existing_commit.save()
            else:
                # Create a new commit and call get_AI_Summary
                ai_call_count += 1
                Commit.objects.create(
                    repository=repo,
                    sha=sha,
                    message=commit_info['commit']['message'],
                    date=commit_info['commit']['author']['date'],
                    patch=patch,
                    ai_summary=get_AI_Summary(patch) if patch else None
                )

    return {'message': 'Commits updated successfully, number of calls to AI model: ' + str(ai_call_count)}





class UpdateRepoData(APIView):
    def get(self, request):
        response1 = update_reposiotries(request)
        response2 = update_commits(request)
        LastUpdated.objects.all().delete()
        LastUpdated.objects.create(last_updated=datetime.now().strftime('%d/%m/%Y %H:%M'))
        # Combine both responses into one dictionary
        combined_response = {
            'update_repositories': response1,
            'add_commits': response2,
            'last_updated': LastUpdated.objects.first().last_updated
        }
        # Return a single Response object with the combined result
        return Response(combined_response)
    
class GetRepoData(APIView):
    def get(self, request):
        git_profile = GitProfile.objects.first()
        repositories = Repository.objects.filter(git_profile=git_profile)
        data = []
        for repo in repositories:
            commits = Commit.objects.filter(repository=repo).order_by('-date')
            commit_data = []
            for commit in commits:
                commit_data.append({
                    'sha': commit.sha,
                    'message': commit.message,
                    'date': commit.date,
                    'patch': commit.patch,
                    'ai_summary': commit.ai_summary
                })
            data.append({
                'name': repo.name,
                'commits': commit_data
            })
        last_updated = LastUpdated.objects.first()
        return Response({
            'repositories': data,
            'last_updated': last_updated.last_updated.strftime('%d/%m/%Y %H:%M') if last_updated else None
        })
