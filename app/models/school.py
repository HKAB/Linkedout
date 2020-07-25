from django.db import models

class School(models.Model):
    school_name=models.CharField(max_length=255)
    short_description =models.TextField(max_length=1024)
    logo=models.ImageField()

