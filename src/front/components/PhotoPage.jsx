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
        <div className="container-photo p-0 ">
            {
                store.user.is_admin ? (
                    <div>
                        <h1>soy admin</h1>
                    </div>
                ):
                (
                    <div>
                        NO soy admin
                    </div>
                )
            }
            <div className="row col-12 col-md-6">
                <div className="text-photo">
                    <h1>50% Chilena, 50% Argentina...100% Sabor </h1>
                </div>
                <div className="row col-2 col-md-6">
                    <button
                        className="btn btn-menu"
                        to="/menu"
                        onClick={handleClick}><strong>Haz tu pedido</strong></button>
                </div>
            </div>
        </div>
    )
}