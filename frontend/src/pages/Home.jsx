import React, { useEffect, useState } from 'react';
import { handleSuccess, handleError } from '../utils';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    setLoggedInUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('Logged out successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

 
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
     
      <ToastContainer />
    </div>
  );
}

export default Home;