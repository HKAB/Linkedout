from django.db.models import Q
from django.db.models import Count

from app.models.student import Student
from app.models.company import Company
from app.models.job import Job
from app.models.post import Post
from app.exceptions import InvalidInputFormat


def search (*, type: str, **kwargs) -> list:
    if type == 'company':
        return company_search(
            kwargs.get('query') if ('query' in kwargs) else '',
            kwargs.get('specialties') if ('specialties' in kwargs) else ''
        )
    elif type == 'student':
        return student_search(
            kwargs.get('query') if ('query' in kwargs) else '',
            kwargs.get('skills') if ('skills' in kwargs) else ''
        )
    elif type == 'job':
        return job_search(
            kwargs.get('query') if ('query' in kwargs) else '',
            kwargs.get('skills') if ('skills' in kwargs) else ''
        )
    elif type == 'post':
        return post_search(
            kwargs.get('query') if ('query' in kwargs) else '',
            kwargs.get('skills') if ('skills' in kwargs) else ''
        )
    else:
        raise InvalidInputFormat("Invalid search type!")


def company_search (query: str, specialties: str) -> list:
    if specialties == '':
        companies_sw = Company.objects.filter(name__istartswith=query)
        companies_ct = Company.objects.filter(name__icontains=query)
    else:
        specialty_list = specialties.split(',')
        companies_sw = Company.objects.filter(name__istartswith=query, specialties__name__in=specialty_list).annotate(num_attr=Count('specialties')).filter(num_attr=len(specialty_list))
        companies_ct = Company.objects.filter(name__icontains=query, specialties__name__in=specialty_list).annotate(num_attr=Count('specialties')).filter(num_attr=len(specialty_list))

    return list(companies_sw.union(companies_ct, all=False))


def student_search (query: str, skills: str) -> list:
    print(query)
    if skills == '':
        students_sw = Student.objects.filter(Q(firstname__istartswith=query) | Q(lastname__istartswith=query))
        students_ct = Student.objects.filter(Q(firstname__icontains=query) | Q(lastname__icontains=query))
    else:
        skill_list = skills.split(',')
        students_sw = Student.objects.filter((Q(firstname__istartswith=query) | Q(lastname__istartswith=query)) & Q(skills__name__in=skill_list)).annotate(num_attr=Count('skills')).filter(num_attr=len(skill_list))
        students_ct = Student.objects.filter((Q(firstname__icontains=query) | Q(lastname__icontains=query)) & Q(skills__name__in=skill_list)).annotate(num_attr=Count('skills')).filter(num_attr=len(skill_list))

    return list(students_sw.union(students_ct, all=False))


def job_search (query: str, skills: str) -> list:
    if skills == '':
        jobs_ct = Job.objects.filter(title__icontains=query).order_by('-published_date')
    else:
        skill_list = skills.split(',')
        jobs_ct = Job.objects.filter(title__icontains=query, skills__name__in=skill_list).annotate(num_attr=Count('skills')).filter(num_attr=len(skill_list)).order_by('-published_date')

    return list(jobs_ct)


def post_search (query: str, skills: str) -> list:
    if skills == '':
        posts_ct = Post.objects.filter(title__icontains=query).order_by('-published_date')
    else:
        skill_list = skills.split(',')
        posts_ct = Post.objects.filter(title__icontains=query, skills__name__in=skill_list).annotate(num_attr=Count('skills')).filter(num_attr=len(skill_list)).order_by('-published_date')

    return list(posts_ct)
