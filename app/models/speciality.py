from django.db import models

class Speciality(models.Model):
    speciality_name=models.CharField(max_length=255)
