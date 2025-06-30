import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
    nombre: "",
    precio: "",
};

export const UpdateProducts = () => {
    const { pizzaId } = useParams();
    const navigate = useNavigate();


    const [pizzaData, setPizzaData] = useState(initialState);
    const [imagenFile, setImagenFile] = useState(null);

    const [allIngredients, setAllIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);


    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const loadInitialData = async () => {
        const token = localStorage.getItem("token");
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        try {
            const [pizzaResponse, ingredientsResponse] = await Promise.all([
                fetch(`${backendUrl}/pizzas/${pizzaId}`),
                fetch(`${backendUrl}/ingredientes`, { headers: { "Authorization": `Bearer ${token}` } })
            ]);

            if (!pizzaResponse.ok) throw new Error("No se encontró la pizza.");
            if (!ingredientsResponse.ok) throw new Error("No se pudieron cargar los ingredientes.");

            const pizzaToUpdate = await pizzaResponse.json();
            const allIngredientsData = await ingredientsResponse.json();

            setPizzaData(
                {
                    nombre: pizzaToUpdate.nombre,
                    precio: pizzaToUpdate.precio
                }
            );
            setSelectedIngredients(pizzaToUpdate.ingredientes);
            setAllIngredients(allIngredientsData);

        } catch (error) {
            console.error("Error al cargar datos iniciales:", error);
            alert(error.message);
            navigate("/menu");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, [pizzaId]);

    const handleChange = (event) => {
        setPizzaData({ ...pizzaData, 
            [event.target.name]: event.target.value });
    };

    const handleFileChange = (event) => {
        setImagenFile(event.target.files[0]);
    };

    const handleAddIngredient = (ingrediente) => {
        setSelectedIngredients(prevSelected => [...prevSelected, ingrediente]);
    };

    const handleRemoveIngredient = (ingredienteToRemove) => {
        setSelectedIngredients(prevSelected => prevSelected.filter(ing => ing.id !== ingredienteToRemove.id));
    };

    const handleClickAddIngredient = (event, ingrediente) => {
        event.preventDefault();
        handleAddIngredient(ingrediente);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            alert("No estás autenticado.");
            navigate('/login');
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("nombre", pizzaData.nombre);
        formData.append("precio", pizzaData.precio);

        if (imagenFile) {
            formData.append("imagen", imagenFile);
        }

        selectedIngredients.forEach(ing => {
            formData.append("ingredientes_nombres[]", ing.nombre);
        });

        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        try {
            const response = await fetch(`${backendUrl}/pizzas/${pizzaId}`, {
                method: 'PUT',
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                alert("Pizza actualizada con éxito!");
                navigate('/menu');
            } else {
                const errorData = await response.json();
                alert(`Error al actualizar: ${errorData.message}`);
            }
        } catch (error) {
            alert("Error de conexión. No se pudieron guardar los cambios.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const availableIngredients = allIngredients.filter(
        ing => !selectedIngredients.find(selected => selected.id === ing.id)
    );

    if (loading) {
        return <div className="text-center mt-5"><div className="spinner-border text-warning" role="status"></div><p className="mt-2">Cargando datos del producto...</p></div>;
    }

    return (
        <div className="container my-5">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-dark text-light text-center p-4 rounded-top-4">
                            <h2 className="mb-0 fw-bold">Editar Producto</h2>
                        </div>
                        <div className="card-body p-4 p-md-5">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="nombre"
                                        className="form-label fw-bold">Nombre de la Pizza</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="nombre"
                                        name="nombre"
                                        value={pizzaData.nombre}
                                        onChange={handleChange}
                                        required />
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
                                            required />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="imagen" className="form-label fw-bold">Cambiar Imagen (opcional)</label>
                                    <input
                                        type="file"
                                        className="form-control form-control-lg"
                                        id="imagen" name="imagen"
                                        onChange={handleFileChange}
                                        accept="image/png, image/jpeg" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Ingredientes</label>
                                    <div className="p-3 border rounded mb-2"
                                        style={{ minHeight: "60px" }}>
                                        {selectedIngredients.length > 0 ? (
                                            <div className="d-flex flex-wrap gap-2">
                                                {selectedIngredients.map(ing => (
                                                    <span key={ing.id} className="badge bg-dark d-flex align-items-center fs-6">
                                                        {ing.nombre}
                                                        <button type="button" className="btn-close btn-close-white ms-2" onClick={() => handleRemoveIngredient(ing)}></button>
                                                    </span>
                                                ))}
                                            </div>
                                        ) : <span className="text-muted">No hay ingredientes seleccionados.</span>}
                                    </div>
                                    <div className="dropdown">
                                        <button className="btn btn-outline-dark dropdown-toggle w-100" type="button" data-bs-toggle="dropdown">Añadir Ingrediente</button>
                                        <ul className="dropdown-menu w-100">
                                            {availableIngredients.length > 0 ? (
                                                availableIngredients.map(ing => (
                                                    <li key={ing.id}>
                                                        <a className="dropdown-item" href="#" onClick={(event) => handleClickAddIngredient(event, ing)}>
                                                            {ing.nombre}
                                                        </a>
                                                    </li>
                                                ))
                                            ) : <li><span className="dropdown-item text-muted">No hay más ingredientes</span></li>}
                                        </ul>
                                    </div>
                                </div>
                                <div className="d-grid mt-5">
                                    <button type="submit" className="btn file-navbar btn-lg fw-bold" disabled={isSubmitting}>
                                        {isSubmitting ? "Guardando Cambios..." : "Guardar Cambios"}
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