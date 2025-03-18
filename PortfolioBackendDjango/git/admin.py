from django.contrib import admin
# Register your models here.
from .models import GitProfile, Repository, Commit
admin.site.register(GitProfile)
admin.site.register(Repository)
admin.site.register(Commit)

