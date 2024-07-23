from api import db
from api.models import Admin, StaffUser
from api.utils import check_hash_password, hash_password, ROLE_ADMIN, ROLE_STAFFUSER


def authenticate(username: str, password: str, role: str):
    if role == ROLE_ADMIN:
        user = Admin.query.filter_by(username=username).first()
    elif role == ROLE_STAFFUSER:
        user = StaffUser.query.filter_by(username=username).first()
    else:
        return None

    if user and check_hash_password(user.password, password):
        return user

    return None
