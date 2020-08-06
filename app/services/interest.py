from app.models.job import Post
from app.models.account import Account
from app.models.student import Student
from app.exceptions import InvalidInputFormat


def check(*, account: Account, id: int) -> bool:
    p = Post.objects.filter(id=id).first()
    if not p:
        raise InvalidInputFormat("Post with id {} doesn't exist.".format(id))
        return False
    else:
        if p.interested_students.filter(account=account).exists():
            return True
        return False


def create_interest (*, account: Account, id: int) -> bool:
    p = Post.objects.filter(id=id).first()
    if not p:
        raise InvalidInputFormat("Post with id {} doesn't exist.".format(id))
        return False

    student_account = get_student_account(account)
    if p.interested_students.filter(account=student_account).exists():
        raise InvalidInputFormat("User with id {} already interested post with id {}.".format(account.id, id))
    p.interested_students.add(student_account)
    return True


def delete_interest (*, account: Account, id: int) -> bool:
    p = Post.objects.filter(id=id).first()
    if not p:
        raise InvalidInputFormat("Post with id {} doesn't exist.".format(id))
        return False

    student_account = get_student_account(account)
    if not p.interested_students.filter(account=student_account).exists():
        raise InvalidInputFormat("User with id {} hasn't interest post with id {} yet.".format(account.id, id))
    p.interested_students.remove(student_account)
    return False


def count_interest (*, account: Account, id: int) -> int:
    p = Post.objects.filter(id=id).first()
    if not p:
        raise InvalidInputFormat("Post with id {} doesn't exist.".format(id))
        return 0
    return p.interested_students.count()


def account_interested (*, account: Account, id: int) -> list:
    p = Post.objects.filter(id=id).first()
    if not p:
        raise InvalidInputFormat("Post with id {} doesn't exist.".format(id))
    return [
        {
            'id': s.account.id,
            'firstname': s.firstname,
            'lastname': s.lastname,
            'profile_picture': s.profile_picture,
        } for s in p.interested_students
    ]


def post_interested (*, account: Account, id: int) -> list:
    posts = Post.objects.filter(interested_students__account=get_student_with_id(id))
    return [
        {
            'id': p.id,
            'title': p.title,
            'content': p.content,
            'interest_count': p.interested_students.count(),
        } for p in posts
    ]


def get_student_account(account: Account) -> Student:
    e = Student.objects.filter(account=account).first()
    if e is None:
        raise InvalidInputFormat("Student not found!")
    return e

def get_student_with_id(id: int) -> Student:
    return Student.objects.filter(account_id=id).first()
