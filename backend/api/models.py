from datetime import datetime
from api import db
from sqlalchemy.inspection import inspect


class Serializer(object):

    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}

    @staticmethod
    def serialize_list(l):
        return [m.serialize() for m in l]


class RevokedTokens(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    jti = db.Column(db.String(40), nullable=False)
    ttype = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    user_role = db.Column(db.String(15), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)


class User:
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    username = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(300), nullable=False)


class Admin(User, db.Model, Serializer):

    def serialize(self):
        s = Serializer.serialize(self)
        del s['password']

        return s


class StaffUser(db.Model, Serializer):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    username = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(300), nullable=False)
    profile_pic = db.Column(
        db.String(100), nullable=False, default='default_male.png')

    def serialize(self):
        s = Serializer.serialize(self)
        del s['password']

        return s


class Product(db.Model, Serializer):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    supplier = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    purchase_date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    min_stock_level = db.Column(db.Integer)
    last_updated = db.Column(db.DateTime)
    usage = db.Column(db.String(255))

    def serialize(self):
        s = Serializer.serialize(self)
        s['last_updated'] = self.last_updated.strftime('%Y-%m-%d %H:%M:%S')
        s['purchase_date'] = self.purchase_date.strftime('%Y-%m-%d')

        return s


class Category(db.Model, Serializer):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(100), nullable=False)


class Supplier(db.Model, Serializer):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    contact_info = db.Column(db.String(255), nullable=False)
