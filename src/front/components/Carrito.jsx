import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Carrito = () => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()

    const totalPizzas = store.carrito.reduce((pizzasSelect, item) => pizzasSelect + item.cantidad, 0);
    const totalPrecio = store.carrito.reduce((pizzasSelect, item) => pizzasSelect + item.precio * item.cantidad, 0)

    const handleConfirmar = () => {
        alert("Pedido exitoso. ¡Estamos preparando tu envío!");
        dispatch({
            type: "CLEAR_ALL"
        });
        navigate("/");
    }

    if (store.carrito.length === 0) {
        return (
            <div className="container mt-5">
                <h2 className="text-center">Tu carrito está vacío 🛒</h2>
            </div>
        )
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Resumen de tu pedido</h2>
            <ul className="list-group mb-3 ">
                {store.carrito.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{item.nombre} x {item.cantidad}</span>
                        <span>${(item.precio * item.cantidad).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
            <div className="text-end mb-4">
                <p><strong>Total de pizzas:</strong> {totalPizzas}</p>
                <p><strong>Total a pagar:</strong> ${totalPrecio.toLocaleString()}</p>
            </div>
            <div className="text-center">
                <button className="btn btn-dark btn-lg" onClick={handleConfirmar}>
                    Confirmar pedido
                </button>
            </div>
        </div>
    );
}