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
import { GET_BASE_URL_IMAGE, dTime } from '../constants/apiEndpoints';
import cardImage from '../assets/img/card-s-img.png';
import cardmImage from '../assets/img/card-m-img.png';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
// import TabButons from "./TabButons";
import { updateprofile, usersSlice, clearState } from '../redux/users/slice';
function Updatepic() {
  type FormData = {
    myfile: any;
  };

  const dispatch = useDispatch();

  const { getProfileItem, status } = useSelector(selectLounges);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  //getting users
  const userimage = localStorage.getItem('image');
  const [Notify, setIsNotify] = useState<any | string>();
  const inputFile = useRef<HTMLInputElement | any>();

  const [file, setFile] = useState<number | any>(); //for image
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>(
    GET_BASE_URL_IMAGE + '/disneyland/images/userimg/' + userimage + dTime
  ); // for image
  const [isLoading, setIsLoading] = useState<any | string>(false);
  let key: any = null;

  //handle Image change
  function handleImageChange(e: any) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    if (file.type.match('image.*')) {
      reader.onloadend = () => {
        let result = reader.result;
        //console.log(result);
        setFile(result);
        setImagePreviewUrl(result); // showing current image
        //setValue('myfile', result);
      };

      reader.readAsDataURL(file);
    }
  }

  const onSubmit = (file: any) => {
    setIsLoading(true);
    dispatch<any>(updateprofile(file)).then((res: any) => {
      setIsLoading(false);
      // Notify(toast(res.payload.data));
    });
  };

  useEffect(() => {
    dispatch<any>(fetchMyProfile({ key })).then((res: any) => {
      console.log(res);
    });
    setValue('myfile', file);
  }, []);

  useEffect(() => {
    setValue('myfile', file);
  }, [file]);

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
                          <Tab className='tablist-items'>
                            <Link to='/disneyland/setting/about'>
                              Update About
                            </Link>
                          </Tab>
                        </TabList>

                        <div className='row  profile-container mb-3'>
                          <label
                            htmlFor='file-f'
                            className='col-sm-4 col-form-label-heading'
                          ></label>
                          <div className='tab-img d-flex'>
                            <div
                              className='input-t col-sm-9'
                              // style={{ marginLeft: "1rem", marginTop: "1rem" }}
                              style={{ marginLeft: '20vw', marginTop: '1rem' }}
                            >
                              <div className='image_section'>
                                <img
                                  src={imagePreviewUrl}
                                  className='profile_img'
                                  alt='big-top'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <ToastContainer autoClose={3000} />
                        <form
                          className='name-form'
                          style={{ height: '50vh' }}
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <input
                            id='fileinput'
                            ref={inputFile}
                            className='fileInput'
                            type='file'
                            name='myfile'
                            onChange={(e) => handleImageChange(e)}
                          />

                          <div className='btn-pro'>
                            <div className='row mb-3'>
                              <label
                                htmlFor='sel-in'
                                className='col-sm-3 col-form-label'
                              />
                              <div className='input-t col-sm-9'>
                                {isLoading == true ? (
                                  <CircularProgress />
                                ) : (
                                  <button
                                    type='button'
                                    onClick={handleSubmit(onSubmit)}
                                    className='btn pro-btn'
                                  >
                                    Submit
                                  </button>
                                )}
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

export default Updatepic;
