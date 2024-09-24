import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';
import { Placeholder } from '../components/Placeholder';
import { LikeButton } from '../components/LikeButton';
import { CommentButton } from '../components/CommentButton';
import { CommonPostMessage } from '../components/CommonPostMessage';
import {
  fetchUserLounges,
  suscribeOrUnsuscribePost,
} from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { LoungeHeader } from '../components/LoungeHeader';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';
import midBanner from '../assets/img/mid-banner-img.png';
import { ToggleMenu } from '../components/ToggleMenu';
import { useForm } from 'react-hook-form';
import ToggleMWmenu from '../components/ToggleMWmenu';
import DmMe from '../components/DmMe';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GET_BASE_URL_IMAGE, dTime } from '../constants/apiEndpoints';
import { LoungeName } from '../components/LoungeName';
import { ThankButton } from '../components/ThankButton';

// @ts-ignore
import MetaTags from 'react-meta-tags';

const UserLounge = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const { userId } = useParams();

  const { items, status } = useSelector(selectLounges);
  const token = localStorage.getItem('token');
  const loggeduser = localStorage.getItem('user_id');

  const { isLoggedIn } = useSelector(usersSelector);
  const [memberSince, SetMemeberSince] = useState<any | string>(null);
  const [creditPurchased, SetCreditPurchased] = useState<any | string>(null);
  const [noNews, SetNoNews] = useState<any | string>(null);
  const [tivaOneScore, SetTrivaOneScore] = useState<any | string>(null);
  const [tivaTwoScore, SetTrivaTwoScore] = useState<any | string>(null);
  const [totalwaitTimePt, SetTotalwaitTimePt] = useState<any | string>(null);
  const [totalqualityPt, SetTotalqualityPt] = useState<any | string>(null);
  const [thanked, SetThanked] = useState<any | string>(null);
  const [thankedTpPoint, SetThankedTpPoint] = useState<any | string>(null);
  const [btPostday, SetBtPostday] = useState<any | string>(null);
  const [totalLoungePt, SetTotalLoungePt] = useState<any | string>(null);
  const [mousewRank, SetMousewRank] = useState<any | string>(null);
  const [totMousewRank, SetTotMousewRank] = useState<any | string>(null);
  const [overRank, SetOverRank] = useState<any | string>(null);
  const [userName, SetUserName] = useState<any | string>(null);
  const [userImage, SetUserImage] = useState<any | string>(null);
  const [userDesc, SetUserDesc] = useState<any | string>(null);
  const [userLogoDetails, SetUserLogoDetails] = useState<any | string>([]);
  const [isLoading, setIsLoading] = useState<any | string>(false);
  const [myData, SetMyData] = useState<any | string>([]);
  const [suscribeUnsuscribe, SetSuscribeUnsuscribe] = useState<any | string>(
    null
  );
  let sortType: any = null;
  let UserId: any = userId;
  //let currentPage: any = null;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  //console.log(items[0]?.['posts'].data);

  const loadDataOnlyOnce = () => {
    if (currentPage == 1) {
      window.scrollTo(0, 0);
    }

    dispatch(fetchUserLounges({ sortType, UserId, currentPage })).then(
      (res: any) => {
        console.log(res);
        SetMyData((prev: any) => [...prev, ...res.payload[0]['posts']]);
        SetMemeberSince(converDate(res.payload[0]['user'].member_since));
        SetCreditPurchased(res.payload[0]['otherdetail'][0].credit_purchase);
        SetNoNews(res.payload[0]['otherdetail'][0].no_of_posts_news);
        SetTrivaOneScore(res.payload[0]['otherdetail'][0].triviaScore_one);
        SetTrivaTwoScore(res.payload[0]['otherdetail'][0].triviaScore_two);
        SetTotalwaitTimePt(res.payload[0]['otherdetail'][0].waittimeScore);
        SetTotalqualityPt(
          res.payload[0]['otherdetail'][0].total_quality_points
        );
        SetThanked(res.payload[0]['otherdetail'][0].thank_score);
        SetThankedTpPoint(res.payload[0]['otherdetail'][0].thank_tp_counts);

        SetBtPostday(
          res.payload[0]['otherdetail'][0].userno_of_bestoftheday_posts
        );
        SetTotalLoungePt(res.payload[0]['otherdetail'][0].loungeScore);
        SetMousewRank(res.payload[0]['otherdetail'][0].last30daymousewait);
        SetTotMousewRank(res.payload[0]['user'].rank);
        SetOverRank(res.payload[0]['user'].totalpoints);
        SetUserName(res.payload[0]['user'].user_name);
        SetUserImage(res.payload[0]['user'].image);
        SetUserDesc(res.payload[0]['user'].user_description);
        SetUserLogoDetails(res.payload[0]['user'].getuserlogodetails);
        SetSuscribeUnsuscribe(
          res.payload[0]['otherdetail'][0].suscribe_or_unsuscribe
        );
      }
    );
  };

  //console.log(myData);

  useEffect(() => {
    loadDataOnlyOnce(); // this will fire only on first render
  }, [currentPage]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handelInfiniteScroll);
    return () => window.removeEventListener('scroll', handelInfiniteScroll);
  }, []);

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

  const onSubmit = () => {
    //  alert('submitting');
  };

  //console.log(audienceSample);
  // console.log(loggeduser);

  //Dm Box

  const [openDmBox, setDmBox] = useState<string | any>(false);
  const openDm = () => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      setDmBox(true);
    }
  };
  const closeDmBox = () => {
    setDmBox(false);
  };

  const [Notify, setIsNotify] = useState<any | string>();
  //suscribeOrUnsuscribe
  const suscribeOrUnsuscribe = (friendId: any, friendName: any) => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      if (suscribeUnsuscribe == '0') {
        window.confirm(
          'You will now get updates from this user via email each time they post. You can easily unsubscribe on this page or by using the link inside the emails.'
        );
      } else {
        window.confirm('Are You Sure?');
      }
      dispatch<any>(
        suscribeOrUnsuscribePost({ friendId, friendName, suscribeUnsuscribe })
      ).then((res: any) => {
        loadDataOnlyOnce();
        window.confirm(res.payload.data);
      });
    }
  };
  //console.log(items);

  return (
    <>

      <MetaTags>
        <title>MyMW</title>
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

      {userId == 'null' ? (
        <div className='mid-main'>
          <div className='container'>
            <div className='mid-sec'>
              <LoungeHeader />
              <MobileLoungeHeader />
              <div className='des-bg'>
                <div className='mid-card-sec'>
                  <div className='card-mn rounded'>
                    <div className='card-body'>
                      Please Login To View Mw Posts.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='mid-main'>
            <div className='container'>
              <div className='mid-sec'>
                <div className='banner-img'>
                  <img src={midBanner} className='img-fluid' alt='mid-banner-img' />
                  <Link to='/disneyland/lounge/' className="banner-logo"></Link>
                </div>
                <ToastContainer autoClose={3000} />
                <div className='text-head text-center'>
                  <div className='basic-info'>
                    <img
                      src={
                        GET_BASE_URL_IMAGE +
                        '/disneyland/images/thumbs/' +
                        userImage +
                        dTime
                      }
                      className='img-fluid my-profile-image'
                      alt=''
                    />
                    <div className="d-flex justify-content-center">
                      {
                        userLogoDetails.map((logoDetailObj: any) =>(
                            <div>
                              {logoDetailObj?.speciallogo.image != null ? (
                                  <img
                                      src={
                                          GET_BASE_URL_IMAGE +
                                          '/images/user_special_logos/' +
                                          logoDetailObj?.speciallogo.image
                                      }
                                      className='card-img-top'
                                      alt='img'
                                      style={{ height: '10px', width: 'auto', marginLeft: '2px' }}
                                  />
                              ) : (
                                  <></>
                              )}
                            </div>
                        ))
                      }
                    </div>
                    <h6 className='mb-2'>{userDesc}</h6>
                  </div>

                  <ul className='list-group list-group-flush'>
                    <li className=''> Member Since: {memberSince}</li>
                    <li className=''> Credits Purchased: {creditPurchased}</li>
                    <li className=''> Featured in News: {noNews}</li>
                    <li className=''>
                      {' '}
                      Trivia Challenge One Score: {tivaOneScore}
                    </li>
                    <li className=''>
                      {' '}
                      Trivia Challenge Two Score: {tivaTwoScore}
                    </li>
                    <li className=''>
                      {' '}
                      Total Wait Time Points: {totalwaitTimePt}
                    </li>
                    <li className=''>
                      {' '}
                      Total Quality Points: {totalqualityPt}
                    </li>
                    <li className=''>
                      {' '}
                      Thanked: {thanked} times on {thankedTpPoint} different
                      posts
                    </li>
                    <li className=''>
                      {' '}
                      Best Post of the Day: {btPostday} times on different posts
                    </li>
                    <li className=''> Total Lounge Points: {totalLoungePt}</li>
                    <li className=''> 30 Day MouseRank: {mousewRank}</li>
                    <li className=''> Total MouseRank: {totMousewRank}</li>
                    <li className=''> Overall Rank: {overRank}</li>
                  </ul>

                  {loggeduser === userId ? (
                    <></>
                  ) : (
                    <>
                      <ul>
                        <li>
                          <button
                            onClick={() => openDm()}
                            className='btn'
                            type='submit'
                            style={{
                              borderRadius: '8px',
                              backgroundColor: '#a0b7e9',
                              color: '#fff',
                            }}
                          >
                            DM To {userName}
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={(e) => {
                              suscribeOrUnsuscribe(userId, userName);
                            }}
                            className='btn'
                            type='submit'
                            style={{
                              borderRadius: '8px',
                              backgroundColor: '#a0b7e9',
                              color: '#fff',
                            }}
                          >
                            {suscribeUnsuscribe == '0'
                              ? 'Get Updates Via Email'
                              : 'Unsubscribe Via Email'}
                          </button>
                        </li>
                      </ul>
                    </>
                  )}
                </div>

                {/*-=====mobile-view start ======-*/}
                <div className='top-text-m text-center p-2'>
                  <div className='top-mw text-center'>
                    <div className='basic-info'>
                      <img
                        src={
                          GET_BASE_URL_IMAGE +
                          '/disneyland/images/thumbs/' +
                          userImage +
                          dTime
                        }
                        className='img-fluid my-profile-image'
                        alt=''
                      />
                      <div className="d-flex justify-content-center">
                        {
                          userLogoDetails.map((logoDetailObj: any) =>(
                              <div>
                                {logoDetailObj?.speciallogo.image != null ? (
                                    <img
                                        src={
                                            GET_BASE_URL_IMAGE +
                                            '/images/user_special_logos/' +
                                            logoDetailObj?.speciallogo.image
                                        }
                                        className='card-img-top'
                                        alt='img'
                                        style={{ height: '10px', width: 'auto', marginLeft: '2px' }}
                                    />
                                ) : (
                                    <></>
                                )}
                              </div>
                          ))
                        }
                      </div>
                      <h6 className='mb-2'>{userDesc}</h6>
                    </div>
                    <ul className='list-group list-group-flush'>
                      <li className=''> Member Since: {memberSince}</li>
                      <li className=''>
                        {' '}
                        Credits Purchased: {creditPurchased}
                      </li>
                      <li className=''> Featured in News: {noNews}</li>
                      <li className=''>
                        {' '}
                        Trivia Challenge One Score: {tivaOneScore}
                      </li>
                      <li className=''>
                        {' '}
                        Trivia Challenge Two Score: {tivaTwoScore}
                      </li>
                      <li className=''>
                        {' '}
                        Total Wait Time Points: {totalwaitTimePt}
                      </li>
                      <li className=''>
                        {' '}
                        Total Quality Points: {totalqualityPt}
                      </li>
                      <li className=''>
                        {' '}
                        Thanked: {thanked} times on {thankedTpPoint} different
                        posts
                      </li>
                      <li className=''>
                        {' '}
                        Best Post of the Day: {btPostday} times on different
                        posts
                      </li>
                      <li className=''>
                        {' '}
                        Total Lounge Points: {totalLoungePt}
                      </li>
                      <li className=''> 30 Day MouseRank: {mousewRank}</li>
                      <li className=''> Total MouseRank: {totMousewRank}</li>
                      <li className=''> Overall Rank: {overRank}</li>
                    </ul>
                  </div>
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
                        ? [...new Array(9)]?.map((_, index) => (
                            <Placeholder key={index} />
                          ))
                        : myData.map((obj: any) => (
                            <div className='card-m rounded card-m2'>
                              <div className='card-s-img justify-content-between d-flex'>
                                <div className='small-box d-flex'>
                                  <div className='small-c'>
                                    <Link to={'#'}>
                                      <img
                                        src={
                                          GET_BASE_URL_IMAGE +
                                          '/disneyland/images/thumbs/' +
                                          items[0]['user']?.image +
                                          dTime
                                        }
                                        className='img-fluid'
                                        alt="{items[0]['user'].user_name}"
                                      />
                                    </Link>
                                  </div>
                                  <div className='small-tt'>
                                    <h6>
                                      <Link style={{ color: 'black' }} to={'#'}>
                                        {items[0]['user']?.user_name}
                                      </Link>
                                    </h6>
                                    <span>
                                      {items[0]['user']?.totalpoints} #
                                      {items[0]['user']?.position} Quality #5
                                    </span>

                                    <LoungeName
                                      Time={obj.chat_time}
                                      Roomid={obj?.chat_room_id}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <ToggleMWmenu
                                    onSubmit={onSubmit}
                                    register={register}
                                    handleSubmit={handleSubmit}
                                    setValue={setValue}
                                    isLoading={isLoading}
                                    LoungeId={obj.chat_id}
                                    userName={items[0]['user']?.user_name}
                                    userId={items[0]['user']?.user_id}
                                    getThankYou={
                                      obj.isthankyou?.status == '1'
                                        ? true
                                        : false
                                    }
                                    getBookMark={
                                      obj.isbookmark?.status == '1'
                                        ? true
                                        : false
                                    }
                                    editType={
                                      loggeduser == userId ? true : false
                                    }
                                    chat_reply_msg={obj.chat_msg}
                                    chatRoomId={obj.chat_room_id}
                                    pageName={'MyMw'}
                                    lock={obj.islock == '0' ? 'Lock' : 'UnLock'}
                                    getStick={
                                      obj.checksticky == null
                                        ? 'Stick'
                                        : 'UnStick'
                                    }
                                  />
                                </div>
                              </div>
                              <div className='card-img-b my-2'>
                                {obj.chat_img.includes('c_img') && (
                                  <Link
                                    to={
                                      obj.mapping_url
                                        ? '/disneyland/lands-talk/' +
                                          obj.mapping_url.replace(
                                            /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                                            '-'
                                          )
                                        : '/disneyland/lands-talk/' +
                                          obj.chat_id +
                                          '/Mousewait'
                                    }
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
                                <Link
                                  to={
                                    obj.mapping_url
                                      ? '/disneyland/lands-talk/' +
                                        obj.mapping_url.replace(
                                          /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                                          '-'
                                        )
                                      : '/disneyland/lands-talk/' +
                                        obj.chat_id +
                                        '/Mousewait'
                                  }
                                >
                                  <CommonPostMessage myChat={obj.chat_msg}/>
                                </Link>

                                <div className='chat-icon d-flex'>
                                  <ThankButton
                                    likecount={obj.thankcount}
                                    chatId={obj.chat_id}
                                    getThankYou={
                                      obj.isthankyou?.status == '1'
                                        ? true
                                        : false
                                    }
                                  />
                                  {/*    <LikeButton
                                    likecount={obj.likecount}
                                    chatId={obj.chat_id}
                                  /> */}
                                  <Link
                                    to={
                                      obj.mapping_url
                                        ? '/disneyland/lands-talk/' +
                                          obj.mapping_url.replace(
                                            /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                                            '-'
                                          )
                                        : '/disneyland/lands-talk/' +
                                          obj.chat_id +
                                          '/Mousewait'
                                    }
                                  >
                                    <CommentButton
                                      commentcount={obj.commentcount}
                                      chatId={obj.chat_id}
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* for dm message  */}
            <DmMe
              isOpen={openDmBox}
              isClosed={closeDmBox}
              LoungeId={''}
              register={''}
              handleSubmit={''}
              onSubmit={''}
              setValue={''}
              isSubmitted={true}
              user_id={userId}
              userName={userName}
              chatId={''}
              type={''}
            />

            {/* dm message modal ends here  */}
          </div>
        </>
      )}
    </>
  );
};

export default UserLounge;
