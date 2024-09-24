import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CommentReply } from '../components/CommentReply';
import { EditBox } from '../components/EditBox';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import {
  postLoungeCommentReply,
  removeUserLounge,
  wholikeCommentReply,
  likeCommentReply,
} from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchLounges, postLoungeFlag } from '../redux/lounges/slice';
import { createModuleDeclaration } from 'typescript';
import { LikeCommentReply } from '../components/LikeCommentReply';

import axios, { AxiosResponse } from 'axios';
import { GET_BASE_URL } from '../constants/apiEndpoints';
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';
import { COMPLETIONSTATEMENT_TYPES } from '@babel/types';
import { format } from 'path';

type CommentListPropsType = {
  chatId: any;
  cmt: any;
  replyShow: false;
  stickerData: any;
};
type FormData = {
  ReasonForReport: string;
  LoungeId: number;
  Type: string;
};
export const CommentList: React.FC<CommentListPropsType> = ({
  chatId,
  cmt,
  replyShow,
  stickerData,
}) => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [showReply, SetShowReply] = useState<any | string>(replyShow);
  const [editbox, SetEditBox] = useState<any | string>(false);

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
  function converTime(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
    return formattedDate;
  }
  const token = localStorage.getItem('token');
  const loginuserid = localStorage.getItem('user_id');
  //console.log(token);
  const showReplyIcon = () => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      SetShowReply(!showReply);
    }
  };
  const showEditBox = () => {
    SetEditBox(!editbox);
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle: any;
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

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

  let sortType: any = null;
  //let LoungeId: any = null;
  let currentPage: any = null;
  let searchValue: any = null;
  const [Type, setFlagType] = useState<string>('R');
  const [LoungeId, setLoungeId] = useState<number | any>('');

  const { items, status, sortByTime } = useSelector(selectLounges);
  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );
  const [Notify, setIsNotify] = useState<any | string>();

  const myGift = (Id: any) => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      setIsOpen(true);
      setLoungeId(Id);
    }
  };

  useEffect(() => {
    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  useEffect(() => {
    setValue('Type', Type);
  }, [Type]);

  useEffect(() => {
    setValue('LoungeId', LoungeId);
  }, [LoungeId]);

  const onSubmit = (data: any) => {
    dispatch<any>(postLoungeFlag(data)).then((res: any) => {
      // Notify(toast(res.payload.data[0].error));
    });
  };

  const [RemoveType, setRemoveType] = useState<any | string>('C');
  const onRemove = (ban_chat_id: any) => {
    dispatch<any>(removeUserLounge({ ban_chat_id, RemoveType })).then(
      (res: any) => {
        window.location.reload();
      }
    );
  };

  const [likeuserlist, setLikeUserList] = useState<any | string>(false);
  const [likeuserdata, setLikeUserData] = useState<any | string>([]);

  const [formatedMsg, setFormatedMsg] = useState(cmt.chat_reply_msg);

  useEffect(() => {

    var domParser = new DOMParser();
    var doc = domParser.parseFromString(formatedMsg, 'text/html');
    var msg = doc.body.innerHTML;
    let replacemsg = msg.match(/@(\w+)/g)?.map(match => match.substring(1));
    async function convert()
    {
      for(const val of replacemsg ?? []) {
        if(val.length > 0) {
          let response = await axios.get(GET_BASE_URL + '/backend/api/v1/getUserId?name=' + val)
          if(response.data.data.length > 0) {
            let id = response.data.data[0].id;
            let htmltext = "<a href='/disneyland/user/" + id + "/mypost'>@" + val + "</a>";
            msg = msg.replace('@' + val, htmltext);
          }
        } 
      }
      doc.body.innerHTML = msg;
      setFormatedMsg(msg)
    }
    convert();
  }, [cmt.chat_reply_msg]);
  
  // const formattedMessage = async (message: string) => {
  //   var domParser = new DOMParser();
  //   var doc = domParser.parseFromString(message, 'text/html');
  //   var msg = doc.body.innerText;
  //   let replacemsg = msg.match(/@(\w+)/g)?.map(match => match.substring(1));
    
  //   {
  //       await replacemsg?.map((val) => {
  //       val.length > 0 && axios
  //         .get(GET_BASE_URL + '/backend/api/v1/getUser?name=' + val)
  //         .then((response: any) => {
  //           if(response.data.data.length > 0) {
  //             let id = response.data.data[0].id;
  //             let htmltext = "<a href='/../../user/" + id + "/mypost'>" + val + "</a>";
  //             msg = msg.replace('@' + val, htmltext);
  //             console.log('aaaaaaaa', msg)
  //           }
  //       });

  //     })
  //   }
    
    // setFormatedMsg(msg)
    // return msg;
    // var links = doc.querySelectorAll('.mention');
    // links.forEach(function (linkTag: any) {
    //   var aTag = document.createElement('a');
    //   aTag.href = `../../user/${linkTag.dataset.id}/mypost`;

    //   aTag.style.color = '#0000EE';
    //   aTag.style.marginRight = '3px';
    //   aTag.innerHTML = linkTag.innerHTML;
    //   linkTag.parentNode.replaceChild(aTag, linkTag);
    // });
    // console.log('aaaaaa', msgtext)
    // return "<p>asdf</p>";

  return (
    <>
      <>
        <div>
          <div className='comm-bo d-flex flex-row' key={cmt.chat_id}>
            <div className='small-c'>
              <a href=''>
                <img
                  style={{ verticalAlign: 'middle' }}
                  src={
                    GET_BASE_URL_IMAGE +
                    '/disneyland/images/thumbs/' +
                    cmt.commentuser.image
                  }
                  className='com-imggg'
                />
              </a>
            </div>
            <ToastContainer autoClose={3000} />
            <div className='comm-c d-flex' style={{ marginTop: '0px' }}>
              <p className='commentlist'>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '1rm',

                    fontWeight: 400,
                    fontStyle: 'normal',
                    color: '#313237',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: formatedMsg
                      .replace('<p>', '<span>')
                      .replace('</p>', '</span>')
                      .replace('<br>', ''),
                  }}
                ></span>
                <br />
                <Link
                  style={{
                    marginRight: '.5rem',
                    color: '#000',
                    background: 'transparent',
                  }}
                  to={`/disneyland/user/${cmt.commentuser?.user_id}/mypost`}
                >
                  {cmt.commentuser?.user_name}
                </Link>

                <span className='com-tt'>
                  <span>{cmt.commentuser?.rank}</span>
                  <span
                    style={{
                      marginLeft: '.5rem',
                    }}
                  >
                    #{cmt.commentuser?.position}
                  </span>
                  <span
                    style={{
                      marginLeft: '.5rem',
                      marginRight: '1rem',
                      fontSize: 'smaller',
                    }}
                  >
                    {converDate(cmt?.chat_reply_date)}
                  </span>
                </span>

                {/*        <small className='co-s' style={{ marginRight: '.5rem' }}>
                  {converDate(cmt.chat_reply_date)}
                </small> */}
                <br />
                <span className='co-l'>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => myGift(cmt.chat_reply_id)}
                  >
                    FLAG
                  </span>

                  <>
                    <LikeCommentReply
                      likecount={cmt.no_of_likes}
                      chat_id={cmt.chat_id}
                      comment_id={cmt.chat_reply_id}
                      reply_id={''}
                      commnet_userid={cmt.commentuser.user_id}
                      type={'C'}
                      page={'DL'}
                    />
                  </>

                  {/*             <span
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => showUser(cmt.chat_reply_id)}
                    onClick={() =>
                      likeCommnetAndReply(
                        cmt.chat_id,
                        cmt.chat_reply_id,
                        '',
                        cmt.commentuser.user_id,
                        'C'
                      )
                    }
                  >
                    LIKE{' '}
                    {cmt.no_of_likes > 0 ? <>({cmt.no_of_likes}) </> : <></>}
                  </span> */}

                  <span style={{ cursor: 'pointer' }} onClick={showReplyIcon}>
                    REPLY
                  </span>
                </span>

                {/*  {likeuserlist == true ? (
                  <div className='pro-card-s'>
                    <div className='card'>
                      <div className='card-header text-center'>
                        <h6>MouseWaiters who Liked this:</h6>
                      </div>

                      {likeuserdata.map((product: any) => {
                        return (
                          <div
                            className='pro-img text-center'
                            style={{ display: 'flex', padding: '0.5rem' }}
                          >
                            <img
                              src={
                                'https://mousewait.xyz/disneyland/chat_images/' +
                                product.user?.image
                              }
                              style={{
                                height: '50px',
                                width: '50px',
                                borderRadius: '50%',
                              }}
                              alt='image'
                            />
                            <h6 style={{ padding: '1rem' }}>
                              {product?.user?.user_name}
                            </h6>
                          </div>
                        );
                      })} 
                    </div>
                  </div>
                ) : (
                  <></>
                )} */}

                <>
                  {cmt.commentuser.user_id == loginuserid ? (
                    <span className='co-l'>

                      <span onClick={showEditBox}>EDIT</span>
                      
                      <span onClick={() => {
                        if (window.confirm('Are You Sure?'))
                          onRemove(cmt.chat_reply_id)
                        }}
                      >
                        DELETE
                      </span>
                    </span>
                  ) : (
                    <></>
                  )}
                </>
              </p>
            </div>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='Example Modal'
          >
            <form
              className='space-y-6'
              onSubmit={handleSubmit(onSubmit)}
              method='POST'
            >
              <div className='row'>
                <div className='box-t-1'>
                  <h6
                    style={{ fontSize: '1rm', fontWeight: 400, color: 'red' }}
                  >
                    Report
                  </h6>
                  <div className='close-p' onClick={closeModal}>
                    <i className='fa fa-close my-b' />
                  </div>
                  <div className='boxwidth'>
                    <div className='box-ttt'>
                      {/* <label for="story" class="w-50 m-auto justify-content-start">Tell us your story</label> */}
                      <textarea
                        rows={3}
                        cols={60}
                        placeholder='write reason for reporting'
                        {...register('ReasonForReport')}
                      />
                      <input
                        type='hidden'
                        /*    setValue={Type} */
                        {...register('Type')}
                      />
                      <input
                        type='hidden'
                        /* setValue={LoungeId} */
                        {...register('LoungeId')}
                      />
                      <div className='mw-post text-center'>
                        <input className='MW-btn' type='Submit' value='Post' />
                        {/* {isLoading == true ? (
                          <input
                            className='MW-btn'
                            type='Submit'
                            value='Posting'
                          />
                        ) 
                        : (
                          <input
                            className='MW-btn'
                            type='Submit'
                            value='Post'
                          />
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Modal>

          <EditBox
            replyData={''}
            id={''}
            chatId={cmt.chat_id}
            chat_reply_id={cmt.chat_reply_id}
            chat_reply_msg={cmt.chat_reply_msg}
            stickerData={stickerData}
            editbox={editbox}
            type={'C'}
          />

          <CommentReply
            replyData={cmt.commentsreply}
            replyShow={showReply}
            chatId={cmt.chat_id}
            chat_reply_id={cmt.chat_reply_id}
            stickerData={stickerData}
          />
        </div>
      </>
    </>
  );
};
