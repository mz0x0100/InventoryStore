from datetime import datetime
from flask import Blueprint, request, current_app, jsonify
from flask_jwt_extended import jwt_required
from api.models import Product
from api import utils, db

product = Blueprint("product", __name__, url_prefix='/api/products')


@product.route('/list', methods=['GET'])
# @jwt_required()
def product_list():
    products = [product.serialize() for product in Product.query.all()]
    print(products)
    return jsonify(products=products)


@product.route('/update', methods=['POST'])
@jwt_required()
def update_product():
    print(f"update product: {request.json}")
    product_id = request.json.get('id')
    if not product_id:
        return jsonify(msg='Unknown product id', priority=4)
    product = Product.query.get(product_id)
    if not product:
        return jsonify(msg='Product not found', priority=10)

    product.name = request.json.get('name', product.name)
    product.category = request.json.get('category', product.category)
    product.quantity = request.json.get('quantity', product.quantity)
    product.supplier = request.json.get('supplier', product.supplier)
    product.price = request.json.get('price', product.price)
    product.purchase_date = datetime.strptime(request.json.get(
        'purchase_date', product.purchase_date), '%Y-%m-%d')
    product.location = request.json.get('location', product.location)
    product.min_stock_level = request.json.get(
        'min_stock_level', product.min_stock_level)
    product.last_updated = datetime.utcnow()
    product.usage = request.json.get('usage', product.usage)
    db.session.commit()

    return jsonify(msg="Product updated")


@product.route('/new', methods=['POST'])
@jwt_required()
def add_product():
    data = request.get_json()
    print(f"add product: {data}")
    new_product = Product(
        name=data['name'],
        category=data['category'],
        quantity=data['quantity'],
        supplier=data['supplier'],
        price=data['price'],
        purchase_date=datetime.strptime(data['purchase_date'], '%Y-%m-%d'),
        location=data['location'],
        min_stock_level=data['min_stock_level'],
        last_updated=datetime.now(),
        usage=data['usage']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(msg='Product recorded successfully'), 201


@product.route('/delete', methods=['DELETE'])
@jwt_required()
def delete_product():
    product_id = request.json.get('product_id')
    if not product_id:
        return jsonify(msg='Unknown product id', priority=4)
    product = Product.query.filter_by(id=product_id).first()
    if not product:
        return jsonify(msg='Product not found', priority=10)
    db.session.delete(product)
    db.session.commit()

    return jsonify(msg='Product deleted')
