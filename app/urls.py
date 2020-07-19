from django.urls import path, include

from app.views.account import LoginView

urlpatterns = [
    path('login', LoginView.as_view())
]