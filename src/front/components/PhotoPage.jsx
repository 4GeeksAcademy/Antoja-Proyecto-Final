import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"
import pizza from "../assets/img/pizza.jpg";

export const PhotoPage = () => {
    const { store, dispatch } = useGlobalReducer()

    const navigate = useNavigate()

    const handleClick = () => {
        if (store.token) {
            navigate("/menu");
        } else {
            navigate("/login")
        }
    }
    return (
        <div className="container-photo p-0">
            <div className="text-photo">
                <h1>50% Chilena, 50% Argentina...100% Sabor</h1>
            </div>
            <div className="button-container">
                <button
                    className="btn btn-menu"
                    onClick={handleClick}
                >
                    <h3 className="m-0">Haz tu pedido</h3>
                </button>
            </div>
        </div>
    )
}