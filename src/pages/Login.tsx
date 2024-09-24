import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';
import blackLogo from '../assets/img/black.log.png';
import { usersSelector } from '../redux/users/selectors';
import { signinUser, usersSlice, clearState } from '../redux/users/slice';
import { createNull } from 'typescript';
// @ts-ignore
import MetaTags from 'react-meta-tags';
import Logo from "../assets/img/MouseWait.png";


type FormData = {
  password: string;
  username: string;
  loginfrom: string;
};

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [error, SetError] = useState<any | null>(null);
  const [sucess, SetSucess] = useState<any | null>(null);
  const [showAlert, SetShowAlert] = useState<any | null>(false);
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(usersSelector);
  const onSubmit = (data: any) => {
    dispatch<any>(signinUser(data)).then((res: any) => {
      // console.log(res);
    });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log('success');
      dispatch(clearState());
      SetSucess(errorMessage);
      SetError(null);
      SetShowAlert(true);
      reset();
      navigate('/disneyland/lounge/');
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
  console.log(accessfrom);
  return (
    <>
      <>

      <MetaTags>
          <title>Login - Mousewait </title>
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
                    Please Login from me tab
                  </div>
                ) : (
                  <div className='Sign-bg'>
                    <div className='Mw-Sign text-center'>
                      <Link to='/disneyland/lounge'>
                        <img
                            src={blackLogo}
                            className='img-fluid'
                            alt='MouseWait-logo'
                        />
                      </Link>
                      
                      <h3>Welcome Back</h3>
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
                            type='email'
                            className='form-control'
                            id='floatingInput'
                            placeholder='mw-email'
                            {...register('username')}
                          />
                          <label htmlFor='floatingInput'>
                            <i className='fas fa-user' /> Username
                          </label>
                        </div>
                        <div className='form-floating'>
                          <input
                            type='password'
                            className='form-control'
                            id='floatingPassword'
                            placeholder='Password'
                            {...register('password')}
                          />
                          <label htmlFor='floatingPassword'>
                            <i className='fas fa-lock' /> Password
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
                        Let's Go!
                      </button>
                      <h6>
                        <Link to='/forgotpassword'>
                          Forgot Username/Password?
                        </Link>
                      </h6>
                      <h6>
                        <Link to='/signup'>Create New Account</Link>
                      </h6>
                    </div>
                  </div>
                )}
                <div></div>
              </div>
            </div>
          </section>
        </div>
      </>
    </>
  );
};

export default Login;
