from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from app.services.tag import *
from app.utils import inline_serializer


class SkillTagView(APIView):
    class InputSerializer(serializers.Serializer):
        query = serializers.CharField(required=True)

        class Meta:
            ref_name = 'SkillTagIn'
            fields = ['query']

    class OutputSerializer(serializers.Serializer):
        tag = serializers.ListField()

        class Meta:
            ref_name = 'SkillTagOut'
            fields = ['tag']

    permission_classes = [AllowAny]

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = get_skill_tag(**serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class TitleTagView(APIView):
    class InputSerializer(serializers.Serializer):
        query = serializers.CharField(required=True)

        class Meta:
            ref_name = 'TitleTagIn'
            fields = ['query']

    class OutputSerializer(serializers.Serializer):
        tag = serializers.ListField()

        class Meta:
            ref_name = 'TitleTagOut'
            fields = ['tag']

    permission_classes = [AllowAny]

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = get_title_tag(**serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class SchoolTagView(APIView):
    class InputSerializer(serializers.Serializer):
        query = serializers.CharField(required=True)

        class Meta:
            ref_name = 'SchoolTagIn'
            fields = ['query']

    class OutputSerializer(serializers.Serializer):
        name = serializers.CharField()

        class Meta:
            ref_name = 'SchoolTagOut'
            fields = ['name']

    permission_classes = [AllowAny]

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = get_school_tag(**serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_200_OK)


class CompanyTagView(APIView):
    class InputSerializer(serializers.Serializer):
        query = serializers.CharField(required=True)

        class Meta:
            ref_name = 'CompanyTagIn'
            fields = ['query']

    class OutputSerializer(serializers.Serializer):
        name = serializers.CharField()
        logo = serializers.ImageField()

        class Meta:
            ref_name = 'CompanyTagOut'
            fields = ['name', 'logo']

    permission_classes = [AllowAny]

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = get_company_tag(**serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_200_OK)


class SpecialtyTagView(APIView):
    class InputSerializer(serializers.Serializer):
        query = serializers.CharField(required=True)

        class Meta:
            ref_name = 'SpecialtyTagIn'
            fields = ['query']

    class OutputSerializer(serializers.Serializer):
        tag = serializers.ListField()

        class Meta:
            ref_name = 'SpecialtyTagOut'
            fields = ['tag']

    permission_classes = [AllowAny]

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = get_specialty_tag(**serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class LocationTagView(APIView):
    class InputSerializer(serializers.Serializer):
        query = serializers.CharField(required=True)

        class Meta:
            ref_name = 'LocationTagIn'
            fields = ['query']

    class OutputSerializer(serializers.Serializer):
        tag = serializers.ListField()

        class Meta:
            ref_name = 'LocationTagOut'
            fields = ['tag']

    permission_classes = [AllowAny]

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = get_location_tag(**serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)
