import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import qs from 'qs';
import blackLogo from '../assets/img/black.log.png';
import { usersSelector } from '../redux/users/selectors';
import { signinUser, usersSlice, clearState, resetPassword } from '../redux/users/slice';
import { createNull } from 'typescript';
// @ts-ignore
import MetaTags from 'react-meta-tags';
import Logo from "../assets/img/MouseWait.png";
import { stringify } from 'querystring';
import { Center } from '@mantine/core';


type FormData = {
  user_pass: string;
  user_pass1: string;
  loginfrom: string;
};

const ForgetPasswordConfirm = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [error, SetError] = useState<any | null>(null);
  const [sucess, SetSucess] = useState<any | null>(null);
  const [showAlert, SetShowAlert] = useState<any | null>(false);
  const { isFetching, isSuccess, isError, errorMessage } =
  useSelector(usersSelector);
  const params = new URLSearchParams(useLocation().search);
  const [isReset, setIsReset] = useState(false);

  const onSubmit = (data: any) => {
    console.log('userid', params.get('uid'))
    console.log('resetkey', params.get('resetkey'))

    if(data['user_pass'] != data['user_pass1'])
      SetError('Password Incorrect!');
    else {
      var info = {user_id: params.get('uid'), resetkey: params.get('resetkey'), user_pass: data['user_pass']};
      dispatch<any>(resetPassword(info)).then((res: any) => {
        setIsReset(true);
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log('success');
      dispatch(clearState());
      SetSucess(errorMessage);
      SetError(null);
      SetShowAlert(true);
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

  const accessfrom = localStorage.getItem('access');
  return (
    <>
      <>

      <MetaTags>
          <title> Mousewait Password Reset </title>
          <meta
            name='description'
            content="login in the mouswait for access lounge "
          />
          <meta property='og:title' content='Login - Mousewait' />
          
          <meta
            property='og:image'
            content='https://mousewait.com/static/media/image.png'
          />
          <meta
            property='og:description'
            content='Login in the mousewait'/>
        </MetaTags>
        <div className='des-bg'>
          {/*===== MW-banner-sec Start =======*/}
          <section className='MW-signpage'>
            <div className='container'>
              <div className='row'>
                {accessfrom === 'app' ? (
                  <div className='alert alert-danger' role='alert'>
                    Please Reset Password from me tab
                  </div>
                ) : 
                  !isReset ? (
                  <div className='Sign-bg'>
                    <div className='Mw-Sign text-center'>
                      <Link to='/disneyland/lounge'>
                        <img
                            src={blackLogo}
                            className='img-fluid'
                            alt='MouseWait-logo'
                        />
                      </Link>
                      
                      <h3>Enter your new password</h3>
                    </div>

                    {error && (
                      <div
                        className={`alert alert-danger ${
                          showAlert ? 'alert-shown' : 'alert-hidden'
                        }`}
                        onTransitionEnd={() => SetShowAlert(false)}
                      >
                        {error}
                      </div>
                    )}
                    <form
                      className='space-y-6'
                      onSubmit={handleSubmit(onSubmit)}
                      method='POST'
                    >
                      <div className='sign-from'>
                        <div className='form-floating mb-3'>
                          <input
                            type='password'
                            className='form-control'
                            id='floatingInput'
                            placeholder='Password'
                            {...register('user_pass')}
                          />
                          <label htmlFor='floatingInput'>
                            <i className='fas fa-user' /> Password
                          </label>
                        </div>
                        <div className='form-floating'>
                          <input
                            type='password'
                            className='form-control'
                            id='floatingPassword'
                            placeholder='Password Confirm'
                            {...register('user_pass1')}
                          />
                          <label htmlFor='floatingPassword'>
                            <i className='fas fa-lock' /> Password Confirm
                          </label>
                        </div>
                        <input
                          type='hidden'
                          className='form-control'
                          id='floatingInput'
                          placeholder='mw-email'
                          defaultValue={'webview'}
                          {...register('loginfrom')}
                        />
                      </div>
                    </form>
                    <div className='sign-btn text-center'>
                      <button
                        type='button'
                        onClick={handleSubmit(onSubmit)}
                        className='MW-btn'
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>
                  ) : (
                  <div>
                    <div className='Mw-Sign text-center'>
                      <Link to='/disneyland/lounge'>
                        <img
                            src={blackLogo}
                            className='img-fluid'
                            alt='MouseWait-logo'
                        />
                      </Link>
                      
                      <h3>Enter your new password</h3>
                    </div>

                    <p style={{textAlign: 'center', fontSize: '20px'}}>Your password has been reset.</p>
                    
                    <div className='sign-btn text-center'>
                      <button
                        type='button'
                        onClick={() => navigate('/disneyland/login/')}
                        className='MW-btn'
                      >
                        Login
                      </button>
                    </div>
                  </div>
                  )
                }
                <div></div>
              </div>
            </div>
          </section>
        </div>
      </>
    </>
  );
};

export default ForgetPasswordConfirm;
