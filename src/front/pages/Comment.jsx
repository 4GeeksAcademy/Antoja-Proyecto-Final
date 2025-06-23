
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
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            }
        )
        if (response.ok) {
            setComment(initialState)
        }
        else if (response.status === 400) {
            alert("Necesitas un email de contacto, asunto y tu comentario")
        }
        else {
            alert("Hubo un error al registrar tu comentario")
        }
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center my-5">
                <div className="col-12 col-lg-6 p-4 p-md-5">
                    <h2 className="mb-3 fw-bold">Contáctenos</h2>
                    <p className="lead mb-5">
                        Si tiene preguntas sobre nuestros servicios, necesita asistencia o desea compartir sus comentarios, nuestro equipo especializado está a su disposición para ayudarle en todo momento.
                    </p>
                    <div className="row g-4">
                        <div className="col-md-6 d-flex align-items-start">
                            <div className="me-3">
                                <span className="d-inline-flex justify-content-center align-items-center rounded-3 emoticones">
                                    <i className="fa-solid fa-envelope text-white fs-5"></i>
                                </span>
                            </div>
                            <div>
                                <h5 className="mb-1 fw-bold">Email</h5>
                                <p className="text-muted mb-0">hello@antoja.com</p>
                            </div>
                        </div>


                        <div className="col-md-6 d-flex align-items-start">
                            <div className="me-3">
                                <span className="d-inline-flex justify-content-center align-items-center rounded-3 emoticones">
                                    <i className="fa-solid fa-globe text-white fs-5"></i>
                                </span>
                            </div>
                            <div>
                                <h5 className="mb-1 fw-bold">Sitio</h5>
                                <p className="text-muted mb-0">antoja.com</p>
                            </div>
                        </div>


                        <div className="col-md-6 d-flex align-items-start">
                            <div className="me-3">
                                <span className="d-inline-flex justify-content-center align-items-center rounded-3 emoticones">
                                    <i className="fa-solid fa-phone text-white fs-5"></i>
                                </span>
                            </div>
                            <div>
                                <h5 className="mb-1 fw-bold">Telefóno</h5>
                                <p className="text-muted mb-0">+123-456-7890</p>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-start">
                            <div className="me-3">
                                <span className="d-inline-flex justify-content-center align-items-center rounded-3 emoticones">
                                    <i className="fa-solid fa-location-dot text-white fs-5"></i>
                                </span>
                            </div>
                            <div>
                                <h5 className="mb-1 fw-bold">Ubicacion</h5>
                                <p className="text-muted mb-0">Julio Pinto 123</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 border rounded-3 py-4 bg-dark">
                    <form onSubmit={handleOnSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label text-light">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="nombre@ejemplo.com"
                                name="email"
                                onChange={handleChange}
                                value={comment.email}
                            />
                        </div>
                        <label htmlFor="selectAsunto" className="form-label text-light">Asunto</label>
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
                            <label htmlFor="exampleFormControlTextarea1" className="form-label text-light">Comentarios</label>
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
                                className="btn btn-light"
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