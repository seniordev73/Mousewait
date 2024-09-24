import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useParams } from 'react-router-dom';
import { LoungeHeader } from '../components/LoungeHeader';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';
import { fetchUserMessage, myConversion } from '../redux/lounges/slice';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';
import 'react-toastify/dist/ReactToastify.css';
const ChatPage = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  const [getData, SetGetData] = useState<any | []>([]);
  const loadDataOnlyOnce = () => {
    dispatch(fetchUserMessage({ userId })).then((res: any) => {
      SetGetData(res.payload);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadDataOnlyOnce(); // this will fire only on first render
  }, []);

  type FormData = {
    user_text_message: any;
    user_id: any;
  };

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [Notify, setIsNotify] = useState<any | string>();
  const onSubmit = (data: any) => {
    dispatch<any>(myConversion(data)).then((res: any) => {
      dispatch(fetchUserMessage({ userId })).then((res: any) => {
        SetGetData(res.payload);

        setValue('user_text_message', '');
      });
      // Notify(toast(res.payload.data));
    });
  };

  return (
    <div>
      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec mwstore-page-bg'>
            <LoungeHeader />
            <MobileLoungeHeader />
            {/*-=====mobile-view start ======-*/}
            <ToastContainer autoClose={3000} />
            <div className='mwstore-mid-bg'>
              <div className='newform'>
                <section>
                  <form onSubmit={handleSubmit(onSubmit)} method='POST'>
                    <textarea
                      style={{
                        border: '2px solid grey',
                        width: '60%',
                        borderRadius: '5px',
                      }}
                      placeholder='Enter your messaage here....'
                      required
                      {...register('user_text_message')}
                      rows={3}
                      cols={60}
                    />
                    <br />

                    <input
                      type='hidden'
                      defaultValue={userId}
                      {...register('user_id')}
                    />
                    <button
                      className='btn'
                      style={{ border: '2px solid grey' }}
                      type='submit'
                    >
                      submit
                    </button>
                  </form>
                </section>

                <section className='msgs mt-4'>
                  {getData?.map((obj: any) => (
                    <>
                      <div className='card-v rounded myconversion'>
                        <div className='d-flex flex-row'>
                          <div className='small-c'>
                            <a>
                              <img
                                src={
                                  GET_BASE_URL_IMAGE +
                                  '/disneyland/images/thumbs/' +
                                  obj.user.image
                                }
                                className='com-imggg'
                                style={{
                                  verticalAlign: 'middle',
                                  borderRadius: '50%',
                                  height: '50px',
                                  width: '50px',
                                }}
                              />
                            </a>
                          </div>

                          <div
                            className='comm-c d-flex'
                            style={{ marginTop: '0px' }}
                          >
                            <p
                              className='commentlist'
                              style={{ marginTop: '.5rem' }}
                            >
                              <span
                                style={{
                                  fontFamily: 'Inter',
                                  marginLeft: '1rem',

                                  fontWeight: 400,
                                  fontStyle: 'normal',
                                  color: 'rgb(49, 50, 55)',
                                }}
                              >
                                <span style={{ color: '#000' }}>
                                  {obj.text_message}
                                </span>
                                <span className='com-tt'>
                                  <span
                                    style={{
                                      marginLeft: '0.5rem',
                                      marginRight: '1rem',
                                      fontSize: 'smaller',
                                    }}
                                  >
                                    January 3, 2023 at 7:32 AM
                                  </span>
                                </span>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
