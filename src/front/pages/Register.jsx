import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import Swal from 'sweetalert2';

const initialStateUser = {
    name:"",
    email:"",
    password:"",
    is_admin:false
}

export const Register = () => {
    const [user, setUser] = useState(initialStateUser)
    const navigate = useNavigate()

    const handleChange = ({ target }) => {

    setUser(prevUser => ({
        ...prevUser,
        [target.name]: target.value
    }));
};

    const handleSubmit = async (event) =>{
        event.preventDefault()
        const url = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${url}/register`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await response.json(); 
        if(response.status === 201){
            console.log(user)
            setUser(initialStateUser)
            setTimeout(()=>{
                navigate("/login")
            }, 2000)
        }
        else if(response.status === 400){
            Swal.fire(data.mensaje);
        } else{
            Swal.fire("Error al registrar el usuario");
        }
    }
    return (
        <div className="container-fluid vh-100">
            <div className="row justify-content-center my-5">
                <h2 className="text-center my-3">Registrate para continuar</h2>
                <div className="col-12 col-md-6 rounded-4 py-4 bg-dark">
                    <form className=" m-2 p-3" onSubmit={handleSubmit}>
                        <div className="form-group mb-3 text-light">
                            <label htmlFor="btnName ">Nombre:</label>
                            <input type="text"
                            placeholder="Jhon"
                            className="form-control"
                            id="btnName"
                            name="name"
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3 text-light">
                            <label htmlFor="btnEmail">Correo electronico</label>
                            <input
                            type="text"
                            placeholder="JhonDoe@gmail.com"
                            className="form-control"
                            id="btnEmail"
                            name="email"
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3 text-light">
                            <label htmlFor="btnPass">Contraseña: </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="form-control"
                                id="btnPass"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <button className="btn btn-outline-light w-100">
                            Registrar
                        </button>
                    </form>
                </div>
                <div className="w-100"></div>
                <div className="col-12 col-md-6  d-flex justify-content-between my-1 px-4 ">
                    <Link to="/login">Ya tengo una cuenta</Link>
                </div>
            </div>
        </div>
    )
}