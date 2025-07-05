import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const initialState = {
    nombre: "",
    precio: "",
    categoria: "",
    descripcion: ""
};

export const UpdateProducts = () => {
    const { pizzaId } = useParams()
    const navigate = useNavigate()

    const [pizzaData, setPizzaData] = useState(initialState)
    const [imagenFile, setImagenFile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isSubmit, setIsSubmit] = useState(false)

    const loadInitialData = async () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        try {
            const response = await fetch(`${backendUrl}/pizzas/${pizzaId}`);
            if (!response.ok) {
                return Error("No se encontró la pizza.")
            }
            const pizzaToUpdate = await response.json()
            setPizzaData({
                nombre: pizzaToUpdate.nombre,
                precio: pizzaToUpdate.precio,
                categoria: pizzaToUpdate.categoria,
                descripcion: pizzaToUpdate.descripcion || ""
            })

        } catch (error) {
            alert(error.message)
            navigate("/menu")
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        loadInitialData()
    }, [pizzaId])

    const handleChange = (event) => {
        setPizzaData({
            ...pizzaData,
            [event.target.name]: event.target.value
        })
    };

    const handleFileChange = (event) => {
        setImagenFile(event.target.files[0])
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token")
        if (!token) {
            Swal.fire("No estás autenticado. Por favor, inicia sesión.");
            navigate('/login')
            return;
        }
        setIsSubmit(true)

        const formData = new FormData()
        formData.append("nombre", pizzaData.nombre)
        formData.append("precio", pizzaData.precio)
        formData.append("categoria", pizzaData.categoria)
        formData.append("descripcion", pizzaData.descripcion)

        if (imagenFile) {
            formData.append("imagen", imagenFile)
        }

        const backendUrl = import.meta.env.VITE_BACKEND_URL
        try {
            const response = await fetch(`${backendUrl}/pizzas/${pizzaId}`, {
                method: 'PUT',
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            });
            if (response.ok) {
                Swal.fire({
                    title: "Producto actualizado con éxito",
                    icon: "success",
                    draggable: true
                });
                navigate('/menu');
            } else {
                const errorData = await response.json()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Error: ${errorData.message}`,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error de conexión. No se pudieron guardar los cambios.",
            });
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5 vh-100">
                <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div><p className="mt-2">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-dark text-light text-center p-4 rounded-top-4">
                            <h2 className="mb-0">Editar Producto</h2>
                        </div>
                        <div className="card-body p-4 p-md-5">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="nombre" className="form-label">Nombre de la Pizza</label>
                                    <input
                                        type="text"
                                        className="form-control form-control"
                                        id="nombre"
                                        name="nombre"
                                        value={pizzaData.nombre}
                                        onChange={handleChange}
                                        required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="precio" className="form-label">Precio</label>
                                    <div className="input-group input">
                                        <span className="input-group-text">$</span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="precio"
                                            name="precio"
                                            value={pizzaData.precio}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="imagen" className="form-label">Cambiar Imagen (opcional)</label>
                                    <input
                                        type="file"
                                        className="form-control form-control"
                                        id="imagen"
                                        name="imagen"
                                        onChange={handleFileChange}
                                        accept="image/png, image/jpeg" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="selectCategoria" className="form-label">Categoría</label>
                                    <select
                                        id="categoria"
                                        className="form-control w-100 border border-light-subtle"
                                        aria-label="Default select categoria"
                                        onChange={handleChange}
                                        name="categoria"
                                        value={pizzaData.categoria}
                                        required
                                    >
                                        <option value="">Escoge la categoria</option>
                                        <option value="Pizza">Pizza</option>
                                        <option value="Bebida">Bebida</option>
                                        <option value="Postre">Postre</option>
                                        <option value="Extra">Extra</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="descripcion" className="form-label">Descripción (opcional)</label>
                                    <textarea
                                        className="form-control form-control"
                                        id="descripcion"
                                        name="descripcion"
                                        rows="3"
                                        value={pizzaData.descripcion}
                                        onChange={handleChange}
                                        placeholder="Ej: Base de salsa de tomate, mozzarella fresca y pepperoni."
                                    ></textarea>
                                </div>
                                <div className="d-grid mt-5">
                                    <button type="submit" className="btn btn-primary btn-lg fw-bold" disabled={isSubmit}>
                                        {isSubmit ? (<>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            <span className="ms-2">Actualizando...</span>
                                        </>) : ("Guardar Cambios")}

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