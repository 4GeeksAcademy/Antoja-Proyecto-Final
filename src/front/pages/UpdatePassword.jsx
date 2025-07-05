import { useState } from "react"
import { useSearchParams, Link, useNavigate } from "react-router-dom"

export const UpdatePassword = () => {

    const [newPass, setNewPass] = useState("")
    const [searchParams, _] = useSearchParams()
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const url = import.meta.env.VITE_BACKEND_URL

        const response = await fetch(`${url}/update-password`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${searchParams.get("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPass)
        })

        if (response.ok) {
            navigate("/login")
        }
    }

    return (
        <div className="container-update">
            <div className="row justify-content-center">
                <h2 className="text-center my-3 p-3">Actualizar Contraseña</h2>
                <div className="col-12 col-md-6" >
                    <form
                        className="border m-2 p-3"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group mb-3">
                            <label htmlFor="btnPassword">Nueva contraseña: </label>
                            <input
                                type="text"
                                placeholder="contraseña"
                                className="form-control"
                                id="btnPassword"
                                name="password"
                                onChange={(event) => setNewPass(event.target.value)}
                                value={newPass}
                            />
                        </div>
                        <button
                            className="btn btn-outline-primary w-100"
                        >Actualizar contraseña</button>
                    </form>
                </div>
                <div className="w-100"></div>
            </div>
        </div>
    )
}