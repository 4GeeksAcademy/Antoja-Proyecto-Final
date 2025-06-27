import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"
import logo from "../assets/img/Revised.png"

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()

	const deleteProduct = (id) => {
		console.log(id)
		dispatch({
			type: "DELETE_PRODUCT", payload: id
		})
	}

	return (
		<nav className="navbar navbar-light file-navbar">
			<div className="container">
				<Link to="/">
					<img src={logo} alt="Antoja Logo" className="navbar-brand mb-0 h1" style={{ height: "100px" }} />
				</Link>
				<div className="contenedor-link-navbar">
					<Link className="btn btn-transparent text-dark border-0"
						to="/menu">MENÚ
					</Link>
					<Link className="btn btn-transparent text-dark border-0"
						to="/">INICIO
					</Link>
					{
						store.token ? (
							<>
								<Link className="btn btn-transparent text-dark border-0"
									onClick={() => {
										dispatch({ type: "LOGOUT" })
										localStorage.removeItem("token")
									}}
								>
									CERRAR SESIÓN
								</Link>
								<div className="dropdown">
									<button
										className="btn btn-transparent border-0 dropdown-toggle"
										type="button"
										data-bs-toggle="dropdown" aria-expanded="false">
										<i className="fa-solid fa-cart-shopping"></i>
										<span className="number-gray bg-transparent bor ms-1 me-1">
											{store.carrito.length}
										</span>
									</button>
									<ul className="menu dropdown-menu dropdown-menu-white">
										{
											store.carrito.map((item, index) => {
												return (
													<li
														key={index}
														className="d-flex justify-content-between align-items-center px-2"
													>
														<span className="text-dark">{item.nombre}</span>
														<button
															type="button"
															className="btn btn-transparent text-dark"
															onClick={(event) => {
																event.stopPropagation();
																deleteProduct(item.id)
															}}>
															<i className="fa-solid fa-trash"></i></button>
													</li>
												)
											}
											)}
										{store.carrito.length > 0 && (
											<li className="d-flex justify-content-center px-2 mt-2">
												<button
													type="button"
													className="btn place-order btn.sm"
													onClick={() => {
														alert("Pedido exitoso. ¡Estamos preparando tu envío!");
														dispatch({ type: "CLEAR_All" });
													}}>
													Realizar pedido
												</button>

											</li>
										)}
									</ul>
								</div>
							</>
						) : (
							<Link className="btn btn-transparent text-dark border-0"
								to="/login">INICIAR SESIÓN
							</Link>
						)
					}
				</div>
			</div>
		</nav>
	);
};

