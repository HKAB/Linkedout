from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, serializers
from drf_yasg.utils import swagger_auto_schema

from app.services.education import list_education, create_education, update_education, delete_education
from app.utils import inline_serializer


class EducationListView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'EducationListIn'
            fields = ['id']

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        school_name = serializers.CharField()
        start_date = serializers.DateField()
        end_date = serializers.DateField()
        major = serializers.CharField()
        degree = serializers.CharField()

        class Meta:
            ref_name = 'EducationListOut'
            fields = ['id', 'school_name', 'start_date', 'end_date', 'major', 'degree']

    permission_classes = [AllowAny]
    authentication_classes = []

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = list_education(**serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_200_OK)


class EducationCreateView(APIView):
    class InputSerializer(serializers.Serializer):
        school_name = serializers.CharField(required=True)
        start_date = serializers.DateField(required=True)
        end_date = serializers.DateField(required=True)  # Does this really required? idk
        major = serializers.CharField(required=True)
        degree = serializers.CharField(required=True)

        class Meta:
            ref_name = 'EducationCreateIn'
            fields = ['school_name', 'start_date', 'end_date', 'major', 'degree']

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        school_name = serializers.CharField()
        start_date = serializers.DateField()
        end_date = serializers.DateField()
        major = serializers.CharField()
        degree = serializers.CharField()

        class Meta:
            ref_name = 'EducationCreateOut'
            fields = ['id', 'school_name', 'start_date', 'end_date', 'major', 'degree']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={201: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = create_education(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_201_CREATED)


class EducationUpdateView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)
        education = inline_serializer(fields={
            'school_name': serializers.CharField(required=True),
            'start_date': serializers.DateField(required=True),
            'end_date': serializers.DateField(required=True),  # Does this really required? idk
            'major': serializers.CharField(required=True),
            'degree': serializers.CharField(required=True),
        })

        class Meta:
            ref_name = 'EducationUpdateIn'
            fields = ['id', 'education']

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        school_name = serializers.CharField()
        start_date = serializers.DateField()
        end_date = serializers.DateField()
        major = serializers.CharField()
        degree = serializers.CharField()

        class Meta:
            ref_name = 'EducationUpdateOut'
            fields = ['id', 'school_name', 'start_date', 'end_date', 'major', 'degree']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={200: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def put(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = update_education(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_200_OK)


class EducationDeleteView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'EducationDeleteIn'
            fields = ['id']

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        school_name = serializers.CharField()
        start_date = serializers.DateField()
        end_date = serializers.DateField()
        major = serializers.CharField()
        degree = serializers.CharField()

        class Meta:
            ref_name = 'EducationDeleteOut'
            fields = ['id', 'school_name', 'start_date', 'end_date', 'major', 'degree']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={200: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def delete(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = delete_education(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_200_OK)
