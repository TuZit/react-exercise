import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import './register.scss';
import { register } from '../../../store/authSlice.js';

function RegisterForm({ setRedirectPart }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      password: '',
      confirmedPassword: '',
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required')
        .min(4, 'Must be 4 characters or more')
        .max(20, 'Username must not exceed 20 characters'),
      email: Yup.string()
        .required('Required')
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          'Please enter a valid email address'
        ),
      password: Yup.string()
        .required('Required')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          'Password must be 7-19 characters and contain at least one letter, one number and a special character'
        ),
      confirmedPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Password must match'),
      acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
    }),
    onSubmit: (values) => {
      const newValue = {
        username: values.name,
        password: values.password,
      };
      dispatch(register(newValue))
        .unwrap()
        .then((res) => {
          localStorage.setItem('login', JSON.stringify(res));
          navigate('/');
          toast.success('Đăng ký thành công !');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  // Register Func
  // const register = async (values) => {
  //   const newValue = {
  //     username: values.name,
  //     password: values.password,
  //   };
  //   try {
  //     const res = await axios.post(
  //       'http://localhost:5000/api/v1/auth/register',
  //       newValue
  //     );
  //     localStorage.setItem(
  //       'login',
  //       JSON.stringify({
  //         accessToken: res.data.accessToken,
  //       })
  //     );
  //     dispatch(login(newValue));
  //     navigate('/');
  //     toast.success('Đăng ký thành công !');
  //   } catch (err) {
  //     toast.error(err.response.data.message);
  //   }
  // };

  return (
    <>
      {/* Register Body */}
      <div className='register-container'>
        <div className='header-register'>
          <h4 className='title'>組織名</h4>
          <p>アカウントの作成を完了してください</p>
        </div>

        <form id='registerForm' onSubmit={formik.handleSubmit}>
          <div className='row'>
            <div className='form-group'>
              <label htmlFor='UserName'>Tên tài khoản</label>
              <input
                type='text'
                className='form-control-auth'
                id='name'
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && (
                <p className='errorMsg'> {formik.errors.name} </p>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='UserName'>Email</label>
              <input
                type='email'
                className='form-control-auth'
                id='email'
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <p className='errorMsg'> {formik.errors.email} </p>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Mật khẩu</label>
              <input
                type='text'
                className='form-control-auth'
                id='password'
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <p className='errorMsg'> {formik.errors.password} </p>
              )}
            </div>

            <div className='form-group'>
              <label>Xác nhận mật khẩu</label>
              <input
                type='text'
                className='form-control-auth'
                id='confirmedPassword'
                value={formik.values.confirmedPassword}
                onChange={formik.handleChange}
              />
              {formik.errors.confirmedPassword && (
                <p className='errorMsg'> {formik.errors.confirmedPassword} </p>
              )}
            </div>
          </div>

          <div className='check-info mb-2'>
            <div className='checkbox-remember'>
              <input
                type='checkbox'
                id='acceptTerms'
                onChange={formik.handleChange}
                value={formik.values.acceptTerms}
              />
              <label htmlFor='vehicle1'>
                Tôi đông ký với chính sách bảo mật.
              </label>
              {formik.errors.acceptTerms && (
                <p className='errorMsg'> {formik.errors.acceptTerms} </p>
              )}
            </div>
          </div>

          <button type='submit' className='btn btn-primary d-block m-auto'>
            Đăng ký
          </button>
        </form>

        <div className='d-flex justify-content-center note mt-3'>
          <span
            onClick={(e) => {
              e.preventDefault();
              navigate('/auth/login');
            }}
          >
            Nếu có tài khoản rồi thì đăng nhập đi ? Ở đây này :v
          </span>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
