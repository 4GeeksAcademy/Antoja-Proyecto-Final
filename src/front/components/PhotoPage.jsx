import { Link } from "react-router-dom";
import pizza from "../assets/img/pizza.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer"


export const PhotoPage = () => {
    const{dispatch, store} = useGlobalReducer()
    
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
                    <Link className="btn btn-menu" to="/menu"><strong>Haz tu pedido</strong></Link>
                </div>
            </div>
        </div>
    )
}