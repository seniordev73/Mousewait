import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';
import { Placeholder } from '../components/Placeholder';
import { CommentBox } from '../components/CommentBox';
import { fetchLoungeDetails, postLoungeCommentEditWdw } from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { GET_BASE_URL_IMAGE, dTime } from '../constants/apiEndpoints';
import { useForm } from 'react-hook-form';
import midBanner from '../assets/img/mid-banner-img.png';
import { ToggleMenu } from '../components/ToggleMenuDisneyWorld';
import { CommonPostMessage } from '../components/CommonPostMessage';
import stickerImage from '../assets/img/stickers.jpg';
import faceBookImage from '../assets/img/face-s.jpg';
import pinImage from '../assets/img/face-s.jpg';
import { WdwLoungeName } from '../components/WdwLoungeName';
import {
  postThankyou,
  postBookMark,
  postLoungeCommentWdw,
  postLoungeFlag,
  fetchStickerLounges,
  addSticker,
  removeUserLounge,
  fetchwdwLoungeDetails,
} from '../redux/lounges/slice';
import cardmImage from '../assets/img/card-m-img.png';

import { CommentList } from '../components/WdwCommentList';
import { Helmet } from 'react-helmet';

type FormData = {
  chat_msg: string;
  chat_id: number;
  // chat_type: any;
  chat_reply_msg_advance: any;
};

const WDWLandLoungeDetail = (props: any) => {
  const dispatch = useAppDispatch();
  const { LoungeId, url } = useParams();
  const { itemDetail, status, stickerItems } = useSelector(selectLounges);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user_id');
  const [commentData, SetCommentData] = useState<any | []>([]);
  const [thankData, SetThankData] = useState<any | []>([]);
  const [showIcon, SetShowIcon] = useState<any | string>(true);
  const [chatMessage, setChatMessage] = useState();
  const [bookMark, SetBookMark] = useState<any | string>(false);
  const [thankYou, SetThankYou] = useState<any | string>(false);

  const [flagType, setFlagType] = useState<any | string>('C');
  const [flagAction, setFlagAction] = useState<any | string>('move-silent');

  const user_id = localStorage.removeItem('userid');

  const onClickIcon = () => {
    SetShowIcon(!showIcon);
  };
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchwdwLoungeDetails({ LoungeId })).then((res: any) => {
      SetCommentData(res.payload[0].comments);
      SetThankData(res.payload[0].thanks);
      //console.log(res.payload[0].isbookmark?.status)
      res.payload[0].isbookmark?.status == 1 && SetBookMark(true);
      res.payload[0].isthankyou?.status == 1 && SetThankYou(true);
    });
  }, [LoungeId]);

  useEffect(() => {
    let emojiData: any = null;
    dispatch(fetchStickerLounges({ emojiData }));
  }, [user_id]);

  function converDate(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  }
  
  function getWords(str: any) {
    const result = str?.split("\.").slice(0, 1).join(' ');
    return result;
  }

  const onSubmit = (data: any) => {

    // data.chat_type = getValues('chat_type');
    if(getValues('chat_reply_msg_advance') != '') {
      data.chat_img = false;
      data.chat_reply_msg = getValues('chat_reply_msg_advance');
    }
    else data.chat_img = true;

    if (data.chat_reply_msg != undefined) {
      if(data.chat_reply_msg == '') return;
      dispatch<any>(postLoungeCommentEditWdw(data)).then((res: any) => {
        reset();
        window.location.reload();
      });
    } else {
      dispatch<any>(postLoungeFlag(data)).then((res: any) => {
      });
    }
  };

  const onSubmit1 = (data: any) => {
    if (token != null) {
      const chat_msg = getValues('chat_msg');
      chat_msg != ''
        ? dispatch<any>(postLoungeCommentWdw(data)).then((res: any) => {
            reset();
            //console.log(res.payload.data.commentdata);
            let data: any = null;
            let up = document.getElementsByClassName('ql-editor');
            up[0].innerHTML = '';

            SetCommentData((commentData: any) => [
              ...commentData,
              res.payload.data.commentdata[0],
            ]);


            // dispatch<any>(addSticker(data));
            // SetCommentData(res.payload.data.commentdata);

            /*      SetCommentData((commentData: any) => [
              ...commentData,
              // res.payload.data.commentdata[0],
            ]); */
          })
        : alert('Please enter comment');
    } else {
      navigate('/disneyland/login');
    }
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
              <Link to={`/disneyworld/lounge`}>
                <img
                  src={midBanner}
                  className='img-fluid'
                  alt='mid-banner-img'
                />
              </Link>
            </div>
            <div className='land-detail'>
              {status === 'error' ? (
                <div className='content__error-info'>
                  <h2>Error</h2>
                  <p>Please try to open the page later.</p>
                </div>
              ) : (
                <div className='mid-card-sec mobile-card-sec'>
                  {status === 'loading'
                    ? [...new Array(9)].map((_, index) => (
                        <Placeholder key={index} />
                      ))
                    : itemDetail?.map((obj) => (
                        <div
                          className='card-m rounded card-m2'
                          key={obj.chat_id}
                        >
                          <div className='card-s-img justify-content-between d-flex'>
                            <div className='small-box d-flex'>
                              <div className='small-c'>
                                <a>
                                  <img
                                    src={
                                      GET_BASE_URL_IMAGE +
                                      '/disneyland/images/thumbs/' +
                                      obj.user.image +
                                      dTime
                                    }
                                    className='img-fluid'
                                    alt={obj.user.user_name}
                                  />
                                </a>
                              </div>
                              <div className='small-tt'>
                                <h6>
                                  {' '}
                                  <Link
                                    to={`/disneyworld/user/${obj.user?.user_id}/mypost`}
                                  >
                                    {obj.user?.user_name}
                                  </Link>
                                </h6>
                                <span>
                                  {obj.user.position} #{obj.user.totalpoints}{' '}
                                  Quality #{obj.user.rank}
                                </span>
                                <WdwLoungeName
                                  Time={obj.chat_time}
                                  Roomid={obj?.chat_room_id}
                                />
                              </div>
                            </div>

                            <>
                              <Helmet>
                                <title property='og:title'>
                                {getWords(obj.chat_msg)} - Disneyworld Lounge
                                </title>
                                <meta
                                  property='og:description'
                                  content={obj.chat_msg}
                                  name='description'
                                />
                                <meta
                                  name='keywords'
                                  content={getWords(obj.chat_msg)}
                                />
                                <meta
                                  property='fb:app_id'
                                  content='152066798153435'
                                />
                                <meta property='og:type' content='website' />
                                <meta
                                  property='og:site_name'
                                  content='MouseWait'
                                />
                                <meta
                                  property='og:image'
                                  content={
                                    GET_BASE_URL_IMAGE +
                                    '/disneyland/chat_images/' +
                                    obj.chat_img
                                  }
                                />
                                <meta
                                  property='og:url'
                                  content={
                                    GET_BASE_URL_IMAGE +
                                    `/disneyland/lands-talk/${obj.chat_id}/${obj.chat_msg}`
                                  }
                                />
                              </Helmet>
                            </>

                            <div>
                              <ToggleMenu
                                onSubmit={onSubmit}
                                register={register}
                                handleSubmit={handleSubmit}
                                setValue={setValue}
                                isLoading={''}
                                LoungeId={obj.chat_id}
                                username={obj.user.user_name}
                                userid={obj.user.user_id}
                                getThankYou={
                                  obj.isthankyou?.status == '1' ? true : false
                                }
                                getBookMark={
                                  obj.isbookmark?.status == '1' ? true : false
                                }
                                editType={
                                  obj.user?.user_id == user ? true : false
                                }
                                chat_reply_msg={obj.chat_msg}
                                // chat_type={obj.chat_type}
                                pageName={'Detail'}
                                lock={obj.islock == '0' ? 'Lock' : 'UnLock'}
                                chatRoomId={obj.chat_room_id}
                                getStick={
                                  obj.checksticky == null ? 'Stick' : 'UnStick'
                                }
                                getSubscribe={
                                  obj.subscribepost?.user_id == user &&
                                  obj.subscribepost != null
                                    ? false
                                    : true
                                }
                              />
                            </div>
                          </div>
                          <div className='card-img-b my-2'>
                            {obj.chat_img.includes('c_img') && (
                              <img
                                src={
                                  GET_BASE_URL_IMAGE +
                                  '/disneyworld/chat_images/' +
                                  obj.chat_img
                                }
                                className='card-img-top img-fluid'
                                alt='img'
                              />
                            )}
                          </div>

                          <div className='card-body '>
                            <CommonPostMessage myChat={obj.chat_msg}/>

                            {commentData.map((cmt: any, index: any) => (
                              <>
                                <CommentList
                                  cmt={cmt}
                                  /*      chatId={obj.chat_id} */ /* isko uncommnet karna h  */
                                  chatId={''}
                                  replyShow={false}
                                  stickerData={stickerItems}
                                />
                              </>
                            ))}
                          </div>

                          <div className='card-body'>
                            <div className='thank-sec'>
                              <div className='thank-t d-flex'>
                                <h6>
                                  {thankData.length > 0 ? (
                                    <> Thanked by:</>
                                  ) : (
                                    <></>
                                  )}

                                  {thankData?.map((data: any, index: any) => (
                                    <span key={index}>
                                      <Link
                                        to={`/disneyworld/user/${data.user_id}/mypost`}
                                      >
                                        {data.user.user_name}
                                      </Link>
                                    </span>
                                  ))}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
        
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='search-comm-sec des-main-sec fixed-bottom-bar' >
          <div></div>
          <div >
            <div className='commentOutside'>
              <CommentBox
                chatId={LoungeId}
                onSubmit={onSubmit1}
                register={register}
                handleSubmit={handleSubmit}
                stickerData={stickerItems}
                setValue={setValue}
              />
            </div>
          </div>
          <div></div>
        </div> 
      </div>
    </>
  );
};

export default WDWLandLoungeDetail;
