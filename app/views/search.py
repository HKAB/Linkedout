from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers, status
from rest_framework.exceptions import ParseError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from app.models.city import City
from app.models.company import Company
from app.models.job import Job
from app.models.post import Post
from app.models.skill import Skill
from app.models.specialty import Specialty
from app.models.student import Student
from app.services.search import search


class SkillRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        return instance

    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        try:
            return Skill.objects.get(name=data)
        except:
            raise ParseError('Skill doesn\'t exist')


class CityRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        return instance

    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        try:
            return City.objects.get(name=data)
        except:
            raise ParseError('City doesn\'t exist')


class SpecialtyRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        return instance

    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        try:
            return Specialty.objects.get(name=data)
        except:
            raise ParseError('Specialty doesn\'t exist')


class PostSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
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
        fields = ['type', 'id', 'student_firstname', 'student_lastname', 'student_profile_picture',
                  'title', 'content', 'published_date', 'post_picture', 'skills']


class JobSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    company_name = serializers.SerializerMethodField()
    company_profile_picture = serializers.SerializerMethodField()
    cities = CityRelatedField(queryset=City.objects.all(), many=True)
    skills = SkillRelatedField(queryset=Skill.objects.all(), many=True)
    account_id = serializers.SerializerMethodField()

    def get_company_name(self, obj):
        return obj.company.name

    def get_company_profile_picture(self, obj):
        return obj.company.profile_picture.url

    def get_type(self, obj):
        return 'job'

    def get_account_id(self, obj):
        return obj.company.account.id

    class Meta:
        model = Job
        ref_name = 'JobSerializer'
        fields = ['type', 'id', 'account_id', 'company_name', 'company_profile_picture', 'title', 'description',
                  'seniority_level', 'employment_type', 'recruitment_url', 'published_date',
                  'job_picture', 'cities', 'skills']


class CompanySerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    id = serializers.SerializerMethodField()
    specialties = SpecialtyRelatedField(
        queryset=Specialty.objects.all(),
        many=True
    )

    def get_id(self, obj):
        return obj.account.id

    def get_type(self, obj):
        return 'company'

    class Meta:
        model = Company
        ref_name = 'CompanySerializer'
        fields = ['type', 'id', 'name', 'website', 'description', 'profile_picture',
                  'specialties']


class StudentSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    id = serializers.SerializerMethodField()
    skills = SkillRelatedField(
        queryset=Skill.objects.all(),
        many=True
    )

    def get_id(self, obj):
        return obj.account.id

    def get_type(self, obj):
        return 'student'

    class Meta:
        model = Student
        ref_name = 'StudentSerializer'
        fields = ['type', 'id', 'firstname', 'lastname', 'dateofbirth', 'gender',
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
