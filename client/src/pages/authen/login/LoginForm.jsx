import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import './style.scss';
import { login } from '../../../store/authSlice.js';
import { useLoginUserMutation } from '../../../services/RTKQuery/authApi.js';

function LoginForm() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  Login using RTK Query
  const [loginUser, { data, isLoading, isSuccess, isError, error }] =
    useLoginUserMutation();

  // useEffect(() => {
  //   if (isSuccess) {
  //     localStorage.setItem('login', JSON.stringify(data));
  //     navigate('/');
  //   }

  //   if (isError) {
  //     console.log(error);
  //   }
  // }, [data, isSuccess]);

  // if (isLoading) {
  //   return <h2>Loading...</h2>;
  // }

  // Submit func
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }))
      .unwrap()
      .then((res) => {
        localStorage.setItem('login', JSON.stringify(res));
        navigate('/');
      })
      .catch((err) => {
        toast.error(err);
      });

    // login();
    // loginUser({
    //   username,
    //   password,
    // });
  };

  return (
    <>
      {/* Login Body */}
      <div className='register-container'>
        <div className='header-register'>
          <h4 className='title'>組織名</h4>
          <p>アカウントの作成を完了してください</p>
        </div>

        <form id='loginForm' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='UserName'>Tên tài khoản</label>
            <input
              type='text'
              className='form-control-auth'
              id='UserName'
              onChange={(e) => setUserName(e.target.value)}
            />
            <img
              className='icon-input'
              src='https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-user.png'
              alt=''
            />
          </div>
          <div className='form-group'>
            <label htmlFor='Password'>Mật khẩu</label>
            <input
              type='text'
              className='form-control-auth'
              id='Password'
              autoComplete='on'
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              className='icon-input'
              src='https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-key.png'
              alt=''
            />
          </div>

          <div className='d-flex justify-content-between remember-block'>
            <div className='checkbox-remember'>
              <input
                type='checkbox'
                id='vehicle1'
                name='vehicle1'
                value='Bike'
              />
              <label htmlFor='vehicle1'>Ghi nhớ tôi</label>
            </div>
            <Link to='true' className='text-decoration-none text-forgot'>
              Quên mật khẩu
            </Link>
          </div>
          <button type='submit' className='btn btn-primary d-block m-auto'>
            Đăng nhập
          </button>
        </form>

        <div className='d-flex justify-content-center note'>
          <span
            onClick={(e) => {
              e.preventDefault();
              navigate('/auth/register');
              // setRedirectPart(false);
            }}
          >
            Nếu chưa có tài khoản rồi thì đăng ký đi ? Ở đây này :v
          </span>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
