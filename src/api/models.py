from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    name: Mapped[str] = mapped_column(String(100))
    salt: Mapped[str] = mapped_column(String(200),nullable=False, default=1)



    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name
            # do not serialize the password, its a security breach
        }
    
class Comment(db.Model): 
    __tablename__ = "comment"
    id: Mapped[int] = mapped_column(primary_key = True)
    email: Mapped[str] = mapped_column(String(80), nullable=False)
    asunto : Mapped[str] = mapped_column(String(50), nullable = False)
    comment: Mapped[str] = mapped_column(Text, nullable = False)

