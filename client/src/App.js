import React from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './pages/authen/login/LoginForm.jsx';
import RegisterForm from './pages/authen/register/RegisterForm.jsx';
import AuthLayout from './pages/authen/authLayout/index.js';
import RoleControlRTK from './pages/dashboard/RoleControl-RTK.js';
import RoleControlAxios from './pages/dashboard/RoleControl-Axios.js';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const isSuccess = JSON.parse(localStorage.getItem('login'));

  return (
    <div className='app'>
      <Routes>
        <Route
          path='/'
          element={
            isLoggedIn === true ? (
              <RoleControlRTK />
            ) : (
              <Navigate to='auth/login' />
            )
          }
        />
        <Route path='axios' element={<RoleControlAxios />} />
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginForm />} />
          <Route path='register' element={<RegisterForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
