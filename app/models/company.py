from django.db import models
from django_prometheus.models import ExportModelOperationsMixin

from .account import Account
from .specialty import Specialty
from .student import Student


def store_picture(instance, filename: str) -> str:
    extension = filename.split('.')[-1]
    return "profile/company_" + "{}.{}".format(instance.account.username, extension)


class Company(ExportModelOperationsMixin('company'), models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    website = models.TextField(null=True)
    description = models.TextField(null=True)
    profile_picture = models.ImageField(
        upload_to=store_picture, default='profile/company_default.jpg')

    followers = models.ManyToManyField(
        Student, related_name='company_followed')
    specialties = models.ManyToManyField(Specialty)
