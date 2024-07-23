from datetime import datetime
from functools import wraps
from flask import Blueprint, request, current_app, jsonify
from flask_jwt_extended import jwt_required, get_jwt, verify_jwt_in_request, current_user
from api import jwt_mngr
from api.models import Admin, StaffUser, Product
from api import utils, db

main = Blueprint("main", __name__, url_prefix='/api')


# Decorator for loading the user
@jwt_mngr.user_identity_loader
def user_identity_lookup(user):
    return user.id


# Callback that loads a user from database whenever a protected route is accessed
@jwt_mngr.user_lookup_loader
def user_lookup_callback(jwt_header, jwt_data):
    identity = jwt_data["sub"]
    role = jwt_data.get("role", None)

    return get_user_identity(identity, role)


def get_user_identity(identity, role):
    if role == utils.ROLE_ADMIN:
        return Admin.query.get(identity)
    elif role == utils.ROLE_STAFFUSER:
        return StaffUser.query.get(identity)
    else:
        return None


@main.route("/current_user", methods=['GET'])
@jwt_required(optional=True)
def current():
    if current_user:
        role = get_jwt().get('role')
        return jsonify(current_user=current_user.serialize(), role=role, is_authenticated=True)
    return jsonify(current_user="anonymous", role="anonymous", is_authenticated=False)


def abort_forbid():
    return jsonify(msg='You do not have sufficient permission to access this route'), 403


def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims["role"] == "admin":
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="Admins only!"), 403
        return decorator
    return wrapper


def role_required(roles: list):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims["role"] in roles:
                return fn(*args, **kwargs)
            else:
                return abort_forbid()
        return decorator
    return wrapper


def permission_required(permission: str):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            role = get_jwt().get('role', None)
            if role == 'admin':
                return fn(*args, **kwargs)
            elif role == 'superuser':
                user = get_user_identity(
                    get_jwt().get('sub'), role).serialize()
                if user.get(permission):
                    return fn(*args, **kwargs)
                else:
                    return abort_forbid()
            else:
                return abort_forbid()
        return decorator
    return wrapper
