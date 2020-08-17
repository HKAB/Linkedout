from django.db.models import Q

from app.models.city import City
from app.models.company import Company
from app.models.school import School
from app.models.skill import Skill
from app.models.specialty import Specialty
from app.models.title import Title


def get_skill_tag(*, query: str) -> dict:
    q = (query or '')

    tmp = Skill.objects.filter(name__istartswith=q)
    tag_startwith_query = [s.name for s in tmp]
    tmp = Skill.objects.filter(
        Q(name__icontains=q) & ~Q(name__istartswith=q))
    tag_contain_query = [s.name for s in tmp]

    return {
        'tag': (tag_startwith_query + tag_contain_query)
    }


def get_title_tag(*, query: str) -> dict:
    q = (query or '')

    temp = Title.objects.filter(name__istartswith=q)
    tag_startwith_query = [t.name for t in temp]
    temp = Title.objects.filter(
        Q(name__icontains=q) & ~Q(name__istartswith=q))
    tag_contain_query = [t.name for t in temp]

    return {
        'tag': (tag_startwith_query + tag_contain_query)
    }


def get_school_tag(*, query: str) -> list:
    q = (query or '')

    temp = School.objects.filter(name__istartswith=q)
    tag_startwith_query = [{'name': t.name} for t in temp]
    temp = School.objects.filter(
        Q(name__icontains=q) & ~Q(name__istartswith=q))
    tag_contain_query = [{'name': t.name} for t in temp]

    return (tag_startwith_query + tag_contain_query)


def get_company_tag(*, query: str) -> dict:
    q = (query or '')

    temp = Company.objects.filter(name__istartswith=q)
    tag_startwith_query = [
        {'name': t.name, 'logo': t.profile_picture} for t in temp]
    temp = Company.objects.filter(
        Q(name__icontains=q) & ~Q(name__istartswith=q))
    tag_contain_query = [
        {'name': t.name, 'logo': t.profile_picture} for t in temp]

    return (tag_startwith_query + tag_contain_query)


def get_specialty_tag(*, query: str) -> dict:
    q = (query or '')

    temp = Specialty.objects.filter(name__istartswith=q)
    tag_startwith_query = [s.name for s in temp]
    temp = Specialty.objects.filter(
        Q(name__icontains=q) & ~Q(name__istartswith=q))
    tag_contain_query = [s.name for s in temp]

    return {
        'tag': (tag_startwith_query + tag_contain_query)
    }


def get_location_tag(*, query: str) -> dict:
    q = (query or '')

    temp = City.objects.filter(name__istartswith=q)
    tag_startwith_query = [s.name for s in temp]
    temp = City.objects.filter(
        Q(name__icontains=q) & ~Q(name__istartswith=q))
    tag_contain_query = [s.name for s in temp]

    return {
        'tag': (tag_startwith_query + tag_contain_query)
    }
