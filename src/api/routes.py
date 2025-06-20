"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Comment
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/comment", methods = ["POST"])
def add_user():
    data = request.json
    email = data.get("email")
    comment = data.get("comment")
    if email is None:
        return jsonify("Necesitas un email"), 400
    
    comentario = Comment(email = email, comment= comment) 

    db.session.add(comentario)
    try:
        db.session.commit()
        return jsonify("Gracias por tus comentarios, nos contactaremos a la brevedad")
    except Exception as error: 
        db.session.rollback()
        return jsonify(f"Error : {error.args}"), 500