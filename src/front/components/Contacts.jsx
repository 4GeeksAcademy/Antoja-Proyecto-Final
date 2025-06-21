import { Link } from "react-router-dom"

export const Contacts = () => {
    return (
        <div className="container p-0 ">
            <div className="row col-12">
                <div className="text-start mt-5 text-dark">
                    <h2>Contáctanos</h2>
                </div>
                <div className="information-contacts">
                    <div className="info-icons">
                        <i className="fa-solid fa-location-dot"></i>
                        <p>Avenida Apoquindo 3000, Las Condes, Santiago, Chile</p>
                    </div>
                    <div className="info-icons">
                        <i className="fa-solid fa-phone"></i>
                        <p>56 9 1111 2222 / 56 9 2222 3333</p>
                    </div>
                    <div className="info-icons">
                        <i className="fa-solid fa-envelope"></i>
                        <p>contacto@antojapizzeria.cl</p>
                    </div>
                </div>
            </div>
            <Link className="btn btn-dark text-ligth" to="/comment">Escríbenos</Link>
        </div>
    )
}
