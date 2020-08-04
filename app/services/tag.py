from django.db.models import Q

from app.models.skill import Skill
from app.models.title import Title
from app.models.school import School
from app.models.company import Company
from app.models.specialty import Specialty
from app.models.city import City


def get_skill_tag(*, query: str) -> dict:
    tmp = Skill.objects.filter(name__istartswith=query)
    tag_startwith_query = [s.name for s in tmp]
    tmp = Skill.objects.filter(
        Q(name__icontains=query) & ~Q(name__istartswith=query))
    tag_contain_query = [s.name for s in tmp]

    return {
        'tag': (tag_startwith_query + tag_contain_query)[:10]
    }


def get_title_tag(*, query: str) -> dict:
    temp = Title.objects.filter(name__istartswith=query)
    tag_startwith_query = [t.name for t in temp]
    temp = Title.objects.filter(
        Q(name__icontains=query) & ~Q(name__istartswith=query))
    tag_contain_query = [t.name for t in temp]

    return {
        'tag': (tag_startwith_query + tag_contain_query)[:10]
    }


def get_school_tag(*, query: str) -> list:
    temp = School.objects.filter(name__istartswith=query)
    tag_startwith_query = [{'name': t.name, 'logo': t.logo} for t in temp]
    temp = School.objects.filter(
        Q(name__icontains=query) & ~Q(name__istartswith=query))
    tag_contain_query = [{'name': t.name, 'logo': t.logo} for t in temp]

    return (tag_startwith_query + tag_contain_query)[:10]


def get_company_tag(*, query: str) -> dict:
    temp = Company.objects.filter(name__istartswith=query)
    tag_startwith_query = [
        {'name': t.name, 'logo': t.profile_picture} for t in temp]
    temp = Company.objects.filter(
        Q(name__icontains=query) & ~Q(name__istartswith=query))
    tag_contain_query = [
        {'name': t.name, 'logo': t.profile_picture} for t in temp]

    return (tag_startwith_query + tag_contain_query)[:10]


def get_specialty_tag(*, query: str) -> dict:
    temp = Specialty.objects.filter(name__istartswith=query)
    tag_startwith_query = [s.name for s in temp]
    temp = Specialty.objects.filter(
        Q(name__icontains=query) & ~Q(name__istartswith=query))
    tag_contain_query = [s.name for s in temp]

    return {
        'tag': (tag_startwith_query + tag_contain_query)[:10]
    }


def get_location_tag(*, query: str) -> dict:
    temp = City.objects.filter(name__istartswith=query)
    tag_startwith_query = [s.name for s in temp]
    temp = City.objects.filter(
        Q(name__icontains=query) & ~Q(name__istartswith=query))
    tag_contain_query = [s.name for s in temp]

    return {
        'tag': (tag_startwith_query + tag_contain_query)[:10]
    }
