from django.db import models

from.company import Company
from .speciality import Speciality

class Spec_com(models.Model):
    company=models.ForeignKey(Company,on_delete=models.CASCADE)
    speciality=models.ForeignKey(Speciality,on_delete=models.CASCADE)