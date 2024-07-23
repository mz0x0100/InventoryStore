from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from api.models import Supplier
from api import db

supplier = Blueprint("supplier", __name__, url_prefix='/api/suppliers')


@supplier.route('/list', methods=['GET'])
# @jwt_required()
def get_suppliers():
    suppliers = [supplier.serialize() for supplier in Supplier.query.all()]
    return jsonify(suppliers=suppliers)


@supplier.route('/new', methods=['POST'])
@jwt_required()
def add_supplier():
    data = request.get_json()
    new_supplier = Supplier(
        name=data['name'], contact_info=data['contact_info'])
    db.session.add(new_supplier)
    db.session.commit()
    return jsonify(msg='New supplier added'), 201


@supplier.route('/update', methods=['POST'])
@jwt_required()
def update_supplier():
    supplier_id = request.json.get('id')
    if not supplier_id:
        return jsonify(msg='Unknown supplier id', priority=4)
    supplier = Supplier.query.get_or_404(supplier_id)
    supplier.name = request.json.get('name', supplier.name)
    supplier.contact_info = request.json.get(
        'contact_info', supplier.contact_info)
    db.session.commit()
    return jsonify(msg='Supplier updated')


@supplier.route('/delete', methods=['DELETE'])
@jwt_required()
def delete_supplier():
    supplier = Supplier.query.get_or_404(request.json.get('id'))
    db.session.delete(supplier)
    db.session.commit()
    return jsonify(msg='Supplier deleted')
