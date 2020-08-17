from django.urls import include, path

from app.views.account import ChangePasswordView, LoginView, RegisterView
from app.views.company import (CompanyCreateView, CompanyGetView,
                               CompanyProfilePictureView, CompanyUpdateView)
from app.views.education import (EducationCreateView, EducationDeleteView,
                                 EducationListView, EducationUpdateView)
from app.views.email import (EmailCreateView, EmailDeleteView, EmailListView,
                             EmailUpdateView)
from app.views.experience import (ExperienceCreateView, ExperienceDeleteView,
                                  ExperienceListView, ExperienceUpdateView)
from app.views.feed import (FeedGetView, FeedSuggestFollowView,
                            FeedSuggestJobView)
from app.views.follow import (CompanyFollowedView, FollowCheckView,
                              FollowCountView, FollowCreateView,
                              FollowDeleteView)
from app.views.interest import (AccountInterestedView, InterestCheckView,
                                InterestCountView, InterestCreateView,
                                InterestDeleteView, PostInterestedView)
from app.views.job import (JobCreateView, JobDeleteView, JobGetView,
                           JobListView, JobPictureView, JobUpdateView)
from app.views.phone import (PhoneCreateView, PhoneDeleteView, PhoneListView,
                             PhoneUpdateView)
from app.views.post import (PostCreateView, PostDeleteView, PostGetView,
                            PostListView, PostPictureView, PostUpdateView)
from app.views.search import SearchView
from app.views.skill import SkillCreateView, SkillDeleteView, SkillListView
from app.views.statistic import (JobsBySkillView, PostsBySkillView,
                                 StudentsBySkillView)
from app.views.student import (StudentCreateView, StudentGetView,
                               StudentProfilePictureView, StudentUpdateView)
from app.views.tag import (CompanyTagView, LocationTagView, SchoolTagView,
                           SkillTagView, SpecialtyTagView, TitleTagView)

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
    path('upload', JobPictureView.as_view()),
]

follow_patterns = [
    path('check', FollowCheckView.as_view()),
    path('create', FollowCreateView.as_view()),
    path('delete', FollowDeleteView.as_view()),
    path('count', FollowCountView.as_view()),
    path('company-followed', CompanyFollowedView.as_view()),
]

post_patterns = [
    path('get', PostGetView.as_view()),
    path('list', PostListView.as_view()),
    path('create', PostCreateView.as_view()),
    path('update', PostUpdateView.as_view()),
    path('delete', PostDeleteView.as_view()),
    path('upload', PostPictureView.as_view()),
]

interest_patterns = [
    path('check', InterestCheckView.as_view()),
    path('create', InterestCreateView.as_view()),
    path('delete', InterestDeleteView.as_view()),
    path('count', InterestCountView.as_view()),
    path('account-interested', AccountInterestedView.as_view()),
    path('post-interested', PostInterestedView.as_view()),
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

statistic_patterns = [
    path('students-by-skill', StudentsBySkillView.as_view()),
    path('jobs-by-skill', JobsBySkillView.as_view()),
    path('posts-by-skill', PostsBySkillView.as_view()),
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
    path('statistic/', include((statistic_patterns, 'statistic'))),
    path('search', SearchView.as_view())
]
