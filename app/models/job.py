from django.db import models
from .company import Company
from .title import Title
from .city import City
from .skill import Skill


class Job(models.Model):
 title= models.CharField(max_length=64)
 company=models.ForeignKey(Company,on_delete=models.CASCADE)
 description=models.TextField()
 seniority_level=models.CharField(max_length=16)
 title=models.ForeignKey(Title,on_delete=models.CASCADE)
 employment_type=models.CharField(max_length=16)
 city=models.ForeignKey(City,on_delete=models.CASCADE)
 skill=models.ForeignKey(Skill,on_delete=models.CASCADE)

