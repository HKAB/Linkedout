from django.db import models
from .job import Job
from .skill import Skill

class Skill_job(models.Model):
    job=models.ForeignKey(Job,on_delete=models.CASCADE)
    Skill=models.ForeignKey(Skill,on_delete=models.CASCADE)
