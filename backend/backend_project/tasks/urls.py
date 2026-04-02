from django.urls import path
from .views import get_tasks, task_detail, register

urlpatterns = [
    path('tasks/', get_tasks),
    path('tasks/<int:id>/', task_detail),
    path('register/', register),
]