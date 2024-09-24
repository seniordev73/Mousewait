import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux/store';
import {
  postLoungeCommentReplyWdw,
  fetchStickerLounges,
  addSticker,
  likeCommentReply,
} from '../redux/lounges/slice';
import stickerImage from '../assets/img/stickers.jpg';
import { StickerTabs } from '../components/StickerTabs';
import { selectLounges } from '../redux/lounges/selectors';

import imageicon from '../assets/img/chart-icon1.png';
import emojiicon from '../assets/img/chart-icon2.png';
import { RichTextEditor } from '@mantine/rte';
import imageiconh from '../assets/img/chart-icon1h.png';
import emojiiconh from '../assets/img/chart-icon2h.png';
import { EditBox } from '../components/EditBox';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeUserLounge } from '../redux/lounges/slice';
import { LikeCommentReply } from '../components/LikeCommentReply';
import { GET_BASE_URL_IMAGE, dTime } from '../constants/apiEndpoints';
import { GET_BASE_URL } from '../constants/apiEndpoints';
import axios, { AxiosResponse } from 'axios';
import  { CommentReplyBox } from './WdwCommentReplyBox';

type CommentReplyPropsType = {
  replyData: any;
  replyShow: boolean;
  chatId: any;
  chat_reply_id: any;
  stickerData: any;
};
type FormData = {
  chat_reply_msg: string;
  chat_id: number;
  chat_reply_id: number;
};

export const CommentReply: React.FC<CommentReplyPropsType> = ({
  replyData,
  replyShow,
  chatId,
  chat_reply_id,
  stickerData,
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const [commentData, SetCommentData] = useState<any | []>(replyData);
  const [showSticker, SetShowSticker] = useState<any | string>(false);
  const token = localStorage.getItem('token');
  const loginuserid = localStorage.getItem('user_id');

  const textRef = useRef(null);
  const [ filterUser, setFilterUser ] = useState([]);
  const [ searchText, setSearchText ] = useState('');

  const onClickSticker = (data: any) => {
    let editor = (textRef.current  as any ).getEditor();
    var range = editor.getSelection();
    let position = range ? range.index : editor.getLength()-1;
    
    var rte = document.getElementById('my-rich-text-editor'); // Replace with the ID of your Rich Text Editor
    rte?.focus();
    var imageSrc = data;
    editor.insertEmbed(position, 'image', imageSrc);
    editor.setSelection(position + 1, 0);
  }

  const onSubmit = (data: any) => {
    const chat_reply_msg = getValues('chat_reply_msg');
    chat_reply_msg != ''
      ? dispatch<any>(postLoungeCommentReplyWdw(data)).then((res: any) => {
          reset();
          SetCommentData(res.payload.data.replydata);
          setText('');
          // dispatch(fetchLoungeDetails({ LoungeId }))
        })
      : alert('Please enter comment');
  };

  function converTime(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
    return formattedDate;
  }


  const modules = {
    toolbar: false,
  };
  /*   useEffect(() => {
    register('chat_reply_msg', { required: true, minLength: 11 });
  }, [register]);

  const onEditorStateChange = (editorState: any) => {
    setValue('chat_reply_msg', editorState);
  }; */

  const [text, setText] = useState('');

  useEffect(() => {
    setValue('chat_reply_msg', text);
    if(text == '' || text == '<p><br></p>') 
      setFilterUser([]);
  }, [text]);


  const openSticker = () => {
    SetShowSticker(!showSticker);
  };
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
  const [Notify, setIsNotify] = useState<any | string>();
  const [RemoveType, setRemoveType] = useState<any | string>('R');

  const [editbox, SetEditBox] = useState<any | string>(false);
  const showEditBox = () => {
    SetEditBox(!editbox);
  };

  /* const likeCommnetAndReply = (
    chat_id: any,
    comment_id: any,
    reply_id: any,
    commnet_userid: any,
    type: any,
    page: any
  ) => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      console.log('like');

      dispatch<any>(
        likeCommentReply({
          chat_id,
          comment_id,
          reply_id,
          commnet_userid,
          type,
          page,
        })
      ).then((res: any) => {
        window.location.reload();
        Notify(toast(res.payload.data.error));
      });
    }
  }; */

  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z0-9_\-\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#', ' '],
      source: (
        searchTerm: any,
        renderList: any,
        mentionChar: any,
        callback: any
      ) => {
        setSearchText(searchTerm);
        if(mentionChar == ' ')
          setFilterUser([]);
        else if (searchTerm.length > 0) {
          axios
            .get(GET_BASE_URL + '/backend/api/v1/getUser?name=' + searchTerm)
            .then((response: any) => {
              const includesSearchTerm = response.data.data.filter(
                (item: any) =>
                  item.value.toLowerCase().includes(searchTerm.toLowerCase())
              );

              setFilterUser(includesSearchTerm);
              renderList(includesSearchTerm);
            });
        }
      },
    }),
    []
  );

  const onChangeFilterUser = (item: any) => {

    let editor = (textRef.current  as any ).getEditor();
    var range = editor.getSelection();
    let position = range ? range.index : editor.getLength()-1;
    var oldText = editor.getText(position);
    var newText = editor.getText(0, position-searchText.length) + item['value'] + oldText;
    editor.setText(newText);
    editor.setSelection(position + item['value'].length - searchText.length, 0);
  }

  return (
    <>
      {replyShow == true && (
        <div>
          <form
            className='space-y-6'
            onSubmit={handleSubmit(onSubmit)}
            method='POST'
          >
            <div className='com-box-main' style={{'position': 'relative'}}>
              <div className="tagUserList" style={{'position': 'absolute', 'bottom': '60px'}}>
                {
                  filterUser.map((item, index) => {
                    return (
                      <>
                      <div className="tagUserItem">
                        <div onClick={() => onChangeFilterUser(item)} className="button">
                          <div>
                            <img
                              style={{ verticalAlign: 'middle' }}
                              src={
                                GET_BASE_URL_IMAGE +
                                '/disneyland/images/thumbs/' +
                                item['image']
                              }
                              className='com-imggg'
                            />
                          </div>
                          
                          <div>
                            {item['value']}
                          </div>
                        </div>
                      </div>
                      </>
                    )
                  })
                }
                </div>

              <div className='com-box d-flex'>
                <RichTextEditor
                  id='rte'
                  placeholder='Add your magic...'
                  mentions={mentions}
                  value={text}
                  onChange={setText}
                  controls={[[]]}
                  ref={textRef}
                />  

                <input
                  type='hidden'
                  readOnly={true}
                  {...register('chat_id')}
                  defaultValue={chatId}
                />
                <input
                  type='hidden'
                  readOnly={true}
                  {...register('chat_reply_id')}
                  defaultValue={chat_reply_id}
                />

                <div className='icon-ic d-flex'>
                  <div className='icon-ic0' onClick={handleSubmit(onSubmit)}>
                    {/*    <img
                      src={imageicon}
                      className='img-fluid ic1'
                      onClick={handleSubmit(onSubmit)}
                      alt='img'
                    /> */}
                    {/*    <img
                      src={imageiconh}
                      className='img-fluid ic1'
                      onClick={handleSubmit(onSubmit)}
                      alt='img'
                    /> */}
                  </div>
                  <div className='icon-ic1' onClick={openSticker}>
                    {/*     <img
                      src={emojiicon}
                      className='img-fluid ic2'
                    
                      alt='img'
                    />
                    <img
                      src={emojiiconh}
                      className='img-fluid ic2'
                      onClick={openSticker}
                      alt='img'
                    /> */}
                  </div>
                </div>
              </div>
              {/* {showSticker ==true &&
    <div className="post">
     {token!=null ? <input type="Submit"  defaultValue="Post"/> 
       :<input type="Submit" disabled defaultValue="Post"/> }
     
    </div>
   } */}
            </div>
          </form>
          {showSticker == true && (
            <div>
              <StickerTabs tabData={stickerData} onClickSticker = {onClickSticker}/>
            </div>
          )}{' '}
        </div>
      )}
      {commentData.map((rep: any, index2: any) => (

        <CommentReplyBox replyData={rep} key={index2} stickerData={stickerData}></CommentReplyBox>
      ))}
    </>
  );
};
