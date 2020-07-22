from django.urls import path, include

from app.views.account import LoginView, RegisterView

urlpatterns = [
    path('account/login', LoginView.as_view()),
    path('account/register', RegisterView.as_view())
]
