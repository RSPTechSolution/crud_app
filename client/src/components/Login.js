import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState({});
    const history = useNavigate();

    const handleInputChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
        
    };
    const handleSubmit = e => {
        e.preventDefault();
        const {username, password} = formData;
       
        if(!formData.username || !formData.password){
            toast.error("Please enter login details first")
        }else{
            axios.post("http://localhost:5000/api/login", {
                    username,
                    password
                }).then((response) => {
                    if(response.data[0]){
                        toast.success("Login Successfull");
                        setTimeout(() => history("/dashboard"), 500);
                    }else{
                       toast.error("Wrong information");
                    }

                })
                    
        }
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
      <div className="signup-form">
        <form action="" method="post" onSubmit={handleSubmit} >
            <h2>Login</h2>
            <p>Please fill in this form to Login!</p>
            <hr/>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                    <input type="text" className="form-control" id='username' name="username" placeholder="Username" onChange={handleInputChange} />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                    <input type="password" className="form-control" id='password' name="password" placeholder="Password"  onChange={handleInputChange}  />
                </div>
            </div>
            <div className="form-group">
                <input type="submit" value="Login" className="btn btn-primary btn-lg" />
            </div>
            
        </form>
    </div>
    </>
  )
}

export default Login;
