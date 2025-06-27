import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"
import pizza from "../assets/img/pizza.jpg";

export const Menu = () => {
    const { store, dispatch } = useGlobalReducer()

    return (
        <div className="container p-0 ">
            <div className="row col-12">
                <div className="text-start mt-5 text-dark">
                    <h2>Productos Destacados</h2>
                </div>
                <div className="Carousel-array">
                    {
                        new Array(10).fill(10).map((_, index) => (

                            <div key={index} className="my-product p-3">
                                <img src={pizza} className="img-fluid rounded-circle mb-3" alt="Imagen pizza" />
                                <p>Título #{index + 1}</p>
                                <div className="icons d-flex justify-content-between">
                                    <Link
                                        className="btn btn-dark">
                                        Leer más!
                                    </Link>
                                    <button
                                        className="btn btn-outline-dark round-button"
                                        onClick={() => dispatch({
                                            type: "ADD_CARRITO",
                                            payload:{
                                                id: index + 1,
                                                nombre: `Pizza Margarita #${index + 1}`,
                                                precio: 8990
                                            }
                                        })}>
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="text-start mt-5 text-dark">
                    <h2>Nuestro Menú</h2>
                </div>
            </div>
        </div>
    )
}