from django.urls import path

from app.views.account import LoginView, RegisterView, ChangePasswordView

urlpatterns = [
    path('account/login', LoginView.as_view()),
    path('account/register', RegisterView.as_view()),
    path('account/changepassword', ChangePasswordView.as_view()),
]
