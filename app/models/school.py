from django.db import models

class School(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=512, null=True)
    