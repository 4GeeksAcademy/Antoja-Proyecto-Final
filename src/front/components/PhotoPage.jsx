import { Link } from "react-router-dom";
import pizza from "../assets/img/pizza.jpg";

export const PhotoPage = () => {

    return (
        <div className="container-photo p-0 ">
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