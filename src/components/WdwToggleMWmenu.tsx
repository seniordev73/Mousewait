import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLounges } from '../redux/lounges/selectors';
import {
  postLoungeCommentEditWdw,
  bumpPostWdw,
  lockPostWdw,
  removeImageOverPostWdw,
  fetchDisneyWorldLounges,
  stickPostWdw,
} from '../redux/lounges/slice';

import {
  postThankyouWdw,
  postBookMarkWdw,
  postLoungeFlagWdw,
  removeUserLoungeWdw,
  fetchLounges,
  fetchAllTaglists,
} from '../redux/lounges/slice';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import {
  AiOutlineTag,
  AiOutlineCloseCircle,
  AiOutlineMessage,
} from 'react-icons/ai';
import { MdMessage } from 'react-icons/md';
import { BiMessageDots } from 'react-icons/bi';

import DmMe from './DmMe';
import TagMe from './TagMe';
import MovePost from './WdwMovePost';

import arrowup from '../assets/img/arrowup.png';
import arrowdown from '../assets/img/arrowdown.png';
import WdwAdvanceEditor from './WdwAdvanceEditor';
import { RichTextEditor } from '@mantine/rte';


type ToggleMenuMWPropsType = {
  getBookMark: any;
  getThankYou: any;
  LoungeId: any;
  onSubmit: any;
  register: any;
  handleSubmit: any;
  setValue: any;
  isLoading: any;
  editType: any;
  chat_reply_msg: string;
  userName?: any;
  userId?: any;
  pageName?: any;
  lock: any;
  getStick: any;
  chatRoomId: any;
};


type FormData = {
  chat_reply_msg: string;
};

export const ToggleMWmenu: React.FC<ToggleMenuMWPropsType> = ({
  getBookMark,
  getThankYou,
  userName,
  userId,
  LoungeId,
  register,
  handleSubmit,
  setValue,
  editType,
  isLoading,
  chat_reply_msg,
  pageName,
  lock,
  getStick,
  chatRoomId,
}) => {
  const TAG = localStorage.getItem('Tag');
  const MP = localStorage.getItem('MP');
  const loginuserrank = localStorage.getItem('rank');
  const [userRank, setUserRank] = useState<any | number>(loginuserrank);
  const [showIcon, setshowIcon] = useState<any | String>(true);
  const [onedit, setOnEdit] = useState<any>('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [LoungeIdd, setLoungeIdd] = useState(LoungeId);
  const [Type, setFlagType] = useState<any | string>('C');
  const post_editor = localStorage.getItem('editor');
  const [defaultcontent, setdefaultcontent] = useState<any | string>(
    chat_reply_msg
  );
  const [thankData, SetThankData] = useState<any | []>([]);
  const [bookMark, SetBookMark] = useState<any | string>(getBookMark);
  const [thankYou, SetThankYou] = useState<any | string>(getThankYou);
  const [ advancedpost, setAdvancedPost ] = useState(false);

  /*  useEffect(() => {
    setValue('LoungeId', LoungeIdd); // if comment this,  will not update.
    setValue('Type', Type);
  }, [LoungeIdd, Type]); */

  useEffect(() => {
    // setValue('LoungeId', LoungeIdd); // if comment this,  will not update.
    setValue('Type', Type);
  }, [Type]);

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

  const token = localStorage.getItem('token');
  let navigate = useNavigate();

  const loginuserid = localStorage.getItem('user_id');

  function openModal() {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      setIsOpen(true);
    }
  }

  const onBookMark = (LoungeId: any) => {
    dispatch<any>(postBookMarkWdw({ LoungeId })).then((res: any) => {
      //reset()
      //console.log(res.payload.data[0].message);
      //console.log('kkkkk000');

      res.payload.data[0].message == 'Added'
        ? SetBookMark(true)
        : SetBookMark(false);

      // Notify(toast(res.payload.data[0].message));
      //res.payload[0].isbookmark?.status ==1 && SetBookMark(true)
    });
  };

  const onClickAdvanced = () => {
    setAdvancedPost(!advancedpost)
  }

  const onThankyou = (LoungeId: any) => {
    dispatch<any>(postThankyouWdw({ LoungeId })).then((res: any) => {
      //reset()

      res.payload.data[0].message == 'Added'
        ? SetThankYou(true)
        : SetThankYou(false);
      SetThankData([]);
      SetThankData(res.payload.data[0].thankdata);
      // Notify(toast(res.payload.data[0].message));

      // res.payload[0].isthankyou?.status ==1 && SetThankYou(true)
    });
  };

  const onEdit = (loungeId: any) => {
    setshowIcon(true);
    setIsOpen(true);
    setOnEdit(true);
    setFlagType('P');
    setdefaultcontent(chat_reply_msg);
  };
  function closeModal() {
    setdefaultcontent(chat_reply_msg);
    setIsOpen(false);
    setshowIcon(false);
  }
  useEffect(() => {
    setdefaultcontent(chat_reply_msg);
  }, [setIsOpen]);

  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );
  let sortType: any = null;
  let currentPage: any = null;
  let searchValue: any = null;

  const dispatch = useAppDispatch();
  const [Notify, setIsNotify] = useState<any | string>();

  const onRemove = (ban_chat_id: any, RemoveType: string) => {
    /*    console.log(RemoveType);
    console.log(ban_chat_id); */
    dispatch<any>(removeUserLoungeWdw({ ban_chat_id, RemoveType })).then(
      (res: any) => {
        window.location.reload();
        // Notify(toast(res.payload.data));
      }
    );
  };

  const onSubmit = (data: any) => {
    // data.chat_type = advancedpost;
    if(richtextvalue != '') {
      data.chat_reply_msg = richtextvalue;
    }
    
    if (data.chat_reply_msg !== undefined) {
      dispatch<any>(postLoungeCommentEditWdw(data)).then((res: any) => {
        // console.log(res)
        window.location.reload();
        // Notify(toast('Post Updated Successfully'));
      });
    } else {
      dispatch<any>(postLoungeFlagWdw(data)).then((res: any) => {
        setIsOpen(false);
        // Notify(toast(res.payload.data[0].error));
        //reset();
        /*     dispatch(
          fetchLounges({
            sortType,
            LoungeId,
            currentPage,
            searchValue,
            shortByTime,
          })
        ); */
      });
    }
  };

  // for user tags
  let tagData: any = null;
  const [AllTagData, setAllTagData] = useState<any | String>();
  const [TagList, setTagList] = useState<any | String>(false);
  const openTagdata = () => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      dispatch(fetchAllTaglists({ tagData, LoungeId })).then((res: any) => {
        setAllTagData(res.payload);
      });
      setTagList(true);
    }
  };

  const closeTagMe = () => {
    setTagList(false);
  };

  //Dm Box

  const [dmuserId, setdmuserId] = useState<any | String>();
  const [dmusername, setdmuserame] = useState<any | String>();
  const [dmchatId, setdmchatId] = useState<any | String>();

  const openDm = (userId: any, username: any, chatId: any) => {
    setdmuserId(userId);
    setdmuserame(username);
    setdmchatId(chatId);
    // console.log(`username is ${dmusername} and userId is ${dmuserId} and chat Id ${dmchatId}`)
    setDmBox(true);
  };

  const [openDmBox, setDmBox] = useState<string | any>(false);
  const closeDmBox = () => {
    setDmBox(false);
  };

  // for compose editor
  const openComposeEditor = () => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      navigate('/disneyworld/mw-advance-editor/' + LoungeId);
    }
  };

  // To lock or unlock a post
  const [islock, setIsLock] = useState<any | String>(lock);
  const isLock = (e: any, LoungeId: any, islock: any) => {
    dispatch<any>(lockPostWdw({ LoungeId, islock })).then((res: any) => {
      if (res.payload.data == 'Post Locked') {
        setIsLock('UnLock');
      } else {
        setIsLock('Lock');
      }
      // Notify(toast(res.payload.data));
    });
  };

  // To bump a post
  const isBump = (e: any, chat_id: any, type: any) => {
    dispatch<any>(bumpPostWdw({ chat_id, type })).then((res: any) => {
      navigate('/disneyland/lounge');
    });
  };

  // To remove image from a post
  const removePostImage = (chat_id: any) => {
    dispatch<any>(removeImageOverPostWdw({ chat_id })).then((res: any) => {
      // window.location.reload();
      dispatch(
        fetchDisneyWorldLounges({
          sortType,
          LoungeId,
          currentPage,
          searchValue,
          shortByTime,
        })
      );
    });
  };

  // To Move post

  const [MoveList, setMoveList] = useState<any | String>(false);
  const movePost = () => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      setMoveList(true);
    }
  };

  const closeMovePost = () => {
    setMoveList(false);
  };

  // To Stick post

  const postStick = (type: any, chat_id: any) => {
    dispatch<any>(stickPostWdw({ chat_id, type })).then((res: any) => {
      navigate('/disneyland/lounge');
    });
  };

  const [richtextvalue, onRichTextChange] = useState(chat_reply_msg);

  return (
    <div className='menu-nav'>
      <div className='dropdown-container' tabIndex={-1}>
        <div className='three-dots'>
          <i className='fa-solid fa-ellipsis-vertical'></i>
        </div>

        <div className='dropdown'>
          {showIcon == true && (
            <div className='img-drop'>
              <ul className='navbar-nav flex-column p-0 m-0'>
                {editType == true ? (
                  <>
                    <li className='nav-item'>
                      <div className='nav-icon'>
                        <i className='fa fa-edit' />
                      </div>
                      <span onClick={() => onEdit(LoungeId)}>Edit</span>
                    </li>

                    <li className='nav-item'>
                      <div className='nav-icon'>
                        <i className='fa fa-trash' />
                      </div>
                      <span
                        onClick={(e) => {
                          if (window.confirm('Are You Sure?'))
                            onRemove(LoungeId, 'D');
                        }}
                      >
                        Delete
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className='nav-item'
                      onClick={() => onThankyou(LoungeId)}
                    >
                      <div className='nav-icon'>
                        <i className='fa-solid fa-star' />
                      </div>
                      {thankYou == true ? (
                        <span>Thanked</span>
                      ) : (
                        <span>Thank You!</span>
                      )}
                    </li>

                    {/*         <li className='nav-item'>
                      <div className='nav-icon'>
                        <MdMessage></MdMessage>
                      </div>
                      <span onClick={() => openDm(userId, userName, LoungeId)}>
                        DM
                      </span>
                    </li> */}
                  </>
                )}

                {/* {userRank > 84 ? ( */}
                  <>
                    <li className='nav-item' onClick={openModal}>
                      <div className='nav-icon'>
                        <i className='fa-solid fa-flag' />
                      </div>
                      <span>Flag/Report</span>
                    </li>
                  </>
                {/* ) : (
                  <></>
                )} */}

                {/*          {loginuserid == '18' ||
                loginuserid == '914' ||
                TAG == 'true' ? (
                  <>
                    <li className='nav-item'>
                      <div className='nav-icon'>
                        <AiOutlineTag></AiOutlineTag>
                      </div>
                      <span onClick={openTagdata}>Tag Me</span>
                    </li>
                  </>
                ) : (
                  <></>
                )} */}

                {loginuserid == userId ||
                loginuserid == '18' ||
                loginuserid == '914' ||
                MP == 'true' ? (
                  <>
                    <li className='nav-item'>
                      <div className='nav-icon'>
                        <i className='fa fa-cog' />
                      </div>
                      <span onClick={movePost}>Move Post</span>
                    </li>
                  </>
                ) : (
                  <></>
                )}

                <li className='nav-item' onClick={() => onBookMark(LoungeId)}>
                  <div className='nav-icon'>
                    <i className='fa-solid fa-bookmark' />
                  </div>
                  {bookMark == true ? (
                    <span>Bookmarked</span>
                  ) : (
                    <span>Bookmark</span>
                  )}
                </li>

                <li
                  className='nav-item'
                  onClick={(e) => {
                    if (window.confirm('Are You Sure?'))
                      onRemove(LoungeId, 'P');
                  }}
                >
                  <div className='nav-icon'>
                    <i className='fa-solid fa-remove' />
                  </div>
                  <span>
                    Remove
                    <p style={{ fontSize: '8px' }}>Hide From Your Timeline</p>
                  </span>
                </li>

                {loginuserid == '18' || loginuserid == '914' ? (
                  <>
                    <li className='nav-item'>
                      <div className='nav-icon'>
                        <i className='fa fa-times-circle' />
                      </div>
                      <span
                        onClick={(e) => {
                          if (
                            window.confirm(
                              'This will remove post image Are you sure?'
                            )
                          )
                            removePostImage(LoungeId);
                        }}
                      >
                        Remove Image
                      </span>
                    </li>
                  </>
                ) : (
                  <></>
                )}

                {/* {post_editor && 
                  <li className='nav-item'>
                    <div className='nav-icon'>
                      <BiMessageDots></BiMessageDots>
                    </div>
                    <span onClick={openComposeEditor}>
                      Edit With Composer
                    </span>
                  </li>
                } */}

                {loginuserid == '18' ||
                loginuserid == '914' ||
                loginuserid == '38' ||
                loginuserid == '46770' ? (
                  <>
                    <li className='nav-item'>
                      <div className='nav-icon'>
                        <i className='fa fa-life-ring' />
                      </div>
                      <span
                        onClick={(e) => {
                          // if (
                          //   window.confirm(
                          //     'Do you want to Lock/Unlock this post?'
                          //   )
                          // )
                            isLock(e, LoungeId, islock);
                        }}
                      >
                        {islock}
                      </span>
                    </li>

                    <li className='nav-item'>
                      <div className='nav-icon'>
                        <i className='fa fa-cogs' />
                      </div>
                      <span
                        onClick={(e) => {
                          // if (
                          //   window.confirm(
                          //     'Do you want to Stick/Unstick this post?'
                          //   )
                          // )
                            postStick(getStick, LoungeId);
                        }}
                      >
                        {getStick}
                      </span>
                    </li>
                    <li className='nav-item'>
                      <div className='nav-icon'>
                        <i className='fa fa-plus-square' />
                      </div>
                      <span
                        onClick={(e) => {
                          // if (
                          //   window.confirm(
                          //     'Do you want to to make this post Bump?'
                          //   )
                          // )
                            isBump(e, LoungeId, 'up');
                        }}
                      >
                        Bump
                      </span>
                    </li>
                    <li className='nav-item'>
                      <div className='nav-icon'>
                        <i className='fa fa-square' />
                      </div>
                      <span
                        onClick={(e) => {
                          // if (
                          //   window.confirm(
                          //     'Do you want to to make this post Never Bump?'
                          //   )
                          // )
                            isBump(e, LoungeId, 'never');
                        }}
                      >
                        Never Bump
                      </span>
                    </li>
                    <li className='nav-item'>
                      <div className='nav-icon'>
                        <i className='fa fa-check-square' />
                      </div>
                      <span
                        onClick={(e) => {
                          // if (
                          //   window.confirm(
                          //     'Do you want to to make this post  Bump?'
                          //   )
                          // )
                            isBump(e, LoungeId, 'auto');
                        }}
                      >
                        Auto Bump
                      </span>
                    </li>
                    <li className='nav-item'>
                      <div className='nav-icon'>
                        <i className='fa fa-minus-square' />
                      </div>
                      <span
                        onClick={(e) => {
                          // if (
                          //   window.confirm(
                          //     'Do you want to to make this post Bump?'
                          //   )
                          // )
                            isBump(e, LoungeId, 'down');
                        }}
                      >
                        Bump Down
                      </span>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <ToastContainer autoClose={3000} />

      {/* tag me starts here  */}

      <TagMe
        isOpen={TagList}
        isClosed={closeTagMe}
        TagDatas={AllTagData}
        chatId={LoungeId}
        Page={pageName}
      />

      {/* tag me ends here  */}

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
        user_id={dmuserId}
        userName={dmusername}
        chatId={dmchatId}
        type={''}
      />

      {/* dm message modal ends here  */}

      {/*  flag and edit post  modal start  */}
      <Modal
        isOpen={modalIsOpen}
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
              {onedit !== '' ? (
                <>
                  <h6
                    style={{ fontSize: '1rm', fontWeight: 400, color: 'red' }}
                  >
                    Edit Post
                  </h6>
                </>
              ) : (
                <>
                  <h6
                    style={{ fontSize: '1rm', fontWeight: 400, color: 'red' }}
                  >
                    Report
                  </h6>
                </>
              )}

              <div className='close-p' onClick={closeModal}>
                <i className='fa fa-close my-b' />
              </div>
              <div className='boxwidth'>
                <div className='box-ttt'>
                  {onedit != '' ? (
                    <>

                      {post_editor == 'true' && (
                        <div className="advance-radio-gruop">
                          <div>
                            <input type="radio" id="default" checked={!advancedpost} onClick={onClickAdvanced}></input>
                            <label htmlFor="default">Default Post</label>
                          </div>
                          
                          <div>
                            <input type="radio" id="advanced" checked={advancedpost} onClick={onClickAdvanced}></input>
                            <label htmlFor="advanced">Advanced Post</label>
                          </div>
                        </div>
                      )}
                      {!advancedpost ? (
                        <>
                          <textarea
                            rows={3}
                            cols={60}
                            {...register('chat_reply_msg')}
                            defaultValue={chat_reply_msg}
                            /* {...register("Type")} {...register("LoungeId")} */
                          />
                        </>
                      ) : ( 
                        <>
                          <div className="advance-editor">
                            <RichTextEditor 
                            value={richtextvalue}
                            onChange={onRichTextChange} 
                            />
                          </div>
                        </>)
                      }
                    </>
                  ) : (
                    <>
                      <textarea
                        rows={3}
                        cols={60}
                        placeholder='write reason for reporting'
                        {...register('ReasonForReport')}

                        /* {...register("Type")} {...register("LoungeId")} */
                      />
                      <input
                        type='hidden'
                        setValue={LoungeIdd}
                        {...register('LoungeId')}
                        defaultValue={LoungeIdd}
                      />
                    </>
                  )}
                  {/* <textarea
                    rows={3}
                    cols={60}
                    {...register("chat_reply_msg")}
                    defaultValue={defaultcontent}
                  /> */}

                  <input
                    type='hidden'
                    setValue={LoungeIdd}
                    {...register('LoungeId')}
                    defaultValue={LoungeIdd}
                  />

                  <div className='mw-post text-center'>
                    {isLoading == true ? (
                      <input className='MW-btn' type='Submit' value='Edit' style={{backgroundColor: '#0d6efd'}}/>
                    ) : (
                      <input className='MW-btn' type='Submit' value='Edit' style={{backgroundColor: '#0d6efd'}}/>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
      {/*  flag  and edit post modal end  */}

      {/* move post start here  */}
      <MovePost
        isOpen={MoveList}
        isClosed={closeMovePost}
        TagDatas={''}
        chatId={LoungeId}
        Page={''}
        chatRoomId={chatRoomId}
      />

      {/* move post ends here  */}
    </div>
  );
};

export default ToggleMWmenu;
