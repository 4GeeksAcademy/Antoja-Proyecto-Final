import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Carrito = () => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()

    const totalPizzas = store.carrito.reduce((pizzasSelect, item) => pizzasSelect + item.cantidad, 0);
    const totalPrecio = store.carrito.reduce((pizzasSelect, item) => pizzasSelect + item.precio * item.cantidad, 0)

    const handleConfirmar = async () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${backendUrl}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    user_id: store.user.id,
                    items: store.carrito.map(item => ({
                        pizza_id: item.id,
                        quantity: item.cantidad
                    }))
                })
            })
            const data = await response.json();

            if (response.ok) {
                alert(`Pedido exitoso. ¡Estamos preparando tu envío! N° Orden: ${data.orden_id}`);
                dispatch({
                    type: "CLEAR_ALL"
                });
                navigate("/");
                return;
            }else {
                alert("Error: No se pudo crear la orden");
            }
        } catch (error) {
            alert("Ocurrió un error al procesar tu pedido");
        }       
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