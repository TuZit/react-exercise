import React from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import RoleControl from './dashboard/RoleControl.js';
import LoginForm from './pages/authen/login/LoginForm.jsx';
import RegisterForm from './pages/authen/register/RegisterForm.jsx';
import AuthLayout from './pages/authen/authLayout/index.js';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isSuccess = JSON.parse(localStorage.getItem('login'));

  return (
    <div className='app'>
      <Routes>
        <Route
          path='/'
          element={
            isLoggedIn === true ? <RoleControl /> : <Navigate to='auth/login' />
          }
        />
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginForm />} />
          <Route path='register' element={<RegisterForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
