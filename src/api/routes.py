"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Comment
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
import os
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

def set_password(password,salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(pass_hash,password,salt):
    return check_password_hash(pass_hash, f"{password}{salt}")

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/register", methods=["POST"])
def add_user():
    data=request.json
    email=data.get("email", None)
    password=data.get("password",None)
    name=data.get("name", None)
    is_admin= data.get("admin", False)
    salt = b64encode(os.urandom(32)).decode("utf-8")
    if email is None or password is None or name is None :
        return jsonify("necesitas completar el email, password y su nombre completo"), 400
    
    user = User()
    user.email = email
    user.name = name
    user.password = set_password(password, salt)
    user.salt = salt
    user.admin = is_admin
    db.session.add(user)
    try:
        db.session.commit()
        return jsonify("User created"), 201
    except Exception as error:
        db.session.rollback()
        return jsonify(f"Error: {error.args}"), 500

@api.route("/login", methods=["POST"])
def handle_login():
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)

    if(email is None or password is None):
        return jsonify("you need to put your email and password"), 400
    
    user= User.query.filter_by(email=email).one_or_none()
    if(user is None):
        return jsonify("Bad Email"), 400
    else:
        if(check_password(user.password,password, user.salt)):
            token = create_access_token(identity=str(user.id))
            return jsonify({"token": token}),200
        else:
            return jsonify("Bad password"),400
        

@api.route("/users" , methods=["GET"])
@jwt_required()
def get_all_users():

    users=User.query.all()
    return jsonify(list(map(lambda item: item.serialize(), users))), 200


@api.route("/me", methods=["GET"])
@jwt_required()
def get_one_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return jsonify("User not found"), 404
    return jsonify(user.serialize()), 200

@api.route("/comment", methods = ["POST"])
def add_comment():
    data = request.json
    if not data:
        return jsonify({"message": "No se recibió un JSON válido"}), 400

    email = data.get("email")
    asunto = data.get("asunto")
    comment = data.get("comment")
    
    
    if not email or not asunto or not comment:
        return jsonify({"message": "Todos los campos (email, asunto y comentario) son obligatorios"}), 400
    
    
    comentario = Comment(email = email, comment= comment, asunto = asunto) 

    db.session.add(comentario)
    try:
        db.session.commit()
        return jsonify({"message": "Gracias por tus comentarios, nos contactaremos a la brevedad"}), 201
    except Exception as error: 
        db.session.rollback()
        return jsonify({"messge": f"Error interno del servidor: {error.args}"}), 500