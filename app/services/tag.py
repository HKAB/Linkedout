from django.db.models import Q

from app.models.skill import Skill
from app.models.title import Title
from app.exceptions import InvalidInputFormat

def get_skill_tag(*, query: str) -> dict:
    temp = Skill.objects.filter(name__istartswith=query)
    tag_startwith_query = [s.name for s in temp]
    temp = Skill.objects.filter(Q(name__icontains=query) & ~Q(name__istartswith=query))
    tag_contain_query = [s.name for s in temp]

    return (tag_startwith_query + tag_contain_query)[:10]

def get_title_tag(*, query: str) -> dict:
    temp = Title.objects.filter(name__istartswith=query)
    tag_startwith_query = [t.name for t in temp]
    temp = Title.objects.filter(Q(name__icontains=query) & ~Q(name__istartswith=query))
    tag_contain_query = [t.name for t in temp]

    return (tag_startwith_query + tag_contain_query)[:10]
