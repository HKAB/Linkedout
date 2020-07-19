from django.db import models

class Account(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
