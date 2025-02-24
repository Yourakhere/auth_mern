import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
import 'react-toastify/dist/ReactToastify.css'
import RefreshHandler from './pages/RefreshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />
  }

  return (
    <>
      <div className="App">
        <RefreshHandler  setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          <Route path="/home" element={<PrivateRoute element={<Home/>} />} />
          <Route path="/" element={<Navigate to='/login' />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;