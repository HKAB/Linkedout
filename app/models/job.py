from django.db import models

from .company import Company
from .city import City
from .skill import Skill

def store_picture(instance, filename: str) -> str:
    extension = filename.split('.')[-1]
    return "job/job_" + "{}.{}".format(instance.job.id, extension)


class Job(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    description = models.TextField()
    seniority_level = models.CharField(max_length=16)
    employment_type = models.CharField(max_length=16)  # full-time or part-time
    published_date = models.DateField()
    recruitment_url = models.CharField(max_length=1024, default='#')
    job_picture = models.ImageField(upload_to=store_picture, default='job/default.jpg')
    cities = models.ManyToManyField(City)
    skills = models.ManyToManyField(Skill)
