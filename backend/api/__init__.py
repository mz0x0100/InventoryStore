from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from api.config import Config


app = Flask(__name__)
jwt_mngr = JWTManager()
db = SQLAlchemy()
bcrypt = Bcrypt()


def create_app(config=Config):
    CORS(app)
    app.config.from_object(config)
    jwt_mngr.init_app(app)
    db.init_app(app)
    bcrypt.init_app(app)

    from api.main.routes import main
    from api.auth.routes import auth
    from api.product.routes import product
    from api.category.routes import category
    from api.supplier.routes import supplier

    app.register_blueprint(main)
    app.register_blueprint(auth)
    app.register_blueprint(product)
    app.register_blueprint(category)
    app.register_blueprint(supplier)

    return app
