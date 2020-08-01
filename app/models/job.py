from django.db import models

from .company import Company
from .city import City
from .skill import Skill


class Job(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    description = models.TextField()
    seniority_level = models.CharField(max_length=16)
    employment_type = models.CharField(max_length=16)  # full-time or part-time
    published_date = models.DateField()
    recruitment_url = models.CharField(max_length=1024, default='#')

    cities = models.ManyToManyField(City)
    skills = models.ManyToManyField(Skill)
