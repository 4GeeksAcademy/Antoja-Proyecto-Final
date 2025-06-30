import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
    nombre: "",
    precio: "",
};

export const CrearProductos = () => {
    const navigate = useNavigate();

    const [pizzaData, setPizzaData] = useState(initialState);
    const [imagenFile, setImagenFile] = useState(null);


    const [allIngredients, setAllIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);



    const fetchAllIngredients = async () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${backendUrl}/ingredientes`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setAllIngredients(data);
            } else {
                console.error("Error: No se pudieron cargar los ingredientes.");
            }
        } catch (error) {
            console.error("Error de conexión al cargar ingredientes:", error);
        }
    };

    useEffect(() => {
        fetchAllIngredients();
    }, []);

    const handleChange = (event) => {
        setPizzaData({ 
            ...pizzaData, 
            [event.target.name]: event.target.value });
    };

    const handleFileChange = (event) => {
        setImagenFile(event.target.files[0]);
    };

    const handleAddIngredient = (ingrediente) => {
        setSelectedIngredients([
            ...selectedIngredients, 
            ingrediente]);
    };

    const handleRemoveIngredient = (ingredienteToRemove) => {
        setSelectedIngredients(selectedIngredients.filter(ing => ing.id !== ingredienteToRemove.id));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!pizzaData.nombre || !pizzaData.precio || !imagenFile) {
            alert("Por favor, completa todos los campos: nombre, precio y selecciona una imagen.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("No estás autenticado. Por favor, inicia sesión.");
            navigate('/login');
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("nombre", pizzaData.nombre);
        formData.append("precio", pizzaData.precio);
        formData.append("imagen", imagenFile);

        selectedIngredients.forEach(ing => {
            formData.append("ingredientes_nombres[]", ing.nombre);
        });

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        try {
            const response = await fetch(`${backendUrl}/pizzas`, {
                method: 'POST',
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            });
            if (response.ok) {
                alert("¡Pizza creada con éxito!");
                navigate('/menu');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert("Error de conexión. No se pudo crear el producto.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const availableIngredients = allIngredients.filter(
        ing => !selectedIngredients.find(selected => selected.id === ing.id)
    );

    return (
        <div className="container my-5">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-dark text-light text-center p-4 rounded-top-4">
                            <h2 className="mb-0 fw-bold">Crear Nuevo Producto</h2>
                        </div>
                        <div className="card-body p-4 p-md-5">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="nombre" className="form-label fw-bold">Nombre de la Pizza</label>
                                    <input type="text" className="form-control form-control-lg" id="nombre" name="nombre" value={pizzaData.nombre} onChange={handleChange} required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="precio" className="form-label fw-bold">Precio</label>
                                    <div className="input-group input-group-lg">
                                        <span className="input-group-text">$</span>
                                        <input type="number" className="form-control" id="precio" name="precio" value={pizzaData.precio} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="imagen" className="form-label fw-bold">Imagen del Producto</label>
                                    <input type="file" className="form-control form-control-lg" id="imagen" name="imagen" onChange={handleFileChange} accept="image/png, image/jpeg" required />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Ingredientes</label>
                                    <div className="p-3 border rounded mb-2" style={{ minHeight: "60px" }}>
                                        {selectedIngredients.length > 0 ? (
                                            <div className="d-flex flex-wrap gap-2">
                                                {selectedIngredients.map(ing => (
                                                    <span key={ing.id} className="badge bg-dark d-flex align-items-center fs-6">
                                                        {ing.nombre}
                                                        <button type="button" className="btn-close btn-close-white ms-2" onClick={() => handleRemoveIngredient(ing)}></button>
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-muted">Selecciona ingredientes de la lista...</span>
                                        )}
                                    </div>
                                    <div className="dropdown">
                                        <button className="btn btn-outline-dark dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Añadir Ingrediente
                                        </button>
                                        <ul className="dropdown-menu w-100">
                                            {availableIngredients.length > 0 ? (
                                                availableIngredients.map(ing => (
                                                    <li key={ing.id}>
                                                        <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleAddIngredient(ing); }}>
                                                            {ing.nombre}
                                                        </a>
                                                    </li>
                                                ))
                                            ) : (
                                                <li><span className="dropdown-item text-muted">No hay más ingredientes para añadir</span></li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                <div className="d-grid mt-5">
                                    <button type="submit" className="btn file-navbar btn-lg fw-bold" disabled={isSubmitting}>
                                        {isSubmitting ? "Guardando..." : "Crear Producto"}
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