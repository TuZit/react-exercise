import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './style.scss';

function AuthLayout() {
  return (
    <div className='auth-layout'>
      <ToastContainer theme='colored' limit={1} />
      <div className='layout-left'>
        <img
          src='https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/bg_login-register.jpg'
          alt='logo'
        ></img>
      </div>
      <div className='layout-right'>
        <div className='form-input h-100'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
