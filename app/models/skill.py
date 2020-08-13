from django.db import models

def store_picture ():
    # this is a dummy function, only here so that that makemigrations thing can work
    pass

class Skill(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name
