import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const Menu = () => {
    const [pizzas, setPizzas] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [cantidades, setCantidades] = useState({})

    const { store, dispatch } = useGlobalReducer()

    const handleAddToPizza = (pizza) => {
        const cantidad = cantidades[pizza.id] || 0;
        if (cantidad === 0) {
            alert("Selecciona al menos una unidad");
            return;
        }
        dispatch({
            type: "ADD_CARRITO",
            payload: {
                ...pizza,
                cantidad: cantidades[pizza.id]
            }
        })
    }

    const aumentarCantidad = (id) => {
        setCantidades((cantidadAnterior) => {
            const cantidadActual = cantidadAnterior[id] || 0;
            if (cantidadActual < 5) return { ...cantidadAnterior, [id]: cantidadActual + 1 };
            return cantidadAnterior;
        })
    }

    const disminuirCantidad = (id) => {
        setCantidades((cantidadAnterior) => {
            const cantidadActual = cantidadAnterior[id] || 0;
            if (cantidadActual > 0) return { ...cantidadAnterior, [id]: cantidadActual - 1 };
            return cantidadAnterior;
        })
    }

    const fetchPizzas = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL
            const response = await fetch(`${backendUrl}/pizzas`)
            if (!response.ok) {
                return Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            setPizzas(data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchPizzas()
    }, []);

    const handleDelete = async (idDeLaPizza) => {
        const confirmado = window.confirm("¿Estás seguro de que quieres eliminar esta pizza?")

        if (!confirmado) {
            return;
        }

        const token = localStorage.getItem("token")
        const backendUrl = import.meta.env.VITE_BACKEND_URL

        try {
            const response = await fetch(`${backendUrl}/pizzas/${idDeLaPizza}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert("Pizza eliminada correctamente")
                setPizzas(pizzas.filter(pizza => pizza.id !== idDeLaPizza))

            } else {
                alert("Error: No se pudo eliminar la pizza.")
            }

        } catch (error) {
            alert("Error de conexión con el servidor.")
        }
    };

    if (loading) {
        return (<div className="text-center mt-5">
                    <div className="spinner-border text-dark" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div><p className="mt-2">Cargando...</p>
                </div>);
    }

    if (error) {
        return <div className="alert alert-danger mt-4">
            <strong>Error:</strong> {error}
        </div>;
    }

    return (
        store.user.is_admin ? (
            <div className="container-menu my-4">
                <h1 className="text-center mb-4">Menú Administrador</h1>
                <div className="text-center mb-5">
                    <Link to="/crear-producto" className="btn btn-outline-dark btn-lg">
                        <i class="fa-solid fa-plus"></i> Nueva Pizza
                    </Link>
                </div>
                <div className="row g-4 cont-pizza">
                    {pizzas.map((pizza) => (
                        <div key={pizza.id} className="col-12 col-md-6 col-lg-4">
                            <div className="card h-100">
                                <img src={pizza.imagen_url} className="card-img-top imagenes-pizza" alt={pizza.nombre} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{pizza.nombre}</h5>
                                    <p className="card-text text-muted small flex-grow-1">
                                        {pizza.descripcion}
                                    </p>
                                    <p className="h5 fw-bold text-dark mb-0">${pizza.precio.toFixed(0)}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-end gap-2">
                                    <Link to={`/update-products/${pizza.id}`} className="btn btn-dark btn-sm">
                                        <i class="fa-solid fa-pencil"></i>
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(pizza.id)}><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) : <div className="container my-4">
            <h1 className="text-center mb-4">Nuestro Menú</h1>
            <div className="row g-4">
                {pizzas.map((pizza) => (
                    <div key={pizza.id} className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100">
                            <img src={pizza.imagen_url} className="card-img-top imagenes-pizza" alt={pizza.nombre} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{pizza.nombre}</h5>
                                <p className="card-text text-muted small flex-grow-1">
                                    {pizza.descripcion}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <p className="h5 fw-bold text-dark mb-0">${pizza.precio.toFixed(0)}</p>
                                    <div className="d-flex align-items-center gap-2">
                                        <button className="btn btn-outline-dark" onClick={() => disminuirCantidad(pizza.id)}
                                            disabled={(cantidades[pizza.id] || 0) === 0}> - </button>
                                        <span>{cantidades[pizza.id] || 0}</span>
                                        <button className="btn btn-outline-dark" onClick={() => aumentarCantidad(pizza.id)}
                                            disabled={(cantidades[pizza.id] || 0) === 5}> + </button>
                                    </div>
                                    <button className="btn btn-outline-dark fw-bold" onClick={() => handleAddToPizza(pizza)}>Añadir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};



