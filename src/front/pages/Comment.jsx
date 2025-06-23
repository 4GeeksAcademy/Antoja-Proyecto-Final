
import { useState } from "react";


const initialState = {
    email: "",
    asunto: "",
    comment: ""
}

export const Comment = () => {
    const [comment, setComment] = useState(initialState)

    const handleChange = (event) => {
        setComment({
            ...comment,
            [event.target.name]: event.target.value
        })
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        
        const response = await fetch(`${backendUrl}/comment`, 
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            }
        )
        if(response.ok){
                setComment(initialState)
            }
        else if (response.status === 400){
            alert("Necesitas un email de contacto, asunto y tu comentario")
        }
        else {
            alert("Hubo un error al registrar tu comentario")
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1 className="text-center">Comment</h1>
                <div className="col-12 col-md-8 border py-4">
                    <form onSubmit={handleOnSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="name@example.com"
                                name="email"
                                onChange={handleChange}
                                value={comment.email} 
                            />
                        </div>
                        <label htmlFor="selectAsunto" className="form-label">Asunto</label>
                        <select 
                            id="selectAsunto" 
                            className="form-select mb-3" 
                            aria-label="Default select example" 
                            onChange={handleChange}
                            name="asunto"
                            value={comment.asunto}
                        >
                            <option value="">¿Cuál es el asunto?</option>
                            <option value="reserva">Reserva</option>
                            <option value="reclamo">Reclamo</option>
                            <option value="comentarios">Comentarios</option>
                            <option value="otros">Otros</option>
                        </select>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Comment</label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="6"
                                name="comment"
                                onChange={handleChange}
                                value={comment.comment}
                            >
                            </textarea>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button 
                                className="btn btn-outline-primary"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};