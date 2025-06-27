import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
    nombre: "",
    precio: "",
    imagen_url: ""
}

export const CrearProductos = () => {
    const params = useParams()
    const pizzaId = params.pizzaId
    const navigate = useNavigate()

    const [pizzaData, setPizzaData] = useState(initialState)
    const [loading, setLoading] = useState(true)


    const handleChange = (event) => {
        setPizzaData({
            ...pizzaData,
            [event.target.name]: event.target.value
        });
    };

    const fetchDatosPizza = async () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        try {
            const response = await fetch(`${backendUrl}/pizzas/${pizzaId}`)
            if (!response.ok)
                return Error("No se encontró la pizza")
            const data = await response.json()
            setPizzaData(data)
        } catch (error) {
            console.log("Error:", error)
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchDatosPizza()
    }, [pizzaId])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem("token")

        if (!token) {
            alert("No estás autenticado. Por favor, inicia sesión.")
            navigate('/login')
            return
        }

        const datosActualizados = {
            ...pizzaData,
            precio: parseFloat(pizzaData.precio)
        };

        const backendUrl = import.meta.env.VITE_BACKEND_URL

        try {
            const response = await fetch(`${backendUrl}/pizzas/${pizzaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(datosActualizados)
            });
            if (response.ok) {
                alert("Pizza actualizada con éxito!")
                navigate('/menu');
            }

            else {
                return alert("Ocurrió un error al actualizar.")
            }

        } catch (error) {
            alert("Error de conexión. No se pudo guardar los cambios.")
        }
    };


    if (loading) {
        return <div className="text-center mt-5">
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div><p className="mt-2">Cargando...</p>
        </div>;
    }

    return (
        <div className="container my-5">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-dark text-light text-center p-4 rounded-top-4">
                            <h2 className="mb-0 fw-bold">Crear Producto</h2>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="nombre" className="form-label fw-bold">Nombre de la Pizza</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="nombre"
                                        name="nombre"
                                        value={pizzaData.nombre}
                                        onChange={handleChange}
                                        placeholder="Nombre producto"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="precio" className="form-label fw-bold">Precio</label>
                                    <div className="input-group input-group-lg">
                                        <span className="input-group-text">$</span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="precio"
                                            name="precio"
                                            value={pizzaData.precio}
                                            onChange={handleChange}
                                            placeholder="12000"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="imagen_url" className="form-label fw-bold">URL de la Imagen</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="imagen_url"
                                        name="imagen_url"
                                        value={pizzaData.imagen_url}
                                        onChange={handleChange}
                                        placeholder="imagen.jpg"
                                    />
                                </div>
                                <div className="d-grid mt-5">
                                    <button type="submit" className="btn file-navbar btn-lg fw-bold">
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};