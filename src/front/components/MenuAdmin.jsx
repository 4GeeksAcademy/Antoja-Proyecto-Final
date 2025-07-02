
import React from 'react';
import { Link } from 'react-router-dom';


export const MenuAdmin = ({ pizzas, onDelete }) => {


    const productosBebida = pizzas.filter(bebida => bebida.categoria === "Bebida")
    const productosPizza = pizzas.filter(pizza => pizza.categoria === "Pizza")
    const productosPostre = pizzas.filter(postre => postre.categoria === "Postre")
    const productosExtra = pizzas.filter(extra => extra.categoria === "Extra")

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">Menú Administrador</h1>
            <div className="text-center mb-5">
                <Link to="/crear-producto" className="btn btn-outline-dark btn-lg">
                    <i className="fa-solid fa-plus"></i> Nuevo Producto
                </Link>
            </div>
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
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-end gap-2 w-100">
                                        <Link to={`/update-products/${pizza.id}`} className="btn btn-dark btn-sm">
                                            <i className="fa-solid fa-pencil"></i>
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onDelete(pizza.id)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
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
                                        </div>
                                        <div className="card-footer d-flex justify-content-end gap-2">
                                            <Link to={`/update-products/${pizza.id}`} className="btn btn-dark btn-sm">
                                                <i className="fa-solid fa-pencil"></i>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => onDelete(pizza.id)}>
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
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
                                        </div>
                                        <div className="card-footer d-flex justify-content-end gap-2">
                                            <Link to={`/update-products/${pizza.id}`} className="btn btn-dark btn-sm">
                                                <i className="fa-solid fa-pencil"></i>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => onDelete(pizza.id)}>
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
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
                                        </div>
                                        <div className="card-footer d-flex justify-content-end gap-2">
                                            <Link to={`/update-products/${pizza.id}`} className="btn btn-dark btn-sm">
                                                <i className="fa-solid fa-pencil"></i>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => onDelete(pizza.id)}>
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
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
