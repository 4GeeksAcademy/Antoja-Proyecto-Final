import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"


export const Navbar = () => {
	const{store,dispatch} = useGlobalReducer()

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
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