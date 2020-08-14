from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

from app.models.job import Job
from app.models.post import Post
from app.models.company import Company
from app.models.student import Student
from app.models.skill import Skill
from app.models.city import City
from app.models.specialty import Specialty
from app.services.search import search


class SkillRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        return instance

    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return Skill.objects.get(name=data)

class CityRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        return instance

    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return City.objects.get(name=data)

class SpecialtyRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        return instance

    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return Specialty.objects.get(name=data)

class PostSerializer(serializers.ModelSerializer):
    student_firstname = serializers.SerializerMethodField()
    student_lastname = serializers.SerializerMethodField()
    student_profile_picture = serializers.SerializerMethodField()
    skills = SkillRelatedField(queryset=Skill.objects.all(), many=True)

    def get_student_firstname(self, obj):
        return obj.student.firstname

    def get_student_lastname(self, obj):
        return obj.student.lastname

    def get_student_profile_picture(self, obj):
        return obj.student.profile_picture.url

    def get_type(self, obj):
        return 'post'

    class Meta:
        model = Post
        ref_name = 'PostSerializer'
        fields = ['id', 'student_firstname', 'student_lastname', 'student_profile_picture',
                  'title', 'content', 'published_date', 'post_picture', 'skills']

class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.SerializerMethodField()
    company_profile_picture = serializers.SerializerMethodField()
    cities = CityRelatedField(queryset=City.objects.all(), many=True)
    skills = SkillRelatedField(queryset=Skill.objects.all(), many=True)

    def get_company_name(self, obj):
        return obj.company.name

    def get_company_profile_picture(self, obj):
        return obj.company.profile_picture.url

    def get_type(self, obj):
        return 'job'

    class Meta:
        model = Job
        ref_name = 'JobSerializer'
        fields = ['id', 'company_name', 'company_profile_picture', 'title', 'description',
                  'seniority_level', 'employment_type', 'recruitment_url', 'published_date',
                  'job_picture', 'cities', 'skills']

class CompanySerializer(serializers.ModelSerializer):
    specialties = SpecialtyRelatedField(
        queryset=Specialty.objects.all(),
        many=True
    )

    class Meta:
        model = Company
        ref_name = 'CompanySerializer'
        fields = ['name', 'website', 'description', 'profile_picture', 'specialties']

class StudentSerializer(serializers.ModelSerializer):
    skills = SkillRelatedField(
        queryset=Skill.objects.all(),
        many=True
    )

    class Meta:
        model = Student
        ref_name = 'StudentSerializer'
        fields = ['firstname', 'lastname', 'dateofbirth','gender',
                  'profile_picture', 'description', 'skills']

class SearchView(APIView):
    class InputSerializer(serializers.Serializer):
        type = serializers.CharField(required=True)
        query = serializers.CharField(allow_null=True, required=False)
        skills = serializers.CharField(allow_null=True, required=False)
        specialties = serializers.CharField(allow_null=True, required=False)

        class Meta:
            ref_name = 'SearchIn'
            fields = ['type', 'query', 'skills', 'specialties']

    class OutputSerializer(serializers.Serializer):
        @classmethod
        def get_serializer(cls, model):
            if model == Post:
                return PostSerializer
            elif model == Job:
                return JobSerializer
            elif model == Company:
                return CompanySerializer
            elif model == Student:
                return StudentSerializer

        def to_representation(self, instance):
            serializer = self.get_serializer(instance.__class__)
            return serializer(instance, context=self.context).data

        class Meta:
            ref_name = 'SearchOut'

    permission_classes = [AllowAny]
    authentication_classes = []

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = search(**serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_200_OK)
