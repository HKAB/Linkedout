from django.urls import path, include

from app.views.account import LoginView, RegisterView, ChangePasswordView
from app.views.student import StudentGetView, StudentCreateView, StudentUpdateView, StudentProfilePictureView
from app.views.email import EmailListView, EmailCreateView, EmailUpdateView, EmailDeleteView
from app.views.phone import PhoneListView, PhoneCreateView, PhoneUpdateView, PhoneDeleteView
from app.views.tag import SkillTagView, TitleTagView, SchoolTagView

account_patterns = [
    path('login', LoginView.as_view()),
    path('register', RegisterView.as_view()),
    path('changepassword', ChangePasswordView.as_view()),
]

email_patterns = [
    path('list', EmailListView.as_view()),
    path('create', EmailCreateView.as_view()),
    path('update', EmailUpdateView.as_view()),
    path('delete', EmailDeleteView.as_view()),
]

phone_patterns = [
    path('list', PhoneListView.as_view()),
    path('create', PhoneCreateView.as_view()),
    path('update', PhoneUpdateView.as_view()),
    path('delete', PhoneDeleteView.as_view()),
]

student_patterns = [
    path('get', StudentGetView.as_view()),
    path('create', StudentCreateView.as_view()),
    path('update', StudentUpdateView.as_view()),
    path('upload', StudentProfilePictureView.as_view()),
]

tag_patterns = [
    path('skill', SkillTagView.as_view()),
    path('title', TitleTagView.as_view()),
    path('school', SchoolTagView.as_view()),
]

urlpatterns = [
    path('account/', include((account_patterns, 'account'))),
    path('student/', include((student_patterns, 'student'))),
    path('email/', include((email_patterns, 'email'))),
    path('phone/', include((phone_patterns, 'phone'))),
    path('tag/', include((tag_patterns, 'tag'))),
]
