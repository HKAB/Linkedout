from django.contrib import admin

# Register your models here.

from app.models import *

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    search_fields = ('username', )

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    search_fields = ('firstname', 'lastname', 'account__username', )

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    search_fields = ('name', 'account__username', )

@admin.register(City, Skill, Specialty, Title, School)
class TagAdmin(admin.ModelAdmin):
    search_fields = ('name', )

@admin.register(Email)
class EmailAdmin(admin.ModelAdmin):
    search_fields = ('account__username', 'email', )

@admin.register(Phone)
class PhoneAdmin(admin.ModelAdmin):
    search_fields = ('account__username', 'phone', )

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    search_fields = ('title', )

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    search_fields = ('title', )

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    search_fields = ('student__account__username', )

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    search_fields = ('company__account__username', )

@admin.register(Social)
class SocialAdmin(admin.ModelAdmin):
    search_fields = ('student__account__username', )
