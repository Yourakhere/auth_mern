import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
        console.log(name, value);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Please fill all the fields');
        }
        try {
            const url = 'https://deploy-mern-app-1-api.vercel.app/auth/signup';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
            console.log(result);
           
        } catch (error) {
            handleError(error.message);
        }
    };

    return (
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        onChange={handleChange}
                        type="text" 
                        id="name" 
                        name="name"
                        autoFocus
                        placeholder='Enter your name ...'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input  
                        onChange={handleChange} 
                        type="email" 
                        id="email" 
                        name="email"
                        placeholder='Enter your email ...'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        onChange={handleChange}
                        type="password" 
                        id="password" 
                        name="password"
                        placeholder='Enter your password ...'
                        value={signupInfo.password}
                    />
                </div>
                <button type='submit'>Signup</button><br/>
                <span>Already have an account? 
                    <Link to='/login'>Login</Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
    );
}

export default Signup;