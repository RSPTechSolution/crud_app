import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './view.css';

const View = () => {
    const [user, setUser] = useState({});

    const {id} = useParams();
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/get/${id}`)
        .then((res) => setUser({ ...res.data[0]}));
    }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
        <div className='card'>
            <div className='card-header'>
                <p>User Details</p>
            </div>
            <div className="container">
                <strong>ID: </strong>
                <span>{id}</span>
                <br />
                <br />
                <strong>Name: </strong>
                <span>{user.username}</span>
                <br />
                <br />
                <strong>Email: </strong>
                <span>{user.email}</span>
                <br />
                <br />
                <strong>Password: </strong>
                <span>{user.password}</span>
                <br />
                <br />
                <Link to="/">
                    <input type="button"  className='btn btn-danger' value="Go Back" />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default View
