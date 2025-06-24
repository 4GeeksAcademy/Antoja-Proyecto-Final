import { Link } from "react-router-dom"

export const Footer = () => {
	return (
		<div className="container-footer p-3 ">
			<div className="row col-12 col-md-6">
				<div className="text-center mt-1 text-dark">
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


