from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, serializers
from drf_yasg.utils import swagger_auto_schema

from app.services.skill import list_skill, create_skill, delete_skill


class SkillListView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'SkillListIn'
            fields = ['id']

    class OutputSerializer(serializers.Serializer):
        skills = serializers.ListField()

        class Meta:
            ref_name = 'SkillListOut'
            fields = ['skills']

    permission_classes = [AllowAny]
    authentication_classes = []

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer()})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = list_skill(**serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class SkillCreateView(APIView):
    class InputSerializer(serializers.Serializer):
        skill = serializers.CharField(required=True)

        class Meta:
            ref_name = 'SkillCreateIn'
            fields = ['skill']

    class OutputSerializer(serializers.Serializer):
        skills = serializers.ListField()

        class Meta:
            ref_name = 'SkillCreateOut'
            fields = ['skills']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={201: OutputSerializer()})
    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = create_skill(
            account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_201_CREATED)


class SkillDeleteView(APIView):
    class InputSerializer(serializers.Serializer):
        skill = serializers.CharField(required=True)

        class Meta:
            ref_name = 'SkillDeleteIn'
            fields = ['skill']

    class OutputSerializer(serializers.Serializer):
        skills = serializers.ListField()

        class Meta:
            ref_name = 'SkillDeleteOut'
            fields = ['skills']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={200: OutputSerializer()})
    @method_decorator(ensure_csrf_cookie)
    def delete(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = delete_skill(
            account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)
