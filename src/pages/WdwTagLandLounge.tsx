import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';
import { Placeholder } from '../components/Placeholder';
import { LoungeHeader } from '../components/LoungeHeader';
import { LikeButton } from '../components/LikeButton';
import { TopImges } from '../components/TopImges';
import { TopTags } from '../components/TopTags';
import { CommentButton } from '../components/CommentButton';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';
import { GET_BASE_URL_IMAGE, dTime } from '../constants/apiEndpoints';
import { fetchTagLounges } from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';

import { Helmet } from 'react-helmet';

import stickerImage from '../assets/img/stickers.jpg';
import faceBookImage from '../assets/img/face-s.jpg';
import pinImage from '../assets/img/face-s.jpg';
import { postLounge } from '../redux/lounges/slice';
import cardmImage from '../assets/img/card-m-img.png';

// @ts-ignore
import MetaTags from 'react-meta-tags';

type FormData = {
  chat_msg: string;
};

type SearchData = {
  searchValue: string;
};


const TagLandLounge = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const { tag } = useParams();

  const { tagItems, status, sortByTime } = useSelector(selectLounges);
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

  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );
  let sortType: any = null;
  let LoungeId: any = null;
  let currentPage: any = null;
  let tagValue: any = null;

  let myurl = window.location.href
  .substring(window.location.href.lastIndexOf('tag/') + 4)
  .replace(/([/~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g, ' ');
  

  useEffect(() => {
    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (tag) {
      tagValue = tag;
    }

    dispatch(
      fetchTagLounges({
        sortType,
        LoungeId,
        currentPage,
        tagValue,
        shortByTime,
      })
    );
  }, [shortByTime, tag]);

  function converDate(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  }

  function converTime(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
    return formattedDate;
  }

  function getWords(str: any) {
    const result = str.split("\.").slice(0, 1).join(' ').replaceAll("-", " ");
    return result;
  }

  return (
    <>

      <MetaTags>
        <meta
          name='description'
          content=""
        />
        <meta property='og:title' content='Mousewait' />
        <meta
          property='og:image'
          content='https://mousewait.com/static/media/MouseWait-img.fed12113160621608cfe.png'
        />
        <meta
          property='og:description'
          content='MouseWait provides a wealth of information for both casual and frequent visitors to the Disneyland Resort. It does exactly what it claims and more, and it does it extremely well. '
        />
      </MetaTags>

      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec'>
            <LoungeHeader />
            <MobileLoungeHeader />
            <div className='mid-card-sec'>
              {status === 'error' ? (
                <div className='content__error-info'>
                  <h2>Error</h2>
                  <p>Please try to open the page later.</p>
                </div>
              ) : (
                <div className='content__items'>
                  {status === 'loading'
                    ? [...new Array(9)]?.map((_, index) => (
                        <Placeholder key={index} />
                      ))
                    : tagItems?.map((obj) => (
                        <div className='card-m rounded card-m2'>
                          <div className='card-s-img justify-content-between d-flex'>
                            <div className='small-box d-flex'>
                              <div className='small-c'>
                                <Link
                                  to={`/disneyland/user/${obj.user?.user_id}/mypost`}
                                >
                                  <img
                                    src={
                                      GET_BASE_URL_IMAGE +
                                      '/disneyland/images/thumbs/' +
                                      obj.user?.image +
                                      dTime
                                    }
                                    className='img-fluid'
                                    alt='{obj.user?.user_name}'
                                  />
                                </Link>
                              </div>
                              <div className='small-tt'>
                                <h6>
                                  {' '}
                                  <Link
                                    style={{ color: 'black' }}
                                    to={`/disneyland/user/${obj.user?.user_id}/mypost`}
                                  >
                                    {obj.user?.user_name}
                                  </Link>
                                </h6>
                                <span>
                                  {obj.user?.totalpoints} #{obj.user?.position}{' '}
                                  Quality #5
                                </span>

                                <p>{converDate(obj.chat_time)}</p>
                              </div>
                            </div>
                            <div className='icon-img'>
                              <i className='fa-solid fa-ellipsis-vertical' />
                            </div>
                          </div>
                          <TopImges
                            topImageData={obj.topimages}
                            chatId={obj.chat_id}
                          />

                          <div className='card-img-b my-2'>
                            {obj.chat_img?.includes('c_img') && (
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
                          {obj.tagcomposit.length > 0 && (
                            <>
                              <TopTags
                                gettagged={obj.tagcomposit}
                                chatId={obj.tagcomposit.chat_id}
                              />
                            </>
                          )}
                          <div className='card-body'>
                            <Link
                              to={`/disneyland/lands-talk/${obj.mapping_url}`}
                            >
                              <div className='tag-msg'>
                                <h6
                                  dangerouslySetInnerHTML={{
                                    __html: obj.chat_msg?.replace(
                                      'mousewait.com',
                                      'mousewait.xyz'
                                    ),
                                  }}
                                />
                              </div>
                            </Link>

                            <Helmet>
                              <title property='og:title'>
                                {getWords(myurl)}
                              </title>
                            </Helmet>

                            <div className='chat-icon d-flex'>
                              <LikeButton
                                likecount={obj.likecount}
                                chatId={obj.chat_id}
                              />
                              <Link
                                to={`/disneyland/lands-talk/${obj.mapping_url}`}
                              >
                                <CommentButton
                                  commentcount={obj.commentcount}
                                  chatId={obj.chat_id}
                                />
                              </Link>{' '}
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

export default TagLandLounge;
