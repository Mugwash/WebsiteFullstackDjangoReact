from django.urls import include, path
from .views import *

urlpatterns = [
    path('update-repo-data/', UpdateRepoData.as_view(), name='register'),
    path('get-repo-data/', GetRepoData.as_view(), name='get-repo-data'),
]