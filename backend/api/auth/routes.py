from flask import Blueprint, current_app, request, abort, jsonify
from flask_jwt_extended import jwt_required, create_access_token, create_refresh_token, \
    get_jwt_identity, current_user, get_jwt
from api.models import Admin, RevokedTokens, StaffUser
from api.auth.utils import authenticate, hash_password, ROLE_ADMIN, ROLE_STAFFUSER
from api.main.routes import get_user_identity
from api import jwt_mngr, db
from api.config import ACCESS_TOKEN_EXPIRES

auth = Blueprint('auth', __name__, url_prefix='/api/auth')

# Callback function to check if a JWT exists in the redis blocklist


@jwt_mngr.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
    jti = jwt_payload['jti']
    token = RevokedTokens.query.filter_by(jti=jti).first()
    return token is not None


# For refreshing access token


@auth.route('/refresh_token')
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    role = get_jwt().get('role', None)

    access_token = create_access_token(identity=get_user_identity(
        identity, role), additional_claims={'role': role})
    return jsonify(access_token=access_token)


@auth.route('/createAdmin', methods=['GET'])
def create_admin():
    with current_app.app_context():
        # db.create_all()
        password = 'zayyad1010'
        admin = Admin(username='zayyad',
                      password=hash_password(password))
        db.session.add(admin)
        db.session.commit()
    return jsonify(msg='Created successfully!')

# Endpoint for revoking the current users access token.


@auth.route('/logout', methods=['DELETE'])
@jwt_required(verify_type=False)
def logout():
    token = get_jwt()
    print(token)
    jti = token['jti']
    ttype = token['type']
    role = token['role']

    db.session.add(RevokedTokens(jti=jti, ttype=ttype,
                   user_id=current_user.id, user_role=role))
    db.session.commit()

    return jsonify(msg=f"{ttype.capitalize()} token successfully revoked", succeeded=True)


@auth.route('create_staffs')
def create_staffs():
    with current_app.app_context():
        staffs = Staff.query.all()
        for staff in staffs:
            profile_pic = "default_female.png" if staff.gender == "FEMALE" else "default_male.png"
            gsm = staff.gsm if staff.gsm else '08010000000'
            db.session.add(StaffUser(username=gsm,
                           password=hash_password(gsm), profile_pic=profile_pic))
        db.session.commit()
    return jsonify(msg='All staffs created')


@auth.route('/login_admin', methods=['POST'])
def login_admin():
    return do_login(ROLE_ADMIN)


@auth.route('/login_staffuser', methods=['POST'])
def login_staff():
    return do_login(ROLE_STAFFUSER)


def do_login(role):
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify(msg="Missing username or password"), 400

    with current_app.app_context():
        user = authenticate(username, password, role)

        if not user:
            return jsonify(msg="Invalid username or password", succeeded=False), 401

        access_token = create_access_token(
            identity=user, additional_claims={'role': role})
        refresh_token = create_refresh_token(
            identity=user, additional_claims={'role': role})

        return jsonify(access_token=access_token, refresh_token=refresh_token, succeeded=True, current_user=user.serialize(), role=role, is_authenticated=True)
