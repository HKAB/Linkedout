from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, serializers
from drf_yasg.utils import swagger_auto_schema
from rest_framework.parsers import MultiPartParser
from rest_framework.exceptions import ParseError

from app.models.skill import Skill
from app.models.post import Post
from app.services.post import list_post, get_post, create_post, update_post, delete_post, set_post_picture


class SkillRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        return instance

    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return Skill.objects.get(name=data)


class PostListView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'PostListIn'
            fields = ['id']

    class OutputSerializer(serializers.ModelSerializer):
        skills = SkillRelatedField(queryset=Skill.objects.all(), many=True)

        class Meta:
            model = Post
            ref_name = 'PostListOut'
            fields = ['id', 'title', 'content', 'published_date', 'post_picture', 'skills']

    permission_classes = [AllowAny]
    authentication_classes = []

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = list_post(**serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_200_OK)


class PostGetView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'PostGetIn'
            fields = ['id']

    class OutputSerializer(serializers.ModelSerializer):
        skills = SkillRelatedField(queryset=Skill.objects.all(), many=True)

        class Meta:
            model = Post
            ref_name = 'PostGetOut'
            fields = ['id', 'title', 'content', 'published_date', 'post_picture', 'skills']

    permission_classes = [AllowAny]
    authentication_classes = []

    @swagger_auto_schema(query_serializer=InputSerializer, responses={200: OutputSerializer})
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        serializer = self.InputSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        result = get_post(**serializer.validated_data)
        return Response(self.OutputSerializer(result).data, status=status.HTTP_200_OK)


class PostCreateView(APIView):
    class InputSerializer(serializers.ModelSerializer):
        skills = SkillRelatedField(queryset=Skill.objects.all(), many=True)

        class Meta:
            model = Post
            ref_name = 'PostCreateIn'
            fields = ['title', 'content', 'skills']

    class OutputSerializer(serializers.ModelSerializer):
        skills = SkillRelatedField(queryset=Skill.objects.all(), many=True)

        class Meta:
            model = Post
            ref_name = 'PostCreateOut'
            fields = ['id', 'title', 'content', 'published_date', 'post_picture', 'skills']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={201: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = create_post(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_201_CREATED)


class PostUpdateView(APIView):
    class InputSerializer(serializers.ModelSerializer):
        id = serializers.IntegerField(required=True)
        skills = SkillRelatedField(queryset=Skill.objects.all(), many=True)

        class Meta:
            model = Post
            ref_name = 'PostUpdateIn'
            fields = ['id', 'title', 'content', 'skills']

    class OutputSerializer(serializers.ModelSerializer):
        skills = SkillRelatedField(queryset=Skill.objects.all(), many=True)

        class Meta:
            model = Post
            ref_name = 'PostCreateOut'
            fields = ['id', 'title', 'content', 'published_date', 'post_picture', 'skills']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={200: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def put(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = update_post(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_200_OK)


class PostDeleteView(APIView):
    class InputSerializer(serializers.Serializer):
        id = serializers.IntegerField(required=True)

        class Meta:
            ref_name = 'PostDeleteIn'
            fields = ['id']

    class OutputSerializer(serializers.ModelSerializer):
        skills = SkillRelatedField(queryset=Skill.objects.all(), many=True)

        class Meta:
            model = Post
            ref_name = 'PostCreateOut'
            fields = ['id', 'title', 'content', 'published_date', 'post_picture', 'skills']

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=InputSerializer, responses={200: OutputSerializer(many=True)})
    @method_decorator(ensure_csrf_cookie)
    def delete(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = delete_post(account=request.user, **serializer.validated_data)
        return Response(self.OutputSerializer(result, many=True).data, status=status.HTTP_200_OK)

class PostPictureView(APIView):
    parser_classes = (MultiPartParser,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            set_post_picture(request.user, request.data['id'], request.data['file'])
        except KeyError:
            raise ParseError("'file' and/or 'id' field missing.")
        return Response("Uploaded.", status=status.HTTP_201_CREATED)
