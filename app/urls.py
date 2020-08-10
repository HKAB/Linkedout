from django.urls import path, include

from app.views.account import LoginView, RegisterView, ChangePasswordView
from app.views.student import StudentGetView, StudentCreateView, StudentUpdateView, StudentProfilePictureView
from app.views.company import CompanyGetView, CompanyCreateView, CompanyUpdateView, CompanyProfilePictureView
from app.views.skill import SkillListView, SkillCreateView, SkillDeleteView
from app.views.email import EmailListView, EmailCreateView, EmailUpdateView, EmailDeleteView
from app.views.phone import PhoneListView, PhoneCreateView, PhoneUpdateView, PhoneDeleteView
from app.views.education import EducationListView, EducationCreateView, EducationUpdateView, EducationDeleteView
from app.views.experience import ExperienceListView, ExperienceCreateView, ExperienceUpdateView, ExperienceDeleteView
from app.views.job import JobGetView, JobListView, JobCreateView, JobUpdateView, JobDeleteView
from app.views.follow import FollowCheckView, FollowCreateView, FollowDeleteView, FollowCountView, CompanyFollowedView
from app.views.post import PostGetView, PostListView, PostCreateView, PostUpdateView, PostDeleteView
from app.views.interest import InterestCheckView, InterestCreateView, InterestDeleteView, InterestCountView, AccountInterestedView, PostInterestedView
from app.views.tag import SkillTagView, TitleTagView, SchoolTagView, CompanyTagView, SpecialtyTagView, LocationTagView
from app.views.feed import FeedGetView, FeedSuggestJobView, FeedSuggestFollowView


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

company_patterns = [
    path('get', CompanyGetView.as_view()),
    path('create', CompanyCreateView.as_view()),
    path('update', CompanyUpdateView.as_view()),
    path('upload', CompanyProfilePictureView.as_view()),
]

skill_patterns = [
    path('list', SkillListView.as_view()),
    path('create', SkillCreateView.as_view()),
    path('delete', SkillDeleteView.as_view()),
]

education_patterns = [
    path('list', EducationListView.as_view()),
    path('create', EducationCreateView.as_view()),
    path('update', EducationUpdateView.as_view()),
    path('delete', EducationDeleteView.as_view()),
]

experience_patterns = [
    path('list', ExperienceListView.as_view()),
    path('create', ExperienceCreateView.as_view()),
    path('update', ExperienceUpdateView.as_view()),
    path('delete', ExperienceDeleteView.as_view()),
]

job_patterns = [
    path('get', JobGetView.as_view()),
    path('list', JobListView.as_view()),
    path('create', JobCreateView.as_view()),
    path('update', JobUpdateView.as_view()),
    path('delete', JobDeleteView.as_view()),
]

follow_patterns = [
    path('check', FollowCheckView.as_view()),
    path('create', FollowCreateView.as_view()),
    path('delete', FollowDeleteView.as_view()),
    path('count', FollowCountView.as_view()),
    path('company_followed', CompanyFollowedView.as_view()),
]

post_patterns = [
    path('get', PostGetView.as_view()),
    path('list', PostListView.as_view()),
    path('create', PostCreateView.as_view()),
    path('update', PostUpdateView.as_view()),
    path('delete', PostDeleteView.as_view()),
]

interest_patterns = [
    path('check', InterestCheckView.as_view()),
    path('create', InterestCreateView.as_view()),
    path('delete', InterestDeleteView.as_view()),
    path('count', InterestCountView.as_view()),
    path('account_interested', AccountInterestedView.as_view()),
    path('post_interested', PostInterestedView.as_view()),
]

tag_patterns = [
    path('skill', SkillTagView.as_view()),
    path('title', TitleTagView.as_view()),
    path('school', SchoolTagView.as_view()),
    path('company', CompanyTagView.as_view()),
    path('specialty', SpecialtyTagView.as_view()),
    path('location', LocationTagView.as_view()),
]

feed_patterns = [
    path('get', FeedGetView.as_view()),
    path('suggest-job', FeedSuggestJobView.as_view()),
    path('suggest-follow', FeedSuggestFollowView.as_view()),
]

urlpatterns = [
    path('account/', include((account_patterns, 'account'))),
    path('student/', include((student_patterns, 'student'))),
    path('company/', include((company_patterns, 'company'))),
    path('skill/', include((skill_patterns, 'skill'))),
    path('email/', include((email_patterns, 'email'))),
    path('phone/', include((phone_patterns, 'phone'))),
    path('education/', include((education_patterns, 'education'))),
    path('experience/', include((experience_patterns, 'experience'))),
    path('job/', include((job_patterns, 'job'))),
    path('follow/', include((follow_patterns, 'follow'))),
    path('post/', include((post_patterns, 'post'))),
    path('interest/', include((interest_patterns, 'interest'))),
    path('tag/', include((tag_patterns, 'tag'))),
    path('feed/', include((feed_patterns, 'feed'))),
]
