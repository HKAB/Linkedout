import os
from datetime import date

from app.models.job import Job
from app.models.account import Account
from app.exceptions import InvalidInputFormat


def list_job(*, id: int) -> list:
    jobs = Job.objects.filter(company__account__id=id)
    return [
        {
            'id': j.id,
            'title': j.title,
            'description': j.description,
            'seniority_level': j.seniority_level,
            'employment_type': j.employment_type,
            'published_date': j.published_date,
            'recruitment_url': j.recruitment_url,
            'job_picture':j.job_picture,
            'cities': j.cities,
            'skills': j.skills
        } for j in jobs
    ]


def get_job(*, id: int) -> Job:
    return Job.objects.filter(id=id).first()


def create_job(*, account: Account, title: str, description: str, seniority_level: str,
               employment_type: str, recruitment_url: str, cities: list, skills: list) -> list:
    company_account_check(account)
    job_type_check(employment_type)
    j = Job(
        title=title,
        description=description,
        seniority_level=seniority_level,
        employment_type=employment_type,
        recruitment_url=recruitment_url,
        published_date=date.today()
    )
    j.cities.add(*cities)
    j.skills.add(*skills)
    j.save()

    return list_job(id=account.id)


def update_job(*, account: Account, id: int, title: str, description: str, seniority_level: str,
               employment_type: str, recruitment_url: str, cities: list, skills: list) -> list:
    company_account_check(account)
    job_type_check(employment_type)
    j = Job.objects.filter(id=id)
    j.update(
        title=title,
        description=description,
        seniority_level=seniority_level,
        employment_type=employment_type,
        recruitment_url=recruitment_url,
        published_date=date.today()
    )
    j.first().cities.add(*cities)
    j.first().skills.add(*skills)

    return list_job(id=account.id)


def delete_job(*, account: Account, id: int) -> list:
    company_account_check(account)
    j = Job.objects.filter(id=id).first()
    if j is None:
        raise InvalidInputFormat("Job entry not found!")
    j.delete()
    return list_job(id=account.id)

def set_job_picture(job: Job, file_instance):
    if file_instance.name.split('.')[-1] not in ['png', 'jpg', 'jpeg']:
        raise InvalidInputFormat(
            "File extension must be 'png', 'jpg' or 'jpeg'")
    j=Job.objects.get(job__id=job.id)
    if j.job_picture!=Job._meta.get_field('job_picture').get_default():
        old_file_path=os.path.join(MEDIA_ROOT,j.job_picture.name)
        if os.path.exists(old_file_path):
            os.remove(old_file_path)
    j.job_picture.save(file_instance.name, file_instance, save=True)


def company_account_check(account: Account, raise_exception=True):
    if account.account_type != 'company':
        if raise_exception:
            raise InvalidInputFormat(
                'Account {} is not a company account.'.format(account.id))
        return False
    return True


def job_type_check(employment_type: str, raise_exception=True):
    if employment_type not in ['Part-time', 'Full-time']:
        if raise_exception:
            raise InvalidInputFormat('Invalid employment type.')
        return False
    return True
