import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import qs from 'qs';
import blackLogo from '../assets/img/black.log.png';
import { usersSelector } from '../redux/users/selectors';
import { signupUser, usersSlice, clearState } from '../redux/users/slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createNull } from 'typescript';
// @ts-ignore
import MetaTags from 'react-meta-tags';

type FormData = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
  checkbox: string;
};

interface UserData {
  username: string;
  password: string;
  error: string;
}

const Signup = () => {
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [error, SetError] = useState<any | null>(null);
  const [fire, SetFire] = useState<any | null>(null);
  const [sucess, SetSucess] = useState<any | null>(null);
  const [showAlert, SetShowAlert] = useState<any | null>(false);
  const [Notify, setIsNotify] = useState<any | string>();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(usersSelector);

  let reWhiteSpace = new RegExp(/\s/);

  const onSubmit = (data: any) => {
    const passsone = data.password;
    const passtwo = data.cpassword;
    /*  console.log(data.username);
    console.log(data.email);
    console.log(passsone);
    console.log(passtwo); */

    if (
      data.username == '' ||
      data.email == '' ||
      passsone == '' ||
      passtwo == '' ||
      data.checkbox == ''
    ) {
      SetFire('All Fields Are Mandatary');
    } else if (reWhiteSpace.test(data.username) == true) {
      SetFire('White Space Not Allowed With Username');
    } else if (passsone != passtwo) {
      SetFire('password and confirm password not match');
    } else if (passsone.length >= 8 && passsone.length >= 8) {
      SetFire('password and confirm password not grater than 8 character');
    } else if (data.username.length >= 10) {
      SetFire('username not grater than 10 character');
    } else {
      /*   if (result.test(String(data.email).toLowerCase()) == true) {
      Notify(toast('Invalid Email Format'));
    } */
      dispatch<any>(signupUser(data)).then((res: any) => {
        /* console.log(isFetching);
      console.log(isSuccess);
      console.log(isError);
      console.log(errorMessage); */
        //console.log('manish' + res);
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      //alert('yoga');
      dispatch(clearState());
      SetSucess(errorMessage);
      SetError(null);
      SetShowAlert(true);
      reset();
    }
    if (isError) {
      //alert('error');
      dispatch(clearState());

      reset();
      SetError(errorMessage);

      SetShowAlert(true);
    }
  }, [isSuccess, isError, errorMessage]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(clearState());
  //     history.push('/');
  //   }
  //   if (isError) {
  //     toast.error(errorMessage);
  //     dispatch(clearState());
  //   }
  // }, [isSuccess, isError]);

  return (
    <>
      <>
      <MetaTags>
          <title>Signup  - Join The Magic! </title>
          <meta
            name='description'
            content="Signup  - Join The Magic! "
          />
          <meta property='og:title' content='Signup  - Join The Magic!' />
          
          <meta
            property='og:image'
            content='https://mousewait.com/static/media/image.png'
          />
          <meta
            property='og:description'
            content='Signup  - Join The Magic!'/>
        </MetaTags>
        <div className='des-bg'>
          {/*===== MW-banner-sec Start =======*/}
          <section className='MW-signpage'>
            <div className='container'>
              <div className='row'>
                <div className='Sign-bg'>
                  <div className='Mw-Sign text-center'>
                    <img
                      src={blackLogo}
                      className='img-fluid'
                      alt='MouseWait-logo'
                    />
                    <h3>Join The Magic!</h3>
                  </div>

                  <ToastContainer autoClose={3000} />

                  <form
                    className='space-y-6'
                    onSubmit={handleSubmit(onSubmit)}
                    method='POST'
                  >
                    {error && (
                      <div
                        className={`alert alert-danger ${
                          showAlert ? 'alert-shown' : 'alert-hidden'
                        }`}
                        onTransitionEnd={() => SetShowAlert(false)}
                      >
                        {/* {console.log(error)} */}
                        {error.data}
                      </div>
                    )}

                    {fire && (
                      <div
                        className={`alert alert-danger ${
                          showAlert ? 'alert-shown' : 'alert-hidden'
                        }`}
                        onTransitionEnd={() => SetShowAlert(false)}
                      >
                        {fire}
                      </div>
                    )}

                    {sucess && (
                      <div
                        className={`alert alert-success ${
                          showAlert ? 'alert-transation' : 'alert-transation'
                        }`}
                        onTransitionEnd={() => SetShowAlert(false)}
                      >
                        You have Successfully created Account. Please{' '}
                        <Link to='/disneyland/login'>Login</Link>
                      </div>
                    )}

                    <div className='sign-from'>
                      <div className='form-floating mb-3'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='username'
                          {...register('username')}
                        />
                        <label htmlFor='floatingInput'>
                          <i className='fas fa-user' /> Username
                        </label>
                      </div>
                      <div className='form-floating mb-3'>
                        {/* <input
                  type="password"
                  className="form-control"
                  value={password}
                  placeholder="mw-password"
                /> */}
                        <input
                          type='password'
                          className='form-control'
                          placeholder='Password'
                          {...register('password')}
                        />

                        <label htmlFor='floatingInput'>
                          <i className='fas fa-unlock' /> Password
                        </label>
                      </div>
                      <div className='form-floating mb-3'>
                        <input
                          type='password'
                          className='form-control'
                          placeholder='Password'
                          {...register('cpassword')}
                        />
                        <label htmlFor='floatingInput'>
                          <i className='fas fa-unlock' /> Confirm Pasword
                        </label>
                      </div>
                      <div className='form-floating'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Email'
                          {...register('email')}
                        />
                        <label htmlFor='floatingPassword'>
                          <i className='fas fa-envelope' /> Email
                        </label>
                      </div>
                    </div>
                  </form>
                  <div>
                    {' '}
                    <input type='checkbox' {...register('checkbox')} /> &nbsp;
                    By Signing up you agree Term of Service and Privacy Policy{' '}
                  </div>
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
                      <Link to='/disneyland/login/'>
                        Login to Existing Account
                      </Link>
                    </h6>
                  </div>
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

export default Signup;
