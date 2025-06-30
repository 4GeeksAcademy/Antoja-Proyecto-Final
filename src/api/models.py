from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Text, Integer, Float, ForeignKey, Table, Column, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List

db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    name: Mapped[str] = mapped_column(String(100))
    salt: Mapped[str] = mapped_column(String(200),nullable=False, default=1)
    admin:Mapped[bool] = mapped_column(Boolean, default=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "admin": self.admin
            # do not serialize the password, its a security breach
        }
    
class Comment(db.Model): 
    __tablename__ = "comment"
    id: Mapped[int] = mapped_column(primary_key = True)
    email: Mapped[str] = mapped_column(String(80), nullable=False)
    asunto : Mapped[str] = mapped_column(String(50), nullable = False)
    comment: Mapped[str] = mapped_column(Text, nullable = False)



#Menú Pizzas
class Pizza(db.Model):
    __tablename__ = "pizzas"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(80), unique=True, nullable=False)
    precio: Mapped[int] = mapped_column(Integer, nullable=False)
    imagen_url: Mapped[str] = mapped_column(String(255), nullable=True)
    imagen_public_id: Mapped[str] = mapped_column(String(255), nullable=True)
    categoria: Mapped[str] = mapped_column(String(50), nullable=False, default="Pizza")
    descripcion: Mapped[str] = mapped_column(Text, nullable=True)


    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "precio": self.precio,
            "imagen_url": self.imagen_url,
            "categoria": self.categoria,
            "descripcion": self.descripcion
        }

