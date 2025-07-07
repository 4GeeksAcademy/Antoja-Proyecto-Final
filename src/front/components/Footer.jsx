import { Link } from "react-router-dom"
import logo from "../assets/img/Revised.png"

export const Footer = () => {
	return (
		<footer className="container-footer text-dark py-4 mt-auto">
			<div className="container">
				<div className="row text-center text-md-start justify-content-center">
					<div className="col-12 col-md-4 mb-4">
						<h5>Contacto</h5>
						<div className="d-flex align-items-center mb-2">
							<i className="fa-solid fa-location-dot me-2"></i>
							<span>Julio Pinto 123, Santiago, Chile</span>
						</div>
						<div className="d-flex align-items-center mb-2">
							<i className="fa-solid fa-phone me-2"></i>
							<span>+123-456-7890</span>
						</div>
						<div className="d-flex align-items-center mb-2">
							<i className="fa-solid fa-envelope me-2"></i>
							<span>hello@antoja.com</span>
						</div>
					</div>
					<div className="col-12 col-md-4 mb-4">
						<h5>Web</h5>
						<div className="d-flex align-items-center mb-2">
							<i className="fa-solid fa-globe me-2"></i>
							<span>antoja.com</span>
						</div>
						<div className="text-footer-small mt-3">
							© 2025 Antoja - Todos los derechos reservados
						</div>
					</div>
					<div className="col-12 col-md-4 mb-4">
						<h5>Comentarios</h5>
						<p>Para comentarios y/o sugerencias:</p>
						<Link className="btn btn-dark btn-sm" to="/comment">Escríbenos aquí</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}


