from django.db import models


class Speciality(models.Model):
    name = models.CharField(max_length=255)
