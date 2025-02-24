import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
        console.log(name, value);

    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const {email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Please fill all the fields');
        }
        try {
            const url = 'https://123-lime-one.vercel.app/auth/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            }
            console.log(result);
           
        } catch (error) {
            handleError(error.message);
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input  
                        onChange={handleChange} 
                        type="email" 
                        id="email" 
                        name="email"
                        placeholder='Enter your email ...'
                        value={loginInfo.email}
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
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button><br/>
                <span>If don't have an account? 
                    <Link to='/signup'>Signup</Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
    );
}

export default Login;
