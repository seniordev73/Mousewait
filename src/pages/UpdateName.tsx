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

import cardImage from '../assets/img/card-s-img.png';
import cardmImage from '../assets/img/card-m-img.png';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import TabButons from "./TabButons";
import { updateprofile, usersSlice, clearState } from '../redux/users/slice';
function UpdateName() {
  // type FormData = {
  //   user_name: string;
  //   myfile: any;
  // };

  // const dispatch = useDispatch()

  // const { isFetching, isSuccess, isError, errorMessage } =
  // useSelector(usersSelector);

  // const { getProfileItem, status } = useSelector(selectLounges);
  // const {
  //   register,
  //   setValue,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<FormData>();

  // //getting users
  // const user = localStorage.getItem("user");

  // //  making useState
  // const [image, setImage] = useState<any>("");
  // const [error, SetError] = useState<any | null>(null);
  //   const [sucess, SetSucess] = useState<any | null>(null);
  // const [showAlert, SetShowAlert] = useState<any | null>(false);

  // const [uname, setName] = useState<any | string>("");
  // const [isdirect, setIsDirect] = useState<any | string>("");

  // let key: any = null;

  type FormData = {
    myfile: any;
    user_name: string;
  };

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  //getting users
  const user = localStorage.getItem('user');

  const dispatch = useDispatch();

  const { getProfileItem, status } = useSelector(selectLounges);

  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(usersSelector);

  const [Notify, setIsNotify] = useState<any | string>();

  const [image, setImage] = useState<any>('');
  const [error, SetError] = useState<any | null>(null);
  const [sucess, SetSucess] = useState<any | null>(null);
  const [showAlert, SetShowAlert] = useState<any | null>(false);
  const [description, setdescription] = useState<string | null>('');

  const [uname, setName] = useState<any | string>('');
  const [isdirect, setIsDirect] = useState<any | string>('');

  let key: any = null;

  const onSubmit = (data: any) => {
    dispatch<any>(updateprofile(data)).then((res: any) => {
      // const userName = localStorage.setItem('user_name',uname);
      // console.log(userName)
      window.location.reload();
      // Notify(toast(res.payload.data));
    });
  };

  useEffect(() => {
    dispatch<any>(fetchMyProfile({ key })).then((res: any) => {
      setName(res.payload[0].user.user_name);
      // setIsDirect(res.payload[0].user.isdirect_msg);
      setImage(res.payload[0].user.image);
    });
    setValue('user_name', uname);
  }, [uname]);

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
                        <TabList className='profile-btn'>
                          {/* <Tab className='tablist-items'>
                            <Link to='/disneyland/setting/name'>
                              Name
                            </Link>
                          </Tab> */}
                          <Tab className='tablist-items'>
                            <Link to='/disneyland/setting/email'>
                              Update Email
                            </Link>
                          </Tab>
                          <Tab className='tablist-items'>
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
                        {/* <TabButons/> */}
                        <div className='row  profile-container mb-3'>
                          <label
                            htmlFor='file-f'
                            className='col-sm-4 col-form-label-heading'
                          ></label>
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
                        {/* //toast  */}
                        <ToastContainer autoClose={3000} />

                        <form
                          className='name-form'
                          style={{ height: '50vh' }}
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className='row mb-3'>
                            <label
                              htmlFor='name'
                              className='col-sm-3 col-form-label'
                            >
                              Name
                            </label>
                            <div className='input-t col-sm-9'>
                              <input
                                // type="user_name"
                                className='form-control'
                                // id="user_name"
                                {...register('user_name')}
                              />
                            </div>
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

export default UpdateName;
