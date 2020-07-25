from django.db import models

class Title(models.Model):
    title_name=models.CharField(max_length=255)