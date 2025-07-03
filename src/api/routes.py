"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Comment, Pizza, Order
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
import os
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import cloudinary.uploader as uploader

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
    is_admin= data.get("is_admin", False)
    salt = b64encode(os.urandom(32)).decode("utf-8")
    if not email or not password or not name :
        return jsonify({"mensaje":"necesitas completar el email, password y su nombre completo"}), 400
    elif(User().query.filter_by(email=email).one_or_none() is not None):
        return jsonify({"mensaje": "este mail ya esta registrado, intento con algun otro"}), 400
    
    user = User()
    user.email = email
    user.name = name
    user.password = set_password(password, salt)
    user.salt = salt
    if email == "antoja.admin@gmail.com":
        user.admin = True
    else:
        user.admin = False
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
            return jsonify({"token": token , 
                            "user":{
                                "id": user.id,
                                "email": user.email,
                                "name": user.name,
                                "is_admin": user.admin
                            }}),200
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
    


@api.route("/pizzas", methods=['GET'])
def get_pizzas():
    try:
        pizzas = Pizza.query.all()
        serialize_pizzas = [pizza.serialize() for pizza in pizzas]
        return jsonify(serialize_pizzas), 200
    except Exception as error:
        return jsonify({"message": f"Error interno: {error.args}"}), 500

@api.route("/pizzas/<int:pizza_id>", methods=['GET'])
def get_single_pizza(pizza_id):
    pizza = Pizza.query.get(pizza_id)
    if not pizza:
        return jsonify({"mesage": "Pizza no encontrada"}), 404
    return jsonify(pizza.serialize()), 200



#Funciones  que tendra el administrador del resto
@api.route("/pizzas", methods=["POST"])
@jwt_required()
def create_pizza():
    data_form = request.form
    data_files = request.files

    if "nombre" not in data_form or "precio" not in data_form:
        return jsonify({"message": "Faltan datos: 'nombre' y 'precio' son requeridos"}), 400
    
    if "imagen" not in data_files:
        return jsonify({"message": "Falta el archivo de la imagen"}), 400

    nombre = data_form.get("nombre")
    precio = data_form.get("precio")
    imagen_file = data_files["imagen"]

    try:
        upload_result = uploader.upload(imagen_file, folder="pizzas")
    except Exception as error:
        return jsonify({"message": "Error al subir la imagen", "error": str(error)}), 500

        
    pizza_nueva = Pizza(
        nombre=nombre,
        precio=int(precio),
        imagen_url=upload_result.get("secure_url"),
        imagen_public_id=upload_result.get("public_id"),
        categoria=data_form.get("categoria", "Pizza"),
        descripcion=data_form.get("descripcion")
    )

    db.session.add(pizza_nueva)
    try:
        db.session.commit()
        return jsonify(pizza_nueva.serialize()), 201
    except Exception as error:
        db.session.rollback()
        uploader.destroy(upload_result.get("public_id"))
        return jsonify({"message": f"Error al guardar en la base de datos: {error.args}"}), 500
    

@api.route("/pizzas/<int:pizza_id>", methods=['DELETE'])
@jwt_required()
def delete_pizza(pizza_id):
    pizza = Pizza.query.get(pizza_id)
    if not pizza:
        return jsonify({"messg": "Pizza no encontrada"}), 404
    db.session.delete(pizza)

    try:
        db.session.commit()
        return jsonify({"message": f"Pizza eliminada correctamente"}), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": f"Error al eliminar la pizza: {error.args}"}), 500
    
    


@api.route("/pizzas/<int:pizza_id>", methods=["PUT"])
@jwt_required()
def update_pizza(pizza_id):
    pizza = Pizza.query.get(pizza_id)
    if not pizza:
        return jsonify({"message": "Pizza no encontrada"}), 404

    data_form = request.form
    data_files = request.files

    pizza.nombre = data_form.get("nombre", pizza.nombre)
    pizza.precio = int(data_form.get("precio", pizza.precio))
    pizza.categoria = data_form.get("categoria", pizza.categoria)
    pizza.descripcion = data_form.get("descripcion", pizza.descripcion)

    if "imagen" in data_files and data_files["imagen"].filename != "":
        nueva_imagen_file = data_files["imagen"]
        public_id_antiguo = pizza.imagen_public_id

        try:
            upload_result = uploader.upload(nueva_imagen_file, folder="pizzas")

            pizza.imagen_url = upload_result.get("secure_url")
            pizza.imagen_public_id = upload_result.get("public_id")
            
            if public_id_antiguo:
                uploader.destroy(public_id_antiguo)

        except Exception as error:
            return jsonify({"message": "Error al actualizar la imagen en Cloudinary", "error": str(error)}), 500

    
    try:
        db.session.commit()
        return jsonify(pizza.serialize()), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": f"Error al actualizar la pizza: {error.args}"}), 500

@api.route("/orders", methods=["POST"])
def crear_order():
    data = request.get_json()
    user_id = data.get("user_id")
    items = data.get("items", [])

    if not user_id or not items:
        return jsonify({"mensaje": "Falta user_id o items"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404

    # Crear la order
    order = Order(user_id=user_id, total_price=0)
    total = 0
    pizza_order=[]

    for item in items:
        pizza_id = item.get("pizza_id")
        quantity = item.get("quantity", 1)

        pizza = Pizza.query.get(pizza_id)
        if not pizza:
            continue  # o devolver error si querés validar todo

        pizza_order.append(pizza.serialize().get("nombre") + " cantidad " + str(quantity))
       # pizza_order.append(pizza.serialize())
        total += pizza.precio * quantity


    order.total_price = total
    order.pizza_name = pizza_order
    print(order.pizza_name)
    #for item in pizza_order:
     #   item_name = item
      #  order.pizza_name.append(item_name)
    db.session.add(order)
    try:
        db.session.commit()
        return jsonify({
        "mensaje": "order creada exitosamente",
        "order": pizza_order,
        "order_id": order.id,
        "total": order.total_price
    }), 201
    
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": f"Error al crear la order: {error.args}"}), 500


