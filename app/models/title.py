from django.db import models


class Title(models.Model):
    name = models.CharField(max_length=255)
