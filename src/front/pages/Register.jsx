import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"

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
    const value = target.type === "checkbox" ? target.checked : target.value;

    setUser(prevUser => ({
        ...prevUser,
        [target.name]: value
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
        if(response.status === 201){
            console.log(user)
            setUser(initialStateUser)
            setTimeout(()=>{
                navigate("/login")
            }, 2000)
        }
        else if(response.status === 400){
            alert("falta algun valor para crear el usuario, por favor completa el formulario")
        } else{
            alert("Error al registrar el usuario")
        }

    }
    return (
        <div className="container">
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
                        <div className="form-group mb-3 text-light">
                            <label htmlFor="btnToggle" className="form-check-label"> Admim </label>
                            <input 
                            type="checkbox"
                            name="is_admin"
                            className="form-check-input ms-3 mt-1"
                            id="btnToggle"
                            checked={user.is_admin}
                            onChange={handleChange} />


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