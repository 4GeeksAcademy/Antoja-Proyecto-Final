import { Link } from "react-router-dom"
import { useState } from "react";

const initialState = {
    email: "",
    comment: ""
}
export const Comment = () => {


    const [comment, setComment] = useState(initialState)

    const handleChange = (event) => {
        setComment({
            ...comment,
            [event.target.name]: event.target.value
        })
    }



    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1 className="text-center">Comment</h1>
                <div className="col-12 col-md-8 border py-4">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Comment</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};