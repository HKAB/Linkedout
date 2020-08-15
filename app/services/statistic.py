from app.models.skill import Skill
from app.models.student import Student
from app.models.job import Job
from app.models.post import Post

def students_by_skill () -> list:
    skill_list = Skill.objects.all()
    res = [
        {
            'name': s.name,
            'count': Student.objects.filter(skills=s).count()
        }
        for s in skill_list
    ]
    return sorted(res, key=lambda x: x['name'], reverse=True)


def jobs_by_skill () -> list:
    skill_list = Skill.objects.all()
    res = [
        {
            'name': s.name,
            'count': Job.objects.filter(skills=s).count()
        }
        for s in skill_list
    ]
    return sorted(res, key=lambda x: x['name'], reverse=True)


def posts_by_skill () -> list:
    skill_list = Skill.objects.all()
    res = [
        {
            'name': s.name,
            'count': Post.objects.filter(skills=s).count()
        }
        for s in skill_list
    ]
    return sorted(res, key=lambda x: x['name'], reverse=True)
