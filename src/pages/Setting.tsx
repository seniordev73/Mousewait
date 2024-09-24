import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { url } from 'inspector';
import { verifyEmail } from '../redux/users/slice';
import { GET_BASE_URL_IMAGE, dTime } from '../constants/apiEndpoints';
const Setting = () => {
  const dispatch = useAppDispatch();
  const { getProfileItem, status } = useSelector(selectLounges);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  //const token= localStorage.getItem("token");
  // const user = localStorage.getItem("");

  type FormData = {
    email: string;
    uname: string;
    user_description: any;
    isdirect: string;
    myfile: any;
  };

  const [uname, setName] = useState<any | string>('');
  const [email, setEmail] = useState<any | string>('');

  const [isdirect, setIsDirect] = useState<any | string>('');
  const [image, setImage] = useState<any>('');
  const [description, setdescription] = useState<string | null>('');
  const [verified, setVerified] = useState<string | null>('');
  // const [desc , setdesc] = useState<any | string>("");
  let key: any = null;

  useEffect(() => {
    dispatch(fetchMyProfile({ key }));
    dispatch<any>(fetchMyProfile({ key })).then((res: any) => {
      setName(res.payload[0].user.user_name);
      setEmail(res.payload[0].user.user_email);
      setdescription(res.payload[0].user.user_description);
      setIsDirect(res.payload[0].user.isdirect_msg);
      setImage(res.payload[0].user.image); //this line change profile pic
      setVerified(res.payload[0].user.isvarified);
    });
  }, []);
  useEffect(() => {
    setValue('uname', uname);
    setValue('email', email);
    setValue('isdirect', isdirect);
    setValue('myfile', image);
    setValue('user_description', description);
  }, [uname, email, isdirect, image, description]);

  // useEffect(() => {
  //   setValue("email", email);
  // }, [email]);
  // useEffect(() => {
  //   setValue("isdirect", isdirect);
  // }, [isdirect]);
  // useEffect(() => {
  //   setValue("image", image);
  // }, [image]);

  /*   const getUserName = (name:any) => {
  setName(name)
   }; */

  /* for logout */

  let navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') as any);
  const [userId, setUserId] = useState(localStorage.getItem('user_id') as any);
  const [showMenu, setShowMenu] = useState<any | string>(false);
  useEffect(() => {
    setToken(localStorage.getItem('token') as any);
    setUserId(localStorage.getItem('user_id') as any);
  }, [token]);
  const location = useLocation();

  const onLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('email');
    localStorage.clear();
    setToken(null);
    setUserId(null);
    window.location.reload();
    navigate('/disneyland/lounge/');
  };
  const btn = {
    padding: '3 8px',
  };

  const profile = {
    paddingLeft: '20px',
    marginLeft: ' 10vw',
    width: '220px',
    marginTop: '42px',
  };
  const container = {
    paddingLeft: '8%',
  };

  const imageContainer = {
    // border:'2px solid red',
    width: '49vw',
    // marginLeft:"-100px",
    display: 'flex',
    justifyContent: 'space-between',
  };
  const button = {
    // border:"2px solid blue",
    marginTop: '20px',
    padding: '3 8px',
  };

  /* for logout */

  const verifyMail = (verifymail: any) => {
    dispatch<any>(verifyEmail(verifymail)).then((res: any) => {
      window.confirm(res.payload.data);
    });
  };

  return (
    <>
      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec'>
            <div className='banner-img'>
              <img
                  src={midBanner}
                  className='img-fluid'
                  alt='mid-banner-img'
              />
              <Link to='/disneyland/lounge/' className="banner-logo"></Link>
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
                        {/* profile header section starts here  */}

                        <div
                          className='profile_footer'
                          style={{ marginTop: '1.3rem' }}
                        >
                          <Link
                            to='../disneyland/changepassword'
                            className='profile-footer-lists'
                            style={{
                              textDecoration: 'underline',
                              color: 'black',
                            }}
                          >
                            Change Password
                          </Link>

                          {verified == '0' ? (
                            <a
                              className='profile-footer-lists'
                              style={{
                                marginLeft: '1rem',
                                textDecoration: 'underline',
                                color: 'black',
                              }}
                              onClick={(e) => {
                                if (
                                  window.confirm(
                                    "We just sent an email to you, if you don't get it please check your spam folder and make sure info@mousewait.com and support@mousewait.com is in your contacts. Click on the activation link in that email and your account will be verified (also make sure your email is correct in the box to the left) . Refresh the Lounge and then you will be able to post and comment, have fun!"
                                  )
                                )
                                  verifyMail('t');
                              }}
                              href='javascript:void(0)'
                            >
                              Click To Verify Email
                            </a>
                          ) : (
                            <>Email Verifivation Done!</>
                          )}

                          <a
                            className='profile-footer-lists'
                            style={{
                              marginLeft: '3rem',
                              textDecoration: 'underline',
                              color: 'black',
                            }}
                            href=''
                            onClick={onLogOut}
                          >
                            Logout
                          </a>
                        </div>

                        <form
                          className='formContainer name-form'
                          style={container}
                        >
                          <div className='row mb-3'>
                            <label
                              htmlFor='name'
                              className='col-sm-2 col-form-label label'
                            ></label>

                            <div className='input-t col-sm-9'>
                              <div
                                className='image-container'
                                // style={imageContainer}
                              >
                                <img
                                  className='setting_image'
                                  style={{
                                    height: '140px',
                                    width: '160px',
                                    borderRadius: '50%',
                                    marginLeft: '15vw',
                                  }}
                                  src={
                                    GET_BASE_URL_IMAGE +
                                    '/disneyland/images/userimg/' +
                                    image +
                                    dTime
                                  }
                                  alt='big-top'
                                />

                                <TabList className='profile-btn1'>
                                  <Tab
                                    className='tablist-items button'
                                    style={profile}
                                  >
                                    {' '}
                                    <Link to='/disneyland/setting/dp'>
                                      {' '}
                                      Update profile pic
                                    </Link>{' '}
                                  </Tab>
                                </TabList>
                              </div>
                            </div>
                          </div>
                          <div className='row mb-3' style={{ display: 'flex' }}>
                            <label
                              htmlFor='name'
                              className='col-sm-3 col-form-label'
                            >
                              Name
                            </label>

                            <div className='input-t col-sm-9'>
                              <div className='inputField'>
                                <input
                                  readOnly={true}
                                  type='name'
                                  className='form-control'
                                  id='name'
                                  {...register('uname')}
                                />
                                <TabList className='profile-btn-setting'>
                                  <Tab className='tablist-items'>
                                    {' '}
                                    <Link
                                      to='/disneyland/setting/name'
                                      style={btn}
                                    >
                                      {' '}
                                      Update Name
                                    </Link>{' '}
                                  </Tab>
                                </TabList>
                              </div>

                              <p>
                                We do not recommend changing your username and
                                we don't provide support for any issues that
                                occur with name changes
                              </p>
                            </div>
                          </div>
                          <div className='row mb-3' style={{ display: 'flex' }}>
                            <label
                              htmlFor='email'
                              className='col-sm-3 col-form-label'
                            >
                              Email
                            </label>
                            <div className='input-t col-sm-9'>
                              <div className='inputField'>
                                <input
                                  readOnly={true}
                                  type='email'
                                  className='form-control'
                                  id='email'
                                  {...register('email')}
                                />
                                <TabList className='profile-btn-setting'>
                                  <Tab className='tablist-items'>
                                    {' '}
                                    <Link
                                      to='/disneyland/setting/email'
                                      style={btn}
                                    >
                                      {' '}
                                      Update Email
                                    </Link>{' '}
                                  </Tab>
                                </TabList>
                              </div>
                            </div>
                          </div>

                          <div className='row mb-3' style={{ display: 'flex' }}>
                            <label
                              htmlFor='tarea'
                              className='col-sm-3 col-form-label'
                            >
                              About yourself
                            </label>
                            <div className='input-t col-sm-9'>
                              <div className='inputField'>
                                {/* <textarea
                                  readOnly={true}
                                  className="form-control"
                                  id="tarea"
                                  rows={3}
                                  {...register("user_description")}
                                /> */}

                                <input
                                  readOnly={true}
                                  type='email'
                                  className='form-control'
                                  id='email'
                                  {...register('user_description')}
                                />
                                <TabList className='profile-btn-setting'>
                                  <Tab className='tablist-items'>
                                    {' '}
                                    <Link
                                      to='/disneyland/setting/about'
                                      style={btn}
                                    >
                                      {' '}
                                      About Yourself{' '}
                                    </Link>{' '}
                                  </Tab>
                                </TabList>
                              </div>
                            </div>
                          </div>

                          <div className='btn-pro'>
                            <div className='row mb-3'>
                              <label
                                htmlFor='sel-in'
                                className='col-sm-3 col-form-label'
                              />
                              <div className='input-t col-sm-9'>
                                {/* <button type='submit' className='btn pro-btn'>
                                  Submit
                                </button> */}
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
};

export default Setting;
