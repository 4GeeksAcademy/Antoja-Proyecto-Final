from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Text, Integer, Float, ForeignKey, Table, Column, Boolean, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import ARRAY

from typing import List

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    name: Mapped[str] = mapped_column(String(100))
    salt: Mapped[str] = mapped_column(String(200), nullable=False, default=1)
    admin: Mapped[bool] = mapped_column(Boolean, default=False)
    orders: Mapped[List["Order"]] = relationship(back_populates="user")

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
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(80), nullable=False)
    asunto: Mapped[str] = mapped_column(String(50), nullable=False)
    comment: Mapped[str] = mapped_column(Text, nullable=False)

# Menú Pizzas


class Pizza(db.Model):
    __tablename__ = "pizzas"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(
        String(80), unique=True, nullable=False)
    precio: Mapped[int] = mapped_column(Integer, nullable=False)
    imagen_url: Mapped[str] = mapped_column(String(255), nullable=True)
    imagen_public_id: Mapped[str] = mapped_column(String(255), nullable=True)
    categoria: Mapped[str] = mapped_column(
        String(50), nullable=False, default="Pizza")
    orders: Mapped[List["OrderPizza"]] = relationship(back_populates="pizza")

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


class OrderPizza(db.Model):
    __tablename__ = "order_pizza"
    order_id: Mapped[int] = db.Column(
        db.Integer, db.ForeignKey("orders.id"), primary_key=True)
    pizza_id: Mapped[int] = db.Column(
        db.Integer, db.ForeignKey("pizzas.id"), primary_key=True)
    quantity: Mapped[int] = db.Column(db.Integer, nullable=False, default=1)

    order: Mapped["Order"] = relationship(back_populates="pizzas")
    pizza: Mapped["Pizza"] = relationship(back_populates="orders")


class Order(db.Model):
    __tablename__ = "orders"
    id: Mapped[int] = db.Column(db.Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(
        db.ForeignKey("users.id"), nullable=False)
    total_price: Mapped[float] = db.Column(db.Float, nullable=False)
    pizza_name: Mapped[List[String]] = mapped_column(JSON, default=List)

    user: Mapped["User"] = relationship(back_populates="orders")

    pizzas: Mapped[List["OrderPizza"]] = relationship(
        back_populates="order", cascade="all, delete-orphan")
