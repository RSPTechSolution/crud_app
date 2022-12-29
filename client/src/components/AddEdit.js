import React, { useState, useEffect } from 'react';
import 'bootstrap3/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './AddEdit.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Clock from 'react-live-clock';
import 'react-toastify/dist/ReactToastify.css';

// import Axios from "axios";

const initialState = {
    username: "",
    email: "",
    password: ""
}

const AddEdit = () => {

    const [state, setState] = useState([initialState]);
    const {username, email, password} = state;
    const history = useNavigate();
    const {id} = useParams();

    useEffect(()=> {
        axios.get(`http://localhost:5000/api/get/${id}`).then((res) => setState({ ...res.data[0]}));
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!username || !email || !password ){
            toast.error("Please provide any value!");
        }else{
            if(!id){
                axios.post("http://localhost:5000/api/post", {
                    username,
                    email,
                    password,
                }).then(() => {
                    setState({ username: "", email: "", password:"" });
                }).catch((err) => toast.error(err.response.data));
                toast.success("Data Inserted");
                setTimeout(() =>  history("/"), 500);
            }else{
                axios.put(`http://localhost:5000/api/update/${id}`, {
                    username,
                    email,
                    password,
                    id
                }).then(() => {
                    setState({ username: "", email: "", password:"" });
                }).catch((err) => toast.error(err.response.data));
                toast.success(`Data updated User id ${id}`);
                setTimeout(() =>  history("/"), 500);
            }
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    }
  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClickrtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
        <div className='clock-time'>
            <Clock className='clock' format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />
        </div>
    <div className="signup-form">
        <form action="" method="post" onSubmit={handleSubmit}>
            <h2>Add User</h2>
            <p>Please fill in this form to create an account!</p>
            <hr/>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                    <input type="text" className="form-control" id='username' name="username" placeholder="Username"  value={username || ""} onChange={handleInputChange}/>
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-paper-plane"></i></span>
                    <input type="email" className="form-control" id='email' name="email" placeholder="Email Address"  value={email || ""} onChange={handleInputChange}/>
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                    <input type="text" className="form-control" id='password' name="password" placeholder="Password"  value={password || ""} onChange={handleInputChange} />
                </div>
            </div>
            <div className="form-group">
                <input type="submit" value={id ? "Update" : "Save"} className="btn btn-primary btn-lg"/>
            <Link to="/" >
                <input type="button" className='btn btn-danger btn-lg' value="Go back"/>
            </Link>
            </div>
            
        </form>
    </div>
    </>
  )
}

export default AddEdit
