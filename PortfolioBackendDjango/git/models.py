from django.db import models

# Create your models here.
class LastUpdated(models.Model):
    last_updated = models.DateTimeField(auto_now=True)

class GitProfile(models.Model):
    git_username = models.CharField(max_length=50)

class Repository(models.Model):
    git_profile = models.ForeignKey(GitProfile, on_delete=models.CASCADE, related_name='repositories')
    name = models.CharField(max_length=100)

class Commit(models.Model):
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE, related_name='commits')
    sha = models.CharField(max_length=40)
    message = models.TextField(null=True)
    date = models.DateTimeField(null=True)
    patch = models.TextField(null=True)
    ai_summary = models.TextField(null=True)