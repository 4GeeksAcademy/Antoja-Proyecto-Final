import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"

import logo from "../assets/img/Revised.png"

export const Navbar = () => {
	const{store,dispatch} = useGlobalReducer()

	return (
		<nav className="navbar navbar-light file-navbar">
			<div className="container">
				<Link to="/">
					<img src={logo} alt="Antoja Logo" className="navbar-brand mb-0 h1" style={{ height: "100px" }} />
				</Link>
				<div className="ml-auto">
					{
						store.token ?
						<>
						<button className="btn btn-primary"
						onClick={()=>{dispatch({type:"LOGOUT"})
						localStorage.removeItem("token")
						}}
						>
							Cerrar Sesion
						</button>
						</>: 
						<>
						{
							<button>
								<Link to="/login">iniciar sesion</Link>
							</button>
						}
						</>
					}
				</div>
			</div>
		</nav>
	);
};

	