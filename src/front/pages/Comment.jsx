

import { useState } from "react";

const initialState = {
    email: "",
    asunto: "",
    comment: ""
}

export const Comment = () => {
    const [comment, setComment] = useState(initialState)
    const [message, setMessage] = useState(null)

    const handleChange = (event) => {
        setMessage(null);
        setComment({
            ...comment,
            [event.target.name]: event.target.value
        });
    };
    const handleOnSubmit = async (event) => {
        event.preventDefault()
        setMessage(null)

        if (!comment.email || !comment.asunto || !comment.comment) {
            setMessage({ type: 'danger', text: 'Por favor, completa todos los campos.' })
            return
        }

        const backendUrl = import.meta.env.VITE_BACKEND_URL

        try {
            const response = await fetch(`${backendUrl}/comment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(comment)
            })

            const data = await response.json()

            if (response.ok) {
                setMessage({ type: 'success', text: data.message || "¡Gracias por tu comentario!" })
                setComment(initialState)
                return Error(data.message || `Error del servidor: ${response.status}`)
            }

        } catch (error) {
            setMessage({ type: 'danger', text: error.message || "No se pudo enviar el comentario. Inténtalo de nuevo." });
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
                            <div className="me-3"><span className="d-inline-flex justify-content-center align-items-center rounded-3 emoticones">
                                <i className="fa-solid fa-envelope text-white fs-5"></i></span></div>
                            <div><h5 className="mb-1 fw-bold">Email</h5><p className="text-muted mb-0">hello@antoja.com</p></div>
                        </div>
                        <div className="col-md-6 d-flex align-items-start">
                            <div className="me-3"><span className="d-inline-flex justify-content-center align-items-center rounded-3 emoticones">
                                <i className="fa-solid fa-globe text-white fs-5"></i></span></div>
                            <div><h5 className="mb-1 fw-bold">Sitio</h5><p className="text-muted mb-0">antoja.com</p></div>
                        </div>
                        <div className="col-md-6 d-flex align-items-start">
                            <div className="me-3"><span className="d-inline-flex justify-content-center align-items-center rounded-3 emoticones">
                                <i className="fa-solid fa-phone text-white fs-5"></i></span></div>
                            <div><h5 className="mb-1 fw-bold">Telefóno</h5><p className="text-muted mb-0">+123-456-7890</p></div>
                        </div>
                        <div className="col-md-6 d-flex align-items-start">
                            <div className="me-3"><span className="d-inline-flex justify-content-center align-items-center rounded-3 emoticones">
                                <i className="fa-solid fa-location-dot text-white fs-5"></i></span></div>
                            <div><h5 className="mb-1 fw-bold">Ubicacion</h5><p className="text-muted mb-0">Julio Pinto 123</p></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 border rounded-4 py-4 bg-dark">
                    <form onSubmit={handleOnSubmit} className="p-3">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-light">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="nombre@ejemplo.com"
                                name="email"
                                onChange={handleChange}
                                value={comment.email}
                                required
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
                            required
                        >
                            <option value="">¿Cuál es el asunto?</option>
                            <option value="reserva">Reserva</option>
                            <option value="reclamo">Reclamo</option>
                            <option value="comentarios">Comentarios</option>
                            <option value="otros">Otros</option>
                        </select>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label text-light">Comentarios</label>
                            <textarea
                                className="form-control"
                                id="comment"
                                rows="6"
                                name="comment"
                                onChange={handleChange}
                                value={comment.comment}
                                required
                            ></textarea>
                        </div>
                        {message ? (
                            <div className={`alert alert-${message.type} mt-3`} role="alert">
                                {message.text}
                            </div>
                        ) : null}
                        <div className="d-flex justify-content-end mt-4">
                            <button type="submit" className="btn btn-light">
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
