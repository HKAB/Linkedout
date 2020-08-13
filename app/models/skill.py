from django.db import models


def store_picture(instance, filename: str) -> str:
    extension = filename.split('.')[-1]
    return "icon/skill_" + "{}.{}".format(instance.id, extension)


class Skill(models.Model):
    name = models.CharField(max_length=64)
    icon = models.ImageField(upload_to=store_picture,
                             default='icon/skill_default.jpg')

    def __str__(self):
        return self.name
