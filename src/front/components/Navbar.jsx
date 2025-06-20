import { Link } from "react-router-dom";
import logo from "../assets/img/Revised.png"

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light file-navbar">
			<div className="container">
				<Link to="/">
					<img src={logo} alt="Antoja Logo" className="navbar-brand mb-0 h1" style={{ height: "100px" }} />
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-white text-dark">MENÚ</button>
					</Link>
					<Link to="/demo">
						<button className="btn btn-white text-dark">REGISTRARME</button>
					</Link>
					<Link to="/demo">
						<button className="btn btn-white text-dark">CARRITO DE COMPRAS</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};

	