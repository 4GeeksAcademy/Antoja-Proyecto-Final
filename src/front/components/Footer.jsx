import { Link } from "react-router-dom"
import logo from "../assets/img/Revised.png"

export const Footer = () => {
	return (
		<div className="container-fluid container-footer p-2 ">
			<div className="row col-12">
				<div className="text-center mt-1 text-dark">
					<h2>Contáctanos</h2>
				</div>
				<div className="info-footer">
					<div className="information-contacts">
						<div className="info-icons">
							<i className="fa-solid fa-location-dot"></i>
							<p className="text-footer">Julio Pinto 123, Santiago, Chile</p>
						</div>
						<div className="info-icons">
							<i className="fa-solid fa-phone"></i>
							<p className="text-footer">+123-456-7890</p>
						</div>
						<div className="info-icons">
							<i className="fa-solid fa-envelope"></i>
							<p className="text-footer">hello@antoja.com</p>
						</div>
						<div className="info-icons">
							<i class="fa-solid fa-globe"></i>
							<p className="text-footer">antoja.com</p>
						</div>
					</div>
					<div className="information-contacts-center">
						<div className="info-icons">
							<p className="text-footer">Para comentarios y/ sugerencias</p>
						</div>
						<div className="info-icons">
							<Link className="btn btn-dark text-ligth" to="/comment">Escríbenos aquí</Link>
						</div>
					</div>
					<div className="information-contacts-rigth">
						<Link to="/">
							<img src={logo} alt="Antoja Logo" className="navbar-brand mb-0 h1" style={{ height: "100px" }} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}


