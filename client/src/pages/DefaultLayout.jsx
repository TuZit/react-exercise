import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoleControl from '../components/RoleControl.js';
import AuthLayout from './authen/authLayout/index.js';
import PostDashboard from './post/PostDashboard.jsx';
import RegisterForm from './authen/register/RegisterForm.jsx';
import LoginForm from './authen/login/LoginForm.jsx';

function DefaultLayout() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RoleControl />} />z
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginForm />} />
          <Route path='register' element={<RegisterForm />} />
        </Route>
        <Route path='/post' element={<PostDashboard />} />
      </Routes>
    </div>
  );
}

export default DefaultLayout;
