from django.urls import path

from app.views.account import LoginView, RegisterView, ChangePasswordView
from app.views.email import EmailView

urlpatterns = [
    path('account/login', LoginView.as_view()),
    path('account/register', RegisterView.as_view()),
    path('account/changepassword', ChangePasswordView.as_view()),
    path('account/email', EmailView.as_view())
]
