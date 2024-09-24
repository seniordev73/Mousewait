import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';
import blackLogo from '../assets/img/black.log.png';
import Footer from '../components/Footer';
import { RiHomeHeartLine } from 'react-icons/ri';
import internal from 'stream';
import { useForm } from 'react-hook-form';

import { forgotPass, usersSlice, clearState } from '../redux/users/slice';

import { usersSelector } from '../redux/users/selectors';
import Email from './Email';

type FormData = {
  email: string;
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(usersSelector);

  //fetching react custom hooks

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<FormData>();

  const [error, SetError] = useState<any | null>(null);
  const [sucess, SetSucess] = useState<any | null>(null);
  const [showAlert, SetShowAlert] = useState<any | null>(false);

  const onSubmit = (data: any) => {
    dispatch<any>(forgotPass(data)).then((res: any) => {
      console.log(res);
    });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log('success');
      dispatch(clearState());
      SetSucess(true);
      SetShowAlert(false);
      reset();
    }
    if (isError) {
      console.log('error');
      dispatch(clearState());
      reset();

      SetError(errorMessage);
      SetShowAlert(true);
    }
  }, [isSuccess, isError, errorMessage]);

  // internal styling starts here
  const name = {
    fontSize: '2.1rem',
  };
  const paragraph = {
    fontSize: '1.2rem',
  };

  const img = {
    width: '120px',
  };
  const invalid = {
    color: 'red',
  };
  // ends of styling

  return (
    <>
      <>
        <div className='des-bg'>
          {/*===== MW-banner-sec Start =======*/}
          <section className='MW-signpage'>
            <div className='container'>
              <div className='row'>
                <div className='Sign-bg'>
                  <form action='' onSubmit={handleSubmit(onSubmit)}>
                    <div className='Mw-Sign text-center'>
                      <img
                        style={img}
                        src={blackLogo}
                        className='img-fluid'
                        alt='MouseWait-logo'
                      />

                      <h3 style={name}>Forgot Password?</h3>
                      <p style={paragraph}>
                        Enter your email address to reset your password
                      </p>

                      {sucess === true ? (
                        <div className='alert alert-success'>
                          <p>Please Check Your Mail Box !</p>
                        </div>
                      ) : (
                        ''
                      )}
                      {showAlert === true ? (
                        <div className='alert alert-danger'>
                          <p>Email not registered</p>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className='sign-from'>
                      <div className='form-floating mb-3'>
                        <input
                          type='email'
                          className='form-control'
                          id='floatingInput'
                          placeholder='mw-email'
                          {...register('email', {
                            required: true,
                            pattern:
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          })}
                        />
                        <label htmlFor='floatingInput'>
                          <i className='fa-regular fa-envelope' />
                          Email
                        </label>
                        {errors.email && (
                          <span style={invalid}>Invalid email</span>
                        )}
                      </div>
                      <div className='form-floating'></div>
                    </div>
                    <div className='sign-btn text-center'>
                      <button
                        type='button'
                        onClick={handleSubmit(onSubmit)}
                        className='MW-btn'
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
                <div></div>
              </div>
            </div>
          </section>
        </div>
      </>
    </>
  );
};

export default ForgotPassword;
