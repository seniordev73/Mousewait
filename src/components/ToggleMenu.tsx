import { useEffect, useState, useRef } from 'react';
// @ts-ignore
import 'axios-progress-bar/dist/nprogress.css';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  postThankyou,
  postBookMark,
  postLoungeFlag,
  removeUserLounge,
  fetchLounges,
  fetchAllTaglists,
  lockPost,
  bumpPost,
  stickPost,
  removeImageOverPost,
  fetchUserMenu,
  postSubscribeFromLounge,
  fetchCatLounges,
} from '../redux/lounges/slice';
import { fetchLoungeDetails } from '../redux/lounges/slice';
import { useSelector } from 'react-redux';
import { selectLounges } from '../redux/lounges/selectors';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AiOutlineTag,
  AiOutlineCloseCircle,
  AiOutlineMessage,
} from 'react-icons/ai';
import { MdMessage } from 'react-icons/md';
import { BiMessageDots } from 'react-icons/bi';

import DmMe from './DmMe';
import TagMe from './TagMe';
import MovePost from './MovePost';
import arrowup from '../assets/img/arrowup.png';
import arrowdown from '../assets/img/arrowdown.png';
import MwAdvanceEditor from './MwAdvanceEditor';
import { RichTextEditor } from '@mantine/rte';


type ToggleMenuPropsType = {
  getBookMark: any;
  getThankYou: any;
  onSubmit: any;
  register: any;
  handleSubmit: any;
  setValue: any;
  isLoading: any;
  editType: any;
  chat_reply_msg: string;
  username?: any;
  userid?: any;
  LoungeId: any;
  pageName: any;
  lock: any;
  chatRoomId: any;
  getStick: any;
  getSubscribe: any;
  // chat_type: any;
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

type FormData = {
  ReasonForReport: string;
  chat_reply_msg: string;
};

export const ToggleMenu: React.FC<ToggleMenuPropsType> = ({
  getBookMark,
  getThankYou,

  onSubmit,
  register,
  handleSubmit,
  setValue,
  isLoading,
  editType,
  username,
  userid,
  LoungeId,
  chat_reply_msg,
  pageName,
  lock,
  chatRoomId,
  getStick,
  getSubscribe,
  // chat_type,
}) => {
  const [showIcon, SetShowIcon] = useState<any | string>(true);

  const dispatch = useAppDispatch();
  // const{LoungeId,url}=useParams();
  const { itemDetail, status, stickerItems, commentDataList } =
    useSelector(selectLounges);
  //const { items, status,sortByTime } = useSelector(selectLounges)

  const [thankData, SetThankData] = useState<any | []>([]);
  const [bookMark, SetBookMark] = useState<any | string>(getBookMark);
  const [subscribe, SetSubscribe] = useState<any | string>(getSubscribe);
  const [thankYou, SetThankYou] = useState<any | string>(getThankYou);
  const [Type, setFlagType] = useState<any | string>('C');
  const [LoungeIdd, setLoungeId] = useState<any | string>(LoungeId);

  const loginuserid = localStorage.getItem('user_id');
  const loginuserrank = localStorage.getItem('rank');
  const TAG = localStorage.getItem('Tag');
  const MP = localStorage.getItem('MP');
  const DM = localStorage.getItem('DM');
  const SP = localStorage.getItem('SP');
  const post_editor = localStorage.getItem('editor');
  const [userRank, setUserRank] = useState<any | number>(loginuserrank);
  const [Notify, setIsNotify] = useState<any | string>();

  const [ advancedpost, setAdvancedPost ] = useState(false);

  // thank you
  const onThankyou = (LoungeId: any) => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      dispatch<any>(postThankyou({ LoungeId })).then((res: any) => {
        //reset()

        res.payload.data[0].message == 'Added'
          ? SetThankYou(true)
          : SetThankYou(false);
        SetThankData([]);
        SetThankData(res.payload.data[0].thankdata);
        // Notify(toast(res.payload.data[0].message));
        // res.payload[0].isthankyou?.status ==1 && SetThankYou(true)
      });
    }
  };

  const { sortByTime } = useSelector(selectLounges);
  let sortType: any = null;
  let currentPage: any = null;
  let searchValue: any = null;

  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );

  useEffect(() => {
    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  

  const onBookMark = (LoungeId: any) => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      dispatch<any>(postBookMark({ LoungeId })).then((res: any) => {

        res.payload.data[0].message == 'Added'
          ? SetBookMark(true)
          : SetBookMark(false);
        // Notify(toast(res.payload.data[0].message));
      });
    }
  };

  // remove post from view particular user not delete
  const onRemove = (ban_chat_id: any, RemoveType: string) => {
    console.log('ban_chat_id', ban_chat_id)
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      window.confirm('Are you sure?');
      // console.log(RemoveType);
      dispatch<any>(removeUserLounge({ ban_chat_id, RemoveType })).then(
        (res: any) => {
          // Notify(toast(res.payload.data));
          window.location.reload();
        }
      );
      
      if(chatRoomId == 3 || chatRoomId == 4) {
        fetchCatLounges({
          landid: chatRoomId,
          landname: pageName,
          sortType,
          LoungeId,
          currentPage,
          searchValue,
          shortByTime,
        })
      }
      else {

        dispatch(
          fetchLounges({
            sortType,
            LoungeId,
            currentPage,
            searchValue,
            shortByTime,
          })
        );
        
      }

    }
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  let navigate = useNavigate();
  // for user tags
  let tagData: any = null;
  const [AllTagData, setAllTagData] = useState<any | String>();
  const [TagList, setTagList] = useState<any | String>(false);
  let subtitle: any;
  function openModal() {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      setIsOpen(true);
    }
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const token = localStorage.getItem('token');

  useEffect(() => {
    setValue('Type', Type);
  }, [Type]);

  useEffect(() => {
    setValue('LoungeId', LoungeIdd);
  }, [LoungeIdd]);

  const [onedit, setOnEdit] = useState<any>('');
  const onEdit = (LoungeId: any) => {
    setIsOpen(true);
    setOnEdit(true);
    setFlagType('P');
  };

  const closeTagMe = () => {
    setTagList(false);
  };

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

 

  //Dm Box

  const [dmuserId, setdmuserId] = useState<any | String>();
  const [dmusername, setdmuserame] = useState<any | String>();
  const [dmchatId, setdmchatId] = useState<any | String>();

  const openDm = (userId: any, username: any, chatId: any) => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      setdmuserId(userId);
      setdmuserame(username);
      setdmchatId(chatId);
      setDmBox(true);
    }
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
      navigate('/disneyland/mw-advance-editor/' + LoungeId);
    }
  };

  // To lock or unlock a post
  const [islock, setIsLock] = useState<any | String>(lock);
  const isLock = (e: any, LoungeId: any, islock: any) => {
    dispatch<any>(lockPost({ LoungeId, islock })).then((res: any) => {
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
    dispatch<any>(bumpPost({ chat_id, type })).then((res: any) => {
      dispatch(
        fetchLounges({
          sortType,
          LoungeId,
          currentPage,
          searchValue,
          shortByTime,
        })
      );
      // Notify(toast(res.payload.data));
    });
  };

  // To remove image from a post
  const removePostImage = (chat_id: any) => {
    dispatch<any>(removeImageOverPost({ chat_id })).then((res: any) => {
      dispatch(
        fetchLounges({
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
    dispatch<any>(stickPost({ chat_id, type })).then((res: any) => {
      window.location.reload();
    });
  };

  //post subscribe and unsubscribe
  const subscribePost = (chat_id: any) => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      let suscribeUnsuscribe: any = subscribe;
      dispatch<any>(
        postSubscribeFromLounge({ chat_id, suscribeUnsuscribe })
      ).then((res: any) => {
        console.log(res);
        res.payload.data == 'Removed'
          ? SetSubscribe(true)
          : SetSubscribe(false);

        window.confirm(res.payload.data);
      });
    }
  };

  const onClickAdvanced = () => {
    setAdvancedPost(!advancedpost)
  }

  const [richtextvalue, onRichTextChange] = useState(chat_reply_msg);

  useEffect(() => {
    setValue('chat_reply_msg_advance', richtextvalue)
  }, [richtextvalue])

  // useEffect(() => {
  //   setValue('chat_type', advancedpost)
  // }, [advancedpost])

  return (
    <div className='menu-nav'>
      <div className='dropdown-container' tabIndex={-1}>
        <div className='three-dots'>
          <i className='fa-solid fa-ellipsis-vertical'></i>
        </div>

        {/* for all users thank you,bookmark,remove,DM show menus*/}
        {/* for shahid,admin,914,46770  edit,delete,lock,bump,neverbump,auto bump,sticky, thankyou  show */}
        {/* for 18,914  remove image option  show menus*/}
        {/* if userrank > 84 than flag option will show*/}
        {/*Tag option will manage from admin panel means who user have right his profile will show these option*/}
        {/*MovePost option will manage if tick from admin panel, and user_id (18,914) show  and show on logged user own post */}

        <div className='dropdown'>
          {showIcon == true && (
            <div className='img-drop'>
              <ul className='navbar-nav flex-column p-0 m-0'>
                <li className='nav-item' onClick={() => onThankyou(LoungeId)}>
                  <div className='nav-icon'>
                    <i className='fa-solid fa-star' />
                  </div>
                  {thankYou == true ? (
                    <span>Thanked</span>
                  ) : (
                    <span>Thank You!</span>
                  )}
                </li>

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
                    if (
                      window.confirm(
                        'This will send you email notifications (only if your email is correct in your profile) when people commnet on this post. to unsubscribe go to your MyMW page and click on Subscriptions.'
                      )
                    )
                      subscribePost(LoungeId);
                  }}
                >
                  <div className='nav-icon'>
                    <i className='fa-solid fa-bell' />
                  </div>

                  {subscribe == true ? (
                    <span>Subscribe</span>
                  ) : (
                    <span>Unsubscribe</span>
                  )}
                </li>

                <li
                  className='nav-item'
                  onClick={() => onRemove(LoungeId, 'P')}
                >
                  <div className='nav-icon'>
                    <i className='fa-solid fa-remove' />
                  </div>
                  <span>
                    Remove
                    <p style={{ fontSize: '8px' }}>Hide From Your Timeline</p>
                  </span>
                </li>

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
                      <span onClick={() => onRemove(LoungeId, 'D')}>
                        Delete
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    {/*        {DM == 'true' ? (
                      <>
                        <li className='nav-item'>
                          <div className='nav-icon'>
                            <MdMessage></MdMessage>
                          </div>
                          <span
                            onClick={() => openDm(userid, username, LoungeId)}
                          >
                            DM
                          </span>
                        </li>
                      </>
                    ) : (
                      <></>
                    )} */}

                    {/* need to confirm from client what boundation for dm 
                    now display to all users  */}
                    <li className='nav-item'>
                      <div className='nav-icon'>
                        <MdMessage></MdMessage>
                      </div>
                      <span onClick={() => openDm(userid, username, LoungeId)}>
                        DM
                      </span>
                    </li>
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

                {/*      {loginuserid == '18' ||
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

                {TAG == 'true' ? (
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
                )}
                {/* 
                {loginuserid == userid ||
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
                )} */}

                {MP == 'true' ? (
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

                {SP == 'true' ? (
                  <>
                    <li className='nav-item'>
                      <div className='nav-icon'>
                        <i className='fa fa-cogs' />
                      </div>
                      <span
                        onClick={(e) => {
                          if (
                            window.confirm(
                              'Do you want to Stick/Unstick this post?'
                            )
                          )
                            postStick(getStick, LoungeId);
                        }}
                      >
                        {getStick}
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
                
                {editType != true && (loginuserid == '18' ||
                loginuserid == '914' ||
                loginuserid == '38' ||
                loginuserid == '46770') && 
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
                      <span onClick={() => onRemove(LoungeId, 'D')}>
                        Delete
                      </span>
                    </li>
                  </>
                } 

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
                          if (
                            window.confirm(
                              'Do you want to Lock/Unlock this post?'
                            )
                          )
                            isLock(e, LoungeId, islock);
                        }}
                      >
                        {islock}
                      </span>
                    </li>

                    <li className='nav-item'>
                      <div className='nav-icon'>
                        <i className='fa fa-plus-square' />
                      </div>
                      <span
                        onClick={(e) => {
                          if (
                            window.confirm(
                              'Do you want to to make this post Bump?'
                            )
                          )
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
                          if (
                            window.confirm(
                              'Do you want to to make this post Never Bump?'
                            )
                          )
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
                          if (
                            window.confirm(
                              'Do you want to to make this post  Bump?'
                            )
                          )
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
                          if (
                            window.confirm(
                              'Do you want to to make this post Bump?'
                            )
                          )
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
              {onedit != '' ? (
                <h6 style={{ fontSize: '1rm', fontWeight: 400, color: 'red' }}>
                  Edit Post
                </h6>
              ) : (
                <h6 style={{ fontSize: '1rm', fontWeight: 400, color: 'red' }}>
                  Report
                </h6>
              )}

              <div className='close-p' onClick={closeModal}>
                <i className='fa fa-close my-b' />
              </div>

              <div className='boxwidth'>
                <div className='box-ttt'>
                  {onedit != '' ? (
                    <div>
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
            
                    </div>
                        
                  ) : (
                    <textarea
                      rows={3}
                      cols={60}
                      placeholder='write reason for reporting'
                      {...register('ReasonForReport')}

                      /* {...register("Type")} {...register("LoungeId")} */
                    />
                  )}

                  {/*    <input type='hidden' setValue={Type} {...register('Type')} />
                  <input
                    type='hidden'
                    setValue={LoungeId}
                    {...register('LoungeId')}
                  /> */}
                  <div className='mw-post text-center'>
                    {isLoading == true ? (
                      <input className='MW-btn' type='Submit' value='Edit' style={{backgroundColor: '#0d6efd'}} />
                    ) : (
                      <input className='MW-btn' type='Submit' value='Edit' style={{backgroundColor: '#0d6efd'}} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
      {/*  flag  and edit post modal end  */}

      {/* move post starts here  */}

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
