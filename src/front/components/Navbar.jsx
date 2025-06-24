import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"

import logo from "../assets/img/Revised.png"

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()

	return (
		<nav className="navbar navbar-light file-navbar">
			<div className="container">
				<Link to="/">
					<img src={logo} alt="Antoja Logo" className="navbar-brand mb-0 h1" style={{ height: "100px" }} />
				</Link>
				<div className="ml-auto">
					<Link className="btn btn-transparent text-dark border-0"
						to="/menu">MENÚ
					</Link>
					<Link className="btn btn-transparent text-dark border-0"
						to="/">INICIO
					</Link>
					{
						store.token ?
							<>
								<Link className="btn btn-transparent text-dark border-0"
									onClick={() => {
										dispatch({ type: "LOGOUT" })
										localStorage.removeItem("token")
									}}
								>
									CERRAR SESIÓN
								</Link>
							</> :
							<>
								{
									<Link className="btn btn-transparent text-dark border-0"
										to="/login">INICIAR SESIÓN
									</Link>
								}
							</>
					}				
				</div>
			</div>
		</nav>
	);
};

