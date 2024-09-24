import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { Placeholder } from '../components/Placeholder';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { CommentReply } from '../components/CommentReply';
import { LoungeHeader } from '../components/LoungeHeader';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';
import { ToastContainer, toast } from 'react-toastify';
import { LikeCommentReply } from '../components/LikeCommentReply';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import { GET_BASE_URL_IMAGE, dTime } from '../constants/apiEndpoints';
import DmMe from '../components/DmMe';

// @ts-ignore
import MetaTags from 'react-meta-tags';

import {
  fetchMyNotification,
  postThankyou,
  postBookMark,
  postLoungeComment,
  postLoungeFlag,
  fetchStickerLounges,
  addSticker,
  removeUserLounge,
  deleteConversionMessage,
} from '../redux/lounges/slice';

const Notification = () => {
  const dispatch = useAppDispatch();
  const { myNotificationItem, status, stickerItems } =
    useSelector(selectLounges);
  //console.log('uyoga');

  const token = localStorage.getItem('token');
  const loginuser = localStorage.getItem('user_id');
  const { isLoggedIn } = useSelector(usersSelector);
  const [LoungeId, setLoungeId] = useState<number | any>('');
  const [Type, setFlagType] = useState<string>('R');

  type FormData = {
    ReasonForReport: string;
    LoungeId: number;
    Type: string;
  };

  useEffect(() => {
    setValue('Type', Type);
    setValue('LoungeId', LoungeId);
  }, [Type, LoungeId]);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  let sortType: any = null;
  let categoryId: any = null;
  let currentPage: any = null;
  let searchValue: any = null;

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchMyNotification({ sortType, currentPage }));
  }, []);

  //console.log(myNotificationItem);

  function converDate(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    return formattedDate;
  }

  /* show reply box to  child componant(commentReply) as props on click */
  const [showReply, SetShowReply] = useState<any | string>(false);
  const showReplyIcon = (id: any) => {
    SetShowReply(!showReply);
  };

  /* to pass sticker items to  child componant(commentReply) as props on click */
  const user_id = localStorage.removeItem('userid');
  useEffect(() => {
    let emojiData: any = null;
    dispatch(fetchStickerLounges({ emojiData }));
  }, [user_id]);

  const [RemoveType, setRemoveType] = useState<any | string>('C');
  const [Notify, setIsNotify] = useState<any | string>();

  const onRemove = (ban_chat_id: any) => {
    dispatch<any>(removeUserLounge({ ban_chat_id, RemoveType })).then(
      (res: any) => {
        window.location.reload();
        // Notify(toast('Comment Removed'));
      }
    );
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle: any;
  function openModal(id: any) {
    setIsOpen(true);
    setLoungeId(id);
    // alert(LoungeId);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  let navigate = useNavigate();
  const myGift = (Id: any) => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      setIsOpen(true);
      setLoungeId(Id);
    }
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      width: '100%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      background: '#F5F5F5',
      transform: 'translate(-50%, -50%)',
    },
  };

  const onSubmit = (data: any) => {
    // alert('your are reporting')
    console.log(data);
    dispatch<any>(postLoungeFlag(data)).then((res: any) => {
      reset();
      setIsOpen(false);
      console.log(res);
      // Notify(toast(res.payload.data[0].error));
    });
  };

  const deleteConversion = (e: any, msg_id: any) => {
    dispatch<any>(deleteConversionMessage({ msg_id })).then((res: any) => {
      dispatch(fetchMyNotification({ sortType, currentPage }));
      // Notify(toast(res.payload.data));
    });
  };

  //Dm Box reply

  const [dmuserId, setdmuserId] = useState<any | String>();
  const [dmusername, setdmuserame] = useState<any | String>();
  const [dmchatId, setdmchatId] = useState<any | String>();

  const openDm = (userId: any, userName: any) => {
    setdmuserId(userId);
    setdmuserame(userName);
    setDmBox(true);
  };

  const [openDmBox, setDmBox] = useState<string | any>(false);
  const closeDmBox = () => {
    setDmBox(false);
  };
  //console.log(myNotificationItem);
  return (
    <>
      <MetaTags>
        <title>My Notifications</title>
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
          <div className='mid-sec mwstore-page-bg'>
            <LoungeHeader />
            <MobileLoungeHeader />
            <ToastContainer autoClose={3000} />

            {/* for dm message reply */}
            <DmMe
              isOpen={openDmBox}
              isClosed={closeDmBox}
              LoungeId={''}
              register={''}
              handleSubmit={''}
              onSubmit={''}
              setValue={''}
              isSubmitted={true}
              user_id={dmuserId}
              userName={dmusername}
              chatId={''}
              type={'messageReply'}
            />

            {/* dm message reply modal ends here  */}

            <div className='des-bg'>
              <>
                {status === 'error' ? (
                  <div className='content__error-info'>
                    <h2>Error</h2>
                    <p>Please try to open the page later.</p>
                  </div>
                ) : (
                  <div className='mid-card-sec'>
                    {status === 'loading'
                      ? [...new Array(9)]?.map((_, index) => (
                          <Placeholder key={index} />
                        ))
                      : myNotificationItem?.map((obj) =>
                          obj.error != null ? (
                            <div className='card-mn rounded'>
                              <div className='card-body'>{obj.error}</div>
                            </div>
                          ) : (
                            <>
                              {obj.type == 'c' && (
                                <div className='card-mn rounded'>
                                  <div className='card-body'>
                                    <div className='d-flex flex-row'>
                                      <div className='notifications-s'>
                                        <div className='not-s'>
                                          <div className='d-flex'>
                                            <div className='flex-shrink-0'>
                                              <div className='img-cs'>
                                                <a
                                                  href={`/disneyland/user/${obj.user_id}/mypost`}
                                                >
                                                  <img
                                                    src={
                                                      GET_BASE_URL_IMAGE +
                                                      '/disneyland/images/thumbs/' +
                                                      obj.image +
                                                      dTime
                                                    }
                                                    className='card-img-top img-fluid'
                                                    alt='img'
                                                  />
                                                </a>
                                              </div>
                                            </div>

                                            <div className='not-text flex-grow-1'>
                                              <p className='not-p'>
                                                {obj.chat_msg && (
                                                  <span
                                                    style={{
                                                      fontFamily: 'Inter',
                                                      fontSize: '1rm',
                                                      marginLeft: '1rem',
                                                      marginRight: '1rem',
                                                      fontWeight: 400,
                                                      fontStyle: 'normal',
                                                      color: '#313237',
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                      __html: obj.chat_msg
                                                        ?.replace(
                                                          '<p>',
                                                          '<span>'
                                                        )
                                                        .replace(
                                                          '</p>',
                                                          '</spam>'
                                                        )
                                                        .replace('<br>', ''),
                                                    }}
                                                  ></span>
                                                )}
                                                <br />
                                                <a
                                                  href={`/disneyland/user/${obj.user_id}/mypost`}
                                                >
                                                  {obj.user_name}
                                                </a>

                                                <span className='com-tt'>
                                                  {' '}
                                                  {obj.rank} # {obj.position}
                                                </span>
                                                <br />
                                                <span
                                                  className='not-1 item-lisst'
                                                  style={{
                                                    marginLeft: '1rem',
                                                    cursor: 'pointer',
                                                  }}
                                                >
                                                  <span
                                                    style={{
                                                      cursor: 'pointer',
                                                    }}
                                                    onClick={() =>
                                                      openModal(
                                                        obj.chat_reply_id
                                                      )
                                                    }
                                                  >
                                                    Flag
                                                  </span>

                                                  <Modal
                                                    isOpen={modalIsOpen}
                                                    onAfterOpen={afterOpenModal}
                                                    onRequestClose={closeModal}
                                                    style={customStyles}
                                                    contentLabel='Example Modal'
                                                  >
                                                    <form
                                                      className='space-y-6'
                                                      onSubmit={handleSubmit(
                                                        onSubmit
                                                      )}
                                                      method='POST'
                                                    >
                                                      <div className='row'>
                                                        <div className='box-t-1'>
                                                          <h6
                                                            style={{
                                                              fontSize: '1rm',
                                                              fontWeight: 400,
                                                              color: 'red',
                                                            }}
                                                          >
                                                            Report
                                                          </h6>

                                                          <div
                                                            className='close-p'
                                                            onClick={closeModal}
                                                          >
                                                            <i className='fa fa-close my-b' />
                                                          </div>
                                                          <div className='boxwidth'>
                                                            <div className='box-ttt'>
                                                              <textarea
                                                                rows={3}
                                                                cols={60}
                                                                placeholder='write reason for reporting'
                                                                {...register(
                                                                  'ReasonForReport'
                                                                )}

                                                                /* {...register("Type")} {...register("LoungeId")} */
                                                              />

                                                              <input
                                                                type='hidden'
                                                                // setValue={
                                                                //   LoungeId
                                                                // }
                                                                {...register(
                                                                  'LoungeId'
                                                                )}
                                                                defaultValue={
                                                                  LoungeId
                                                                }
                                                              />
                                                              <div className='mw-post text-center'>
                                                                <input
                                                                  className='MW-btn'
                                                                  type='Submit'
                                                                  value='Post'
                                                                />
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </form>
                                                  </Modal>
                                                  <>
                                                    <LikeCommentReply
                                                      likecount={
                                                        obj.no_of_likes
                                                      }
                                                      chat_id={obj.chat_id}
                                                      comment_id={
                                                        obj.chat_reply_id
                                                      }
                                                      reply_id={''}
                                                      commnet_userid={
                                                        obj.user_id
                                                      }
                                                      type={'C'}
                                                      page={'DL'}
                                                    />
                                                  </>
                                                  <span
                                                    onClick={() =>
                                                      showReplyIcon(obj.chat_id)
                                                    }
                                                  >
                                                    Reply
                                                  </span>
                                                  {loginuser == obj?.user_id ? (
                                                    <>
                                                      {/*  <span>Edit</span> */}
                                                      <span
                                                        onClick={(e) => {
                                                          if (
                                                            window.confirm(
                                                              'Are you sure?'
                                                            )
                                                          )
                                                            onRemove(
                                                              obj.chat_reply_id
                                                            );
                                                        }}
                                                      >
                                                        Delete
                                                      </span>
                                                    </>
                                                  ) : (
                                                    /*   */ <></>
                                                  )}
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        {/*      <CommentReply
                                          replyData={
                                            obj.comments[0].commentsreply
                                          }
                                          replyShow={showReply}
                                          chatId={obj.chat_id}
                                          chat_reply_id={obj.chat_reply_id}
                                          stickerData={stickerItems}
                                        /> */}

                                        <div className='not-det'>
                                          <Link
                                            to={`/disneyland/lands-talk/${
                                              obj.chat_id
                                            }/${obj.chat_msg?.replace(
                                              /<[^>]*>?/gm,
                                              '-'
                                            )}`}
                                          >
                                            Detail Page
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                    <CommentReply
                                      replyData={[]}
                                      replyShow={showReply}
                                      chatId={obj.chat_id}
                                      chat_reply_id={obj.chat_reply_id}
                                      stickerData={stickerItems}
                                    />
                                  </div>
                                </div>
                              )}

                              {obj.type == 'm' && (
                                <div className='card-mn rounded'>
                                  <div className='card-body'>
                                    <div className='d-flex flex-row'>
                                      <div className='notifications-s'>
                                        <div className='not-s'>
                                          <div className='d-flex'>
                                            <div className='flex-shrink-0'>
                                              <div className='img-cs'>
                                                <a
                                                  href={`/disneyland/user/${obj.user_id}/mypost`}
                                                >
                                                  <img
                                                    src={
                                                      GET_BASE_URL_IMAGE +
                                                      '/disneyland/images/thumbs/' +
                                                      obj.image +
                                                      dTime
                                                    }
                                                    className='card-img-top img-fluid'
                                                    alt='img'
                                                  />
                                                </a>
                                              </div>
                                            </div>

                                            <div className='not-text flex-grow-1'>
                                              <p className='not-p'>
                                                <div>
                                                  conversion with
                                                  <a
                                                    className='text-black'
                                                    style={{
                                                      marginLeft: '0.5rem',
                                                    }}
                                                    href={`/disneyland/user/${obj.user_id}/mypost`}
                                                  >
                                                    {obj.user_name}
                                                  </a>
                                                  <span className='not-1'>
                                                    <a
                                                      onClick={() =>
                                                        openDm(
                                                          obj.user_id,
                                                          obj.user_name
                                                        )
                                                      }
                                                      style={{
                                                        cursor: 'pointer',
                                                        textDecoration: 'none',
                                                        borderBottom: 'none',
                                                      }}
                                                    >
                                                      Reply
                                                    </a>
                                                  </span>
                                                  <br />
                                                </div>
                                                {obj.chat_msg && (
                                                  <span
                                                    style={{
                                                      fontFamily: 'Inter',
                                                      fontSize: '1rm',
                                                      marginRight: '1rem',
                                                      fontWeight: 400,
                                                      fontStyle: 'normal',
                                                      color: '#313237',
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                      __html: obj.chat_msg
                                                        ?.replace(
                                                          '<p>',
                                                          '<span>'
                                                        )
                                                        .replace(
                                                          '</p>',
                                                          '</spam>'
                                                        )
                                                        .replace('<br>', ''),
                                                    }}
                                                  ></span>
                                                )}{' '}
                                                <br />
                                                <span
                                                  className='com-tt'
                                                  style={{
                                                    fontSize: 'smaller',
                                                  }}
                                                >
                                                  {' '}
                                                  {converDate(obj.createdon)}
                                                </span>
                                                <span className='not-1'>
                                                  <a
                                                    style={{
                                                      cursor: 'pointer',
                                                      textDecoration: 'none',
                                                      borderBottom: 'none',
                                                    }}
                                                    onClick={(e) => {
                                                      if (
                                                        window.confirm(
                                                          'Are you sure ?'
                                                        )
                                                      )
                                                        deleteConversion(
                                                          e,
                                                          obj.chat_id
                                                        );
                                                    }}
                                                  >
                                                    Delete
                                                  </a>
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {obj.type == 'n' && (
                                <div className='card-mn rounded'>
                                  <div className='card-body'>
                                    <div className='d-flex flex-row'>
                                      <div className='notifications-s'>
                                        <div className='not-s'>
                                          <div className='d-flex'>
                                            <div className='flex-shrink-0'>
                                              <div className='img-cs'>
                                                <a
                                                  href={`/disneyland/user/${obj.user_id}/mypost`}
                                                >
                                                  <img
                                                    src={
                                                      GET_BASE_URL_IMAGE +
                                                      '/disneyland/images/thumbs/' +
                                                      obj.image +
                                                      dTime
                                                    }
                                                    className='card-img-top img-fluid'
                                                    alt='img'
                                                  />
                                                </a>
                                              </div>
                                            </div>

                                            <div className='not-text flex-grow-1'>
                                              <p className='not-p'>
                                                <div>
                                                  You were tagged in this{' '}
                                                  <Link
                                                    className='text-black'
                                                    style={{
                                                      marginLeft: '0rem',
                                                    }}
                                                    to={`/disneyland/lands-talk/${
                                                      obj.chat_id
                                                    }/${obj.chat_msg?.replace(
                                                      / /g,
                                                      '-'
                                                    )}`}
                                                  >
                                                    post
                                                  </Link>{' '}
                                                  by
                                                  <Link
                                                    className='text-black'
                                                    style={{
                                                      marginLeft: '0.5rem',
                                                    }}
                                                    to={`/disneyland/user/${obj.user_id}/mypost`}
                                                  >
                                                    {obj?.user_name}
                                                  </Link>
                                                  <br />
                                                  <span
                                                    className='com-tt'
                                                    style={{
                                                      marginLeft: '.5rem',
                                                      fontSize: 'smaller',
                                                    }}
                                                  >
                                                    {' '}
                                                    {converDate(obj.createdon)}
                                                  </span>
                                                </div>

                                                {obj.chat_msg && (
                                                  <span
                                                    style={{
                                                      fontFamily: 'Inter',
                                                      fontSize: '1rm',
                                                      marginRight: '1rem',
                                                      fontWeight: 400,
                                                      fontStyle: 'normal',
                                                      color: '#313237',
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                      __html: obj.chat_msg
                                                        ?.replace(
                                                          '<p>',
                                                          '<span>'
                                                        )
                                                        .replace(
                                                          '</p>',
                                                          '</spam>'
                                                        )
                                                        .replace('<br>', ''),
                                                    }}
                                                  ></span>
                                                )}

                                                <span className='not-1'>
                                                  <a href=''>Reply</a>{' '}
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          )
                        )}
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
