import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchLounges, fetchMyProfile } from '../redux/lounges/slice';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import midBanner from '../assets/img/mid-banner-img.png';
import { Placeholder } from '../components/Placeholder';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import TabButons from "./TabButons";
import { useForm } from 'react-hook-form';
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { updateprofile, usersSlice, clearState } from '../redux/users/slice';

function UpdateDetails() {
  type FormData = {
    image: any;
    user_description: any;
  };

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

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

  // setValue("user_description",setuserdescription);
  // const [isdirect, setIsDirect] = useState<any | string>("");

  let key: any = null;

  //Submit function

  const onSubmit = (data: any) => {
    dispatch<any>(updateprofile(data)).then((res: any) => {
      // Notify(toast(res.payload));
    });
  };

  useEffect(() => {
    dispatch<any>(fetchMyProfile({ key })).then((res: any) => {
      setdescription(res.payload[0].user.user_description);
      // setIsDirect(res.payload[0].user.isdirect_msg);
      setImage(res.payload[0].user.image);
    });
    setValue('user_description', description);
  }, [description]);

  useEffect(() => {
    setValue('image', image);
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
                          <Tab className='tablist-items'>
                            <Link to='/disneyland/setting/name'>
                              Update Name
                            </Link>
                          </Tab>
                          <Tab className='tablist-items'>
                            <Link to='/disneyland/setting/email'>
                              Update Email
                            </Link>
                          </Tab>
                          {/* <Tab className='tablist-items'>
                            
                            <Link to='/disneyworld/setting/about'>
                              
                              About
                            </Link>
                          </Tab> */}
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

                        <ToastContainer autoClose={3000} />

                        <form
                          className='name-form'
                          style={{ height: '50vh' }}
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className='row mb-3'>
                            <label
                              htmlFor='tarea'
                              className='col-sm-3 col-form-label'
                            >
                              About yourself
                            </label>
                            <div className='input-t col-sm-9'>
                              <textarea
                                className='form-control'
                                id='tarea'
                                {...register('user_description')}
                              />
                              {/* <input
                               
                               // type="user_name"
                               className="form-control"
                               // id="user_name"
                               {...register("about_user")}
                             /> */}
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
                                  type='submit'
                                  className='btn pro-btn'
                                  onClick={handleSubmit(onSubmit)}
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

export default UpdateDetails;
