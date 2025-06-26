import { useState, useEffect } from "react";

export const Menu = () => {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchPizzas = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendUrl}/pizzas`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            setPizzas(data);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPizzas();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-2">Cargando nuestro delicioso menú...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger mt-4" role="alert">
                <strong>¡Ups! Algo salió mal:</strong> {error}
            </div>
        );
    }

    return (
  
        <div className="container my-4">
            <h1 className="text-center mb-4">Nuestro Menú</h1>
            <div className="row g-4">
                {pizzas.map((pizza) => (
                    <div key={pizza.id} className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100">
                            <img src={pizza.imagen_url} className="card-img-top imagenes-pizza" alt={pizza.nombre} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{pizza.nombre}</h5>
                                <p className="card-text text-muted small flex-grow-1">
                                    {pizza.ingredientes.map(ing => ing.nombre).join(', ')}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <p className="h5 fw-bold text-dark mb-0">${pizza.precio.toFixed(0)}</p>
                                    <button className="btn btn-outline-dark fw-bold">Añadir</button>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};