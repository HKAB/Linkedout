from django.urls import path, include

from app.views.account import LoginView, RegisterView, ChangePasswordView
from app.views.email import EmailListView

account_patterns = [
    path('login', LoginView.as_view()),
    path('register', RegisterView.as_view()),
    path('changepassword', ChangePasswordView.as_view()),
]

email_pattern = [
    path('list', EmailListView.as_view()),
]

urlpatterns = [
    path('account/', include((account_patterns, 'account'))),
    path('email/', include((email_pattern, 'email')))
]
