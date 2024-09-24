import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { Placeholder } from '../components/Placeholder';
import { fetchMyStore } from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import { LoungeHeader } from '../components/LoungeHeader';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';
import { changePassUser, usersSlice, clearState } from '../redux/users/slice';
import blackLogo from '../assets/img/black.log.png';
type FormData = {
  password_old: any;
  password_new: any;
  cpassword: any;
};

const ChangePassword = () => {
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
    const passsone = data.password_new;
    const passtwo = data.cpassword;

    if (passsone == passtwo) {
      dispatch<any>(changePassUser(data)).then((res: any) => {});
    } else {
      SetError('password and confirm password not match');
      reset();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      SetSucess(errorMessage);
      SetError(null);
      SetShowAlert(true);
      reset();
      navigate('/disneyland/lounge/');
    }
    if (isError) {
      dispatch(clearState());
      reset();
      SetError(errorMessage);
      SetShowAlert(true);
    }
  }, [isSuccess, isError, errorMessage]);

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  return (
    <>
      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec mwstore-page-bg'>
            <LoungeHeader />
            <MobileLoungeHeader />

            <div className='des-bg'>
              {/*===== MW-banner-sec Start =======*/}
              <section className='MW-signpage'>
                <div className='container'>
                  <div className='row'>
                    <div className='Sign-bg bg-white'>
                      <div className='Mw-Sign text-center'>
                        <img
                          src={blackLogo}
                          className='img-fluid'
                          alt='MouseWait-logo'
                        />
                        <h3>Reset Password</h3>
                        <h6>Enter your old password to reset/change with new one</h6>
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
                        {/*  <h3 className="text-center">Change Password</h3> */}

                        <div className='sign-from'>
                          <div className='form-floating mb-3'>
                            <input
                              type='password'
                              className='form-control'
                              placeholder='password_old'
                              {...register('password_old')}
                            />
                            <label htmlFor='floatingInput'>
                              <i className='fas fa-unlock' /> Old Password
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
                              placeholder='password_new'
                              {...register('password_new')}
                            />

                            <label htmlFor='floatingInput'>
                              <i className='fas fa-unlock' />
                              New Password
                            </label>
                          </div>
                          <div className='form-floating mb-3'>
                            <input
                              type='password'
                              className='form-control'
                              placeholder='cPassword'
                              {...register('cpassword')}
                            />
                            <label htmlFor='floatingInput'>
                              <i className='fas fa-unlock' /> Confirm Password
                            </label>
                          </div>
                        </div>
                      </form>

                      <div className='sign-btn text-center'>
                        <button
                          type='button'
                          onClick={handleSubmit(onSubmit)}
                          className='MW-btn'
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
