from django.urls import path
from .views import get_tasks, task_detail, register

urlpatterns = [
    path('tasks/', get_tasks),
    path('tasks/<str:id>/', task_detail),  # ✅ IMPORTANT
    path('register/', register),
]