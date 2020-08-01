from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework import status, serializers
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.exceptions import ParseError
from drf_yasg.utils import swagger_auto_schema

from app.models.company import Company
from app.models.specialty import Specialty
from app.services.company import get_company, create_company, update_company, set_profile_picture


class SpecialtyRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        return instance

    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return Specialty.objects.get(name=data)


class CompanyProfilePictureView(APIView):
    parser_classes = (MultiPartParser,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            set_profile_picture(request.user, request.data['file'])
        except KeyError:
            raise ParseError("'file' field missing.")
        return Response("Uploaded.", status=status.HTTP_201_CREATED)


class CompanyGetView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'CompanyGetIn'
            fields = ['id']

    class OutputSerializer(serializers.ModelSerializer):
        specialties = SpecialtyRelatedField(
            queryset=Specialty.objects.all(),
            many=True
        )

        class Meta:
            model = Company
            ref_name = 'CompanyGetOut'
            fields = ['name', 'website', 'profile_picture', 'specialties', 'description']

    permission_classes = [AllowAny]
    authentication_classes = []

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = get_company(**serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class CompanyCreateView(APIView):
    class InputSerializer(serializers.ModelSerializer):
        specialties = SpecialtyRelatedField(
            queryset=Specialty.objects.all(),
            many=True
        )

        class Meta:
            model = Company
            ref_name = 'CompanyCreateIn'
            fields = ['name', 'website', 'profile_picture', 'specialties', 'description']

    class OutputSerializer(serializers.ModelSerializer):
        specialties = SpecialtyRelatedField(
            queryset=Specialty.objects.all(),
            many=True
        )

        class Meta:
            model = Company
            ref_name = 'CompanyCreateOut'
            fields = ['name', 'website', 'profile_picture', 'specialties', 'description']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={201: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = create_company(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_201_CREATED)


class CompanyUpdateView(APIView):
    class InputSerializer(serializers.ModelSerializer):
        specialties = SpecialtyRelatedField(
            queryset=Specialty.objects.all(),
            many=True
        )

        class Meta:
            model = Company
            ref_name = 'CompanyUpdateIn'
            fields = ['name', 'website', 'profile_picture', 'specialties', 'description']

    class OutputSerializer(serializers.ModelSerializer):
        specialties = SpecialtyRelatedField(
            queryset=Specialty.objects.all(),
            many=True
        )

        class Meta:
            model = Company
            ref_name = 'CompanyUpdateOut'
            fields = ['name', 'website', 'profile_picture', 'specialties', 'description']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def put(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = update_company(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)
