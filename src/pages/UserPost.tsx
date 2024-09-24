import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';
import { Placeholder } from '../components/Placeholder';
import { Search } from '../components/Search';

import { fetchLounges } from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import midBanner from '../assets/img/mid-banner-img.png';
import { GET_BASE_URL_IMAGE, dTime } from '../constants/apiEndpoints';
import stickerImage from '../assets/img/stickers.jpg';
import faceBookImage from '../assets/img/face-s.jpg';
import pinImage from '../assets/img/face-s.jpg';
import { postLounge } from '../redux/lounges/slice';
import cardmImage from '../assets/img/card-m-img.png';
type FormData = {
  chat_msg: string;
};

type SearchData = {
  searchValue: string;
};

const UserPost = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const { search } = useParams();

  const { items, status } = useSelector(selectLounges);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm<SearchData>();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const { isLoggedIn } = useSelector(usersSelector);

  let sortType: any = null;
  let LoungeId: any = null;
  let currentPage: any = null;
  let searchValue: any = null;

  function converDate(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  }

  const onSearch = (data: any) => {
    searchValue = data.searchValue;
    // dispatch(fetchLounges({ sortType, LoungeId, currentPage, searchValue }))

    {
      searchValue == null
        ? navigate('/disneyland/lounge/')
        : navigate('/disneyland/search/post/' + searchValue);
    }
    reset();
  };

  function converTime(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
    return formattedDate;
  }

  return (
    <>
      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec'>
            <div className='banner-img'>
              <img src={midBanner} className='img-fluid' alt='mid-banner-img' />
            </div>
            <div className='text-head text-center'>
              <ul className='p-0 m-0'>
                <li>
                  <a href=''>Best of the Day</a>
                </li>
                <li>
                  <a href=''>Sticker Store</a>
                </li>
                <li>
                  <a href=''>Disneyland Talk</a>
                </li>
                <li>
                  <a href=''>Real-Time</a>
                </li>
                <li>
                  <a href=''>The Hub</a>
                </li>
              </ul>
            </div>

            {/*-=====mobile-view start ======-*/}
            <div className='top-text-m text-center p-2'>
              <div className='top-mw text-center'>
                <h6>Top MouseWaiters of the Day</h6>
                <div className='top-sp d-flex justify-content-center'>
                  <p>
                    <span>1. grumpypapa 56.38 #5 (DL)</span>
                    <span>2. grapesoda 52.67 #5 (DL)</span>
                  </p>
                </div>
              </div>
              <div className='text-head-m text-center'>
                <ul className='p-0 m-0'>
                  <li>
                    <a href=''>Best of the Day</a>
                  </li>
                  <li>
                    <a href=''>Food Blog</a>
                  </li>
                  <li>
                    <a href=''>Tips</a>
                  </li>
                  <li>
                    <a href=''>Sticker Store</a>
                  </li>
                </ul>
              </div>

              <Search />
            </div>
            {/*-=====mobile-view start ======-*/}
            <div className='mid-card-sec'>
              {status === 'error' ? (
                <div className='content__error-info'>
                  <h2>Error</h2>
                  <p>Please try to open the page later.</p>
                </div>
              ) : (
                <div className='content__items'>
                  {status === 'loading'
                    ? [...new Array(9)].map((_, index) => (
                        <Placeholder key={index} />
                      ))
                    : items.map((obj) => (
                        <div className='card-m rounded card-m2'>
                          <div className='card-s-img justify-content-between d-flex'>
                            <div className='small-box d-flex'>
                              <div className='small-c'>
                                <img
                                  src={
                                    GET_BASE_URL_IMAGE +
                                    '/disneyland/images/thumbs/' +
                                    obj.user.image +
                                    dTime
                                  }
                                  className='img-fluid'
                                  alt='{obj.user.user_name}'
                                />
                              </div>
                              <div className='small-tt'>
                                <h6>{obj.user.user_name}</h6>
                                <span>
                                  {obj.user.totalpoints} #{obj.user.position}{' '}
                                  Quality #5
                                </span>

                                <p>{converDate(obj.chat_time)}</p>
                              </div>
                            </div>
                            <div className='icon-img'>
                              <i className='fa-solid fa-ellipsis-vertical' />
                            </div>
                          </div>
                          <div className='card-img-b my-2'>
                            {obj.chat_img.includes('c_img') && (
                              <Link
                                to={`/disneyland/lands-talk/${obj.mapping_url}`}
                              >
                                <img
                                  src={
                                    GET_BASE_URL_IMAGE +
                                    '/disneyland/chat_images/' +
                                    obj.chat_img
                                  }
                                  className='card-img-top img-fluid'
                                  alt='img'
                                />
                              </Link>
                            )}
                          </div>
                          <div className='card-body'>
                            <h6>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: obj.chat_msg.replace(
                                    'mousewait.com',
                                    'mousewait.xyz'
                                  ),
                                }}
                              />
                            </h6>
                            <div className='chat-icon d-flex'>
                              <span>
                                <i className='fa-solid fa-thumbs-up'></i>{' '}
                                {obj.likecount}
                              </span>
                              <span>
                                <i className='fa-solid fa-comment-dots'></i>{' '}
                                {obj.commentcount}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPost;
