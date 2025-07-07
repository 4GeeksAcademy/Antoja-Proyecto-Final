import { useState } from "react";
import Swal from 'sweetalert2';

export const RecoveryPassword = () => {

    const [email, setEmail] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Favor ingresar un correo válido",
            });
            return
        }

        const urlbackend = import.meta.env.VITE_BACKEND_URL;

        const response = await fetch(`${urlbackend}/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(email)
        })
        if (response.ok) {
            Swal.fire("Link enviado exitosamente");
        }
    }

    return (
        <div className="container-recovery vh-100">
            <div className="row justify-content-center">
                <h2 className="text-center my-3 text-dark p-3">Recuperar Contraseña</h2>
                <div className="col-12 col-md-6 rounded-4 py-4 bg-dark">
                    <form
                        onSubmit={handleSubmit}>
                        <div className="form-group mb-3 text-white ">
                            <label htmlFor="btnEmail">Correo electrónico:</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="nombre@gmail.com"
                                id="btnEmail"
                                name="email"
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                            />
                        </div>
                        <button
                            className="btn btn-outline-light w-100">Enviar link de recuperación</button>
                    </form>
                </div>
            </div>
        </div>
    )
}