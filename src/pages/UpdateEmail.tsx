import React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useLocation } from 'react-router';
import { Placeholder } from '../components/Placeholder';
import { fetchLounges, fetchMyProfile } from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import midBanner from '../assets/img/mid-banner-img.png';
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import cardImage from '../assets/img/card-s-img.png';
import cardmImage from '../assets/img/card-m-img.png';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { updateprofile, usersSlice, clearState } from '../redux/users/slice';

function UpdateEmail() {
  type FormData = {
    user_email: string;
    myfile: any;
  };
  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(usersSelector);

  const { getProfileItem, status } = useSelector(selectLounges);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  //getting users
  const user = localStorage.getItem('user');

  const [image, setImage] = useState<any>('');
  const [error, SetError] = useState<any | null>(null);
  const [sucess, SetSucess] = useState<any | null>(null);
  const [showAlert, SetShowAlert] = useState<any | null>(false);

  const [uemail, setEmail] = useState<any | string>('');
  const [isdirect, setIsDirect] = useState<any | string>('');

  const [Notify, setIsNotify] = useState<any | string>();

  //submitting

  const onSubmit = (data: any) => {
    dispatch<any>(updateprofile(data)).then((res: any) => {
      // console.log(res);

      window.location.reload();
      // Notify(toast(res.payload));
    });
  };

  let key: any = null;

  //styling
  const invalid = {
    color: 'red',
  };

  useEffect(() => {}, []);

  useEffect(() => {
    dispatch<any>(fetchMyProfile({ key })).then((res: any) => {
      setEmail(res.payload[0].user.user_email);
      setIsDirect(res.payload[0].user.isdirect_msg);
      setImage(res.payload[0].user.image);
    });
    setValue('user_email', uemail);
  }, [uemail]);

  useEffect(() => {
    setValue('myfile', image);
  }, [image]);

  return (
    <>
      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec'>
            <div className='banner-img'>
              <Link to='/disneyland/lounge/'>
                <img
                  src={midBanner}
                  className='img-fluid'
                  alt='mid-banner-img'
                />
              </Link>
            </div>

            {status === 'loading'
              ? [...new Array(9)]?.map((_, index) => (
                  <Placeholder key={index} />
                ))
              : getProfileItem?.map((obj) =>
                  obj.error != null ? (
                    <div className='des-bg'>
                      <div className='mid-card-sec'>
                        <div className='card-mn rounded'>
                          <div className='card-body'>{obj.error}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='mwstore-mid-bg'>
                      <div className='mws-mid-sec'>
                        <h5 className='mid-head'></h5>
                        {/* // mousewait profile here */}
                      </div>
                      {/*-=====mw-profile-page start ======-*/}
                      <div className='mw-profile'>
                        {/* //header button */}
                        <TabList className='profile-btn'>
                          <Tab className='tablist-items'>
                            <Link to='/disneyland/setting/name'>
                              Update Name
                            </Link>
                          </Tab>
                          <Tab className='tablist-items'>
                            {/* <Link to='/disneyland/setting/emails'>
                              
                              Email
                            </Link>
                          </Tab>
                          <Tab className='tablist-items'> */}

                            <Link to='/disneyland/setting/about'>
                              Update About
                            </Link>
                          </Tab>
                          <Tab className='tablist-items'>
                            <Link to='/disneyland/setting/dp'>
                              Update Photo
                            </Link>
                          </Tab>
                        </TabList>

                        <div className='row  profile-container mb-3'>
                          <label
                            htmlFor='file-f'
                            className='col-sm-4 col-form-label-heading'
                          >
                            {/* <h3 className="profile_heading_text">
                              Profile Picture
                            </h3> */}
                          </label>
                          <div className='tab-img d-flex'>
                            <div
                              className='input-t col-sm-9'
                              style={{ marginLeft: '20vw', marginTop: '1rem' }}
                            >
                              <img
                                src={
                                  GET_BASE_URL_IMAGE +
                                  '/disneyland/images/userimg/' +
                                  image
                                }
                                className='profile_img'
                                alt='big-top'
                              />
                            </div>
                          </div>
                        </div>
                        {/* // alert message here  */}

                        <ToastContainer autoClose={3000} />

                        <form
                          className='form name-form'
                          style={{ height: '50vh' }}
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className='row mb-3'>
                            <label
                              htmlFor='email'
                              className='col-sm-3 col-form-label'
                            >
                              Email
                            </label>
                            <div className='input-t col-sm-9'>
                              <input
                                type='user_email'
                                className='form-control'
                                id='user_email'
                                {...register('user_email', {
                                  required: true,
                                  pattern:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                })}
                              />
                            </div>
                            {errors.user_email && (
                              <span style={invalid}>Invalid email</span>
                            )}
                          </div>

                          <div className='btn-pro'>
                            <div className='row mb-3'>
                              <label
                                htmlFor='sel-in'
                                className='col-sm-3 col-form-label'
                              />
                              <div className='input-t col-sm-9'>
                                <button
                                  type='button'
                                  typeof='email'
                                  onClick={handleSubmit(onSubmit)}
                                  className='btn pro-btn'
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )
                )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateEmail;
