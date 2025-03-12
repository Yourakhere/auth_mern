import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';  
import Signup from './pages/Signup'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />;
  };

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/*" element={<Navigate to='/login' />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
