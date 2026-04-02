from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),

    # 🔥 LOGIN API (JWT)
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # 🔥 YOUR TASK APP
    path('', include('tasks.urls')),
]