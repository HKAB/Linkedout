from rest_framework.exceptions import APIException
from rest_framework import status

class InvalidInputFormat(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = ('Invalid input.')
    default_code = 'input_error'