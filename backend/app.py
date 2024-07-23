from api import create_app, db, bcrypt
from api.models import Admin

app = create_app()


def create_admin():
    with app.app_context():
        db.create_all()
        # password = 'zayyad1010'
        # admin = Admin(username='zayyad',
        #               password=bcrypt.generate_password_hash(password, 25))
        # db.session.add(admin)
        # db.session.commit()
        # print('Changes committed')


if __name__ == '__main__':
    app.run(debug=True, port=9090, host='0.0.0.0')
    create_admin()
