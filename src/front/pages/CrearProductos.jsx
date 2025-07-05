import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const initialState = {
    nombre: "",
    precio: "",
    categoria: "",
    descripcion: ""
};

export const CrearProductos = () => {
    const navigate = useNavigate();

    const [pizzaData, setPizzaData] = useState(initialState)
    const [imagenFile, setImagenFile] = useState(null)

    const handleChange = (event) => {
        setPizzaData({
            ...pizzaData,
            [event.target.name]: event.target.value
        });
    };

    const handleFileChange = (event) => {
        setImagenFile(event.target.files[0])
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!pizzaData.nombre || !pizzaData.precio || !imagenFile) {
            Swal.fire("Por favor, completa todos los campos.")
            return;
        }

        const token = localStorage.getItem("token")

        if (!token) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No tienes las credenciales. Por favor, inicia sesión.",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
            navigate('/login');
            return;
        }

        const formData = new FormData()
        formData.append("nombre", pizzaData.nombre)
        formData.append("precio", pizzaData.precio)
        formData.append("imagen", imagenFile)
        formData.append("descripcion", pizzaData.descripcion)
        formData.append("categoria", pizzaData.categoria)

        const backendUrl = import.meta.env.VITE_BACKEND_URL
        try {
            const response = await fetch(`${backendUrl}/pizzas`, {
                method: 'POST',
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            });
            if (response.ok) {
                Swal.fire({
                    title: "Producto agregado exitosamente",
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
                    text: "Error de conexión. No se pudo crear el producto.",
                });
        }
    };

    return (
        <div className="container-fluid my-5">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-dark text-light text-center p-4 rounded-top-4">
                            <h2 className="mb-0">Crear Nuevo Producto</h2>
                        </div>
                        <div className="card-body p-4 p-md-5">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="nombre" className="form-label ">Nombre de la Pizza</label>
                                    <input
                                        type="text"
                                        className="form-control form-control"
                                        id="nombre" name="nombre"
                                        value={pizzaData.nombre}
                                        onChange={handleChange}
                                        required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="precio" className="form-label ">Precio</label>
                                    <div className="input-group input-group">
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
                                    <label htmlFor="imagen" className="form-label ">Imagen del Producto</label>
                                    <input
                                        type="file"
                                        className="form-control form-control"
                                        id="imagen" name="imagen"
                                        onChange={handleFileChange}
                                        accept="image/png, image/jpeg"
                                        required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="selectCategoria" className="form-label ">Categoría</label>
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
                                    <label htmlFor="descripcion" className="form-label ">Descripción (opcional)</label>
                                    <textarea
                                        className="form-control form-control"
                                        id="descripcion"
                                        name="descripcion"
                                        rows="3"
                                        value={pizzaData.descripcion}
                                        onChange={handleChange}
                                        placeholder="Ej: Base de salsa de tomate, mozzarella fresca, pepperoni"
                                    ></textarea>
                                </div>
                                <div className="d-grid mt-5">
                                    <button
                                        type="submit"
                                        className="btn btn-primary "
                                    >Crear Producto
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