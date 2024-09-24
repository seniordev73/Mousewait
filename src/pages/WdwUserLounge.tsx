import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';
import { Placeholder } from '../components/Placeholder';
import { LikeButtonWdw } from '../components/LikeButtonWdw';
import { CommentButton } from '../components/CommentButton';
import {
  fetchWdwUserLounges,
  suscribeOrUnsuscribePost,
} from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { LoungeHeader } from '../components/LoungeHeader';
import { GET_BASE_URL_IMAGE, dTime } from '../constants/apiEndpoints';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';
import midBanner from '../assets/img/mid-banner-img.png';

import { useForm } from 'react-hook-form';
import ToggleMWmenu from '../components/WdwToggleMWmenu';
import DmMe from '../components/DmMe';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThankButton } from '../components/ThankButton';
import { ThankButtonWdw } from '../components/ThankButtonWdw';


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
  const [isLoading, setIsLoading] = useState<any | string>(false);
  const [suscribeUnsuscribe, SetSuscribeUnsuscribe] = useState<any | string>(
    null
  );
  let sortType: any = null;
  let UserId: any = userId;
  let currentPage: any = null;

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const loadDataOnlyOnce = () => {
    window.scrollTo(0, 0);

    dispatch(fetchWdwUserLounges({ sortType, UserId, currentPage })).then(
      (res: any) => {
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
        SetSuscribeUnsuscribe(
          res.payload[0]['otherdetail'][0].suscribe_or_unsuscribe
        );
      }
    );
  };

  useEffect(() => {
    loadDataOnlyOnce(); // this will fire only on first render
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

  //console.log(items[0]);
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

  return (
    <>
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
                  <Link to='/disneyworld/lounge/'>
                    <img
                      src={midBanner}
                      className='img-fluid'
                      alt='mid-banner-img'
                    />
                  </Link>
                </div>
                <ToastContainer autoClose={3000} />
                <div className='text-head text-center'>
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
                      {/*  <ul>
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
                      </ul> */}
                    </>
                  )}
                </div>

                {/*-=====mobile-view start ======-*/}
                <div className='top-text-m text-center p-2'>
                  <div className='top-mw text-center'>
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
                        : items[0]['posts']?.map((obj: any) => (
                            <div className='card-m rounded card-m2'>
                              <div className='card-s-img justify-content-between d-flex'>
                                <div className='small-box d-flex'>
                                  <div className='small-c'>
                                    <Link
                                      to={`/disneyworld/user/${items[0]['user']?.user_id}/mypost`}
                                    >
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
                                      <Link
                                        style={{ color: 'black' }}
                                        to={`/disneyworld/user/${items[0]['user']?.user_id}/mypost`}
                                      >
                                        {items[0]['user']?.user_name}
                                      </Link>
                                    </h6>
                                    <span>
                                      {items[0]['user']?.totalpoints} #
                                      {items[0]['user']?.position} Quality #5
                                    </span>

                                    <p>{converDate(obj.chat_time)}</p>
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
                                    to={`/disneyworld/lands-talk/${obj.mapping_url}`}
                                  >
                                    <img
                                      src={
                                        GET_BASE_URL_IMAGE +
                                        '/disneyworld/chat_images/' +
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
                                  to={`/disneyworld/lands-talk/${obj.mapping_url?.replace(
                                    /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                                    '-'
                                  )}`}
                                >
                                  <h6
                                    dangerouslySetInnerHTML={{
                                      __html: obj.chat_msg?.replace(
                                        'mousewait.com',
                                        'mousewait.xyz'
                                      ),
                                    }}
                                  />
                                </Link>

                                <div className='chat-icon d-flex'>

                                  <ThankButtonWdw
                                    likecount={obj.thankcount}
                                    chatId={obj.chat_id}
                                    getThankYou={
                                      obj.isthankyou?.status == '1'
                                        ? true
                                        : false
                                    }
                                  />

                                  {/* <LikeButtonWdw
                                    likecount={obj.likecount}
                                    chatId={obj.chat_id}
                                  /> */}

                                  <Link
                                    to={`/disneyworld/lands-talk/${
                                      obj.chat_id
                                    }/${obj.chat_msg?.replace(
                                      /([/~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                                      '-'
                                    )}`}
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
