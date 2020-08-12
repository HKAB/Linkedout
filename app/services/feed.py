from itertools import chain
from random import randint

from app.exceptions import InvalidInputFormat
from app.models.account import Account
from app.models.company import Company
from app.models.job import Job
from app.models.post import Post
from app.models.skill import Skill
from app.models.student import Student


def get_feed(*, account: Account) -> list:
    student = get_student_account(account)

    followed_companies = Company.objects.filter(followers=student)
    job_list = Job.objects.filter(
        company__in=followed_companies).order_by('-published_date')

    already_have_skills = student.skills.all()
    sid = []
    [sid.append(s.id) for s in already_have_skills]
    not_have_skills = Skill.objects.exclude(id__in=sid)
    post_list = Post.objects.filter(
        skills__in=already_have_skills).order_by('-published_date')
    post_list = post_list.exclude(
        skills__in=not_have_skills).order_by('-published_date')

    feed = sorted(chain(job_list, post_list),
                  key=lambda instance: instance.published_date)
    return feed


def suggest_job(*, account: Account) -> list:
    NUMBER_OF_SUGGESTION = 3
    student = get_student_account(account)

    already_have_skills = student.skills.all()
    sid = []
    [sid.append(s.id) for s in already_have_skills]
    not_have_skills = Skill.objects.exclude(id__in=sid)
    job_list = Job.objects.filter(
        skills__in=already_have_skills).order_by('-published_date')
    job_list = job_list.exclude(
        skills__in=not_have_skills).order_by('-published_date')
    job_list = job_list.exclude(
        company__followers=student).order_by('-published_date')

    if job_list.count() < NUMBER_OF_SUGGESTION:
        return job_list
    first_post = randint(0, job_list.count() - NUMBER_OF_SUGGESTION)
    return job_list[first_post:first_post + NUMBER_OF_SUGGESTION]


def suggest_follow (*, account: Account) -> list:
    NUMBER_OF_SUGGESTION = 3
    student = get_student_account(account)

    comps = Company.objects.exclude(followers=student)
    if comps.count() < NUMBER_OF_SUGGESTION:
        return comps
    fst = randint(0, comps.count() - NUMBER_OF_SUGGESTION)
    return comps[fst:fst + NUMBER_OF_SUGGESTION]



def get_student_account(account: Account) -> Student:
    e = Student.objects.filter(account=account).first()
    if e is None:
        raise InvalidInputFormat("Student not found!")
    return e
