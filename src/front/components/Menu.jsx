import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { MenuAdmin } from "./MenuAdmin";
import Swal from 'sweetalert2';

export const Menu = () => {
    const [pizzas, setPizzas] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [cantidades, setCantidades] = useState({})

    const { store, dispatch } = useGlobalReducer()

    const handleAddToPizza = (pizza) => {
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "Inicia sesión",
                text: "Tienes que registrarte y/o iniciar sesión para añadir productos al carrito.",
                confirmButtonText: "Entendido"
            });
        }

        const cantidad = cantidades[pizza.id] || 0;
        if (cantidad === 0) {
            Swal.fire("Selecciona al menos una unidad")
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
                Swal.fire({
                    title: "Pizza eliminada correctamente",
                    icon: "success",
                    draggable: true
                });
                setPizzas(pizzas.filter(pizza => pizza.id !== idDeLaPizza))

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error: No se pudo eliminar la pizza.",
                });
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error de conexión con el servidor.",
            });
        }
    };

    const productosBebida = pizzas.filter(bebida => bebida.categoria === "Bebida")
    const productosPizza = pizzas.filter(pizza => pizza.categoria === "Pizza")
    const productosPostre = pizzas.filter(postre => postre.categoria === "Postre")
    const productosExtra = pizzas.filter(extra => extra.categoria === "Extra")

    if (loading) {
        return (<div className="text-center my-5 vh-100">
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
            <MenuAdmin pizzas={pizzas} onDelete={handleDelete} />
        ) : <div className="container my-4">
            <h1 className="text-center mb-4">Nuestro Menú</h1>
            <div className="d-flex justify-content-center mb-4">
                <div className="btn-group" role="tablist">
                    <button
                        className="btn btn-outline-dark active"
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                    >
                        Pizzas
                    </button>

                    <button
                        className="btn btn-outline-dark"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                    >
                        Postres
                    </button>

                    <button
                        className="btn btn-outline-dark"
                        id="pills-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact"
                        aria-selected="false"
                    >
                        Bebidas
                    </button>

                    <button
                        className="btn btn-outline-dark"
                        id="pill-extras-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-extras"
                        type="button"
                        role="tab"
                        aria-controls="pills-extras"
                        aria-selected="false"
                    >
                        Extras
                    </button>
                </div>
            </div>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                    <div className="row g-4">
                        {productosPizza.map((pizza) => (
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
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                    <div className="row g-4">
                        {productosPostre.map((pizza) => (
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
                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
                    <div className="row g-4">
                        {productosBebida.map((pizza) => (
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
                <div className="tab-pane fade" id="pills-extras" role="tabpanel" aria-labelledby="pills-extras-tab" tabindex="0">
                    <div className="row g-4">
                        {productosExtra.map((pizza) => (
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
            </div>
        </div>
    );
};



