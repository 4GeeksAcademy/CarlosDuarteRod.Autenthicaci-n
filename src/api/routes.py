"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import check_password_hash

api = Blueprint('api', __name__)


@api.route('/hello', methods=['GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/users', methods=['GET'])
def get_user():
    users = db.session.execute(db.select(User).order_by(User.email)).scalars()
    results = [user.serialize() for user in users]
    response_body = {
        "Message": "List of user register",
        "users:": results
    }

    return response_body, 200


@api.route('/register', methods=['POST'])
def create_user():
    # 1. Obterner el contenido JSON de la solicitud POST entrante utilizando el objeto request. El método get_json()analiza y devuelve el contenido JSON de la solicitud
    request_body = request.get_json() 
    # 2. Crear instancia de la clase User. Los valores para las propiedades email y password se toman del request_body
    user = User(email=request_body["email"], password=request_body["password"], is_active=True)
    # 3. Agrega el objeto user a la base de datos
    db.session.add(user)
    # 4.Confirmar los cambios
    db.session.commit()
    
    return ({
        "message": "User registered successfully", 
        'new user': request_body
        }), 200


@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"message": "Missing email or password"}), 400

    # Busca al usuario en la base de datos
    user = User.query.filter_by(email=email, password= password).first()  

    if user: 
        token = create_access_token(identity= user.id)
        return jsonify({"token": token}), 200
    
    return ({"Error": "Bad user or password"}), 400

