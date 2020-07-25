from django.db import models

class Company(models.Model):
    company_name=models.CharField(max_length=50)
    company_size=models.CharField(max_length=50)
    website=web = models.URLField('Web Address')
    description=models.TextField(null=True)
    company_avatar=models.ImageField()
   
    
