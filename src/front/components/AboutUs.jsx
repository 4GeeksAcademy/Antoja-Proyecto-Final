import { Link } from "react-router-dom"
import Imagen1 from "../assets/img/Imagen1.png";
import Imagen2 from "../assets/img/Imagen2.png";
import Imagen3 from "../assets/img/Imagen3.jpg";
import Imagen4 from "../assets/img/Imagen4.png";

export const AboutUs = () => {
    return (
        <div className="container-fluid container-photos p-0 ">
            <div className="row">
                <div className="text-center mt-5 text-dark">
                    <h2>¡Descrubre ANTOJA!</h2>
                </div>
                <div className="imagen-gallery">
                    <Link to="/history"><img src={Imagen1} alt="image1" className="image-design" /></Link>
                    <Link to="/history"><img src={Imagen2} alt="image2" className="image-design" /></Link>
                    <Link to="/history"><img src={Imagen3} alt="image3" className="image-design" /></Link>
                    <Link to="/history"><img src={Imagen4} alt="image4" className="image-design" /></Link>
                </div>
            </div>
        </div>
    )
}
