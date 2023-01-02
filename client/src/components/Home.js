import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const Home = () => {
    const [data, setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };
    useEffect(() => {
        loadData();
    }, []);
    const deleteUser = (id) => {
        if(window.confirm("Are you sure?")){
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("User Deleted Successfully");
            setTimeout(() => loadData(), 500);
        }
    }
  return (
    <div style={{marginTop: "150px"}}>
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
      <table className="styled-table">
       
        <thead>
            <tr>
                <th style={{textAlign: "center"}}>Sr No.</th>
                <th style={{textAlign: "center"}}>Name</th>
                <th style={{textAlign: "center"}}>Email</th>
                <th style={{textAlign: "center"}}>Password</th>
                <th style={{textAlign: "center"}}>Actions  
                <Link to={'/addContact'}>
                    <button className='btn btn-contact'> Add User</button>
                </Link>
                </th>
            </tr>
        </thead>
        <tbody>
        {data.map((item, index) => {
            return( 
                <tr key={item.id}>
                    <th scope='row'>{index+1}</th>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>
                        <Link to={`/update/${item.id}`}>
                            <button className='btn btn-edit'>Edit</button>
                        </Link>
                        <button className='btn btn-delete' onClick={() => deleteUser(item.id)}>Delete</button>
                        <Link to={`/view/${item.id}`}>
                            <button className='btn btn-view'>View</button>
                        </Link>
                        <Link to={`/user/login`}>
                            <button className='btn btn-view'>Login</button>
                        </Link>
                    </td>
                </tr>
            );
        })}
        </tbody>
      </table>
    </div>
  )
}

export default Home
