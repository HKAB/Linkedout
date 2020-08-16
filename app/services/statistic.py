from app.models.job import Job
from app.models.post import Post
from app.models.skill import Skill
from app.models.student import Student


def students_by_skill() -> list:
    skill_list = Skill.objects.all()
    res = [
        {
            'name': s.name,
            'count': Student.objects.filter(skills=s).count()
        }
        for s in skill_list if Student.objects.filter(skills=s).count() != 0
    ]
    return sorted(res, key=lambda x: x['name'], reverse=True)


def jobs_by_skill() -> list:
    skill_list = Skill.objects.all()
    res = [
        {
            'name': s.name,
            'count': Job.objects.filter(skills=s).count()
        }
        for s in skill_list if Job.objects.filter(skills=s).count() != 0
    ]
    return sorted(res, key=lambda x: x['name'], reverse=True)


def posts_by_skill() -> list:
    skill_list = Skill.objects.all()
    res = [
        {
            'name': s.name,
            'count': Post.objects.filter(skills=s).count()
        }
        for s in skill_list if Post.objects.filter(skills=s).count() != 0
    ]
    return sorted(res, key=lambda x: x['name'], reverse=True)
