from flask import Blueprint, request, current_app, jsonify
from flask_jwt_extended import jwt_required
from api.models import Category
from api import db

category = Blueprint("category", __name__, url_prefix='/api/categories')


@category.route('/list', methods=['GET'])
# @jwt_required()
def get_categories():
    categories = [category.serialize() for category in Category.query.all()]
    return jsonify(categories=categories)


@category.route('/new', methods=['POST'])
@jwt_required()
def add_category():
    data = request.get_json()
    new_category = Category(name=data['name'], description=data['description'])
    db.session.add(new_category)
    db.session.commit()

    return jsonify(msg='New category added'), 201


@category.route('/update', methods=['POST'])
@jwt_required()
def update_category():
    category_id = request.json.get('id')
    if not category_id:
        return jsonify(msg='Unknown category id', priority=4)
    category = Category.query.get_or_404(category_id)
    category.name = request.json.get('name', category.name)
    category.description = request.json.get(
        'description', category.description)

    db.session.commit()
    return jsonify(msg='Category updated')


@category.route('/delete', methods=['DELETE'])
@jwt_required()
def delete_category():
    category = Category.query.get_or_404(request.json.get('id'))
    db.session.delete(category)
    db.session.commit()
    return jsonify(msg='Category deleted')
