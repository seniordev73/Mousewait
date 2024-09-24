import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux/store';
import {
  postLoungeCommentReply,
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
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';
import axios, { AxiosResponse } from 'axios';
import { GET_BASE_URL } from '../constants/apiEndpoints';


type CommentReplyBoxPropsType = {
  replyData: any;
  stickerData: any;
};
type FormData = {
  chat_reply_msg: string;
  chat_id: number;
  chat_reply_id: number;
};

export const CommentReplyBox: React.FC<CommentReplyBoxPropsType> = ({
  replyData,
  stickerData
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
  const { stickerPickItems } = useSelector(selectLounges);

  const [commentData, SetCommentData] = useState<any | []>(replyData);
  const [showSticker, SetShowSticker] = useState<any | string>(false);
  const [stickerSelection, SetStickerSelection] = useState<any | string>(null);
  const loginuserid = localStorage.getItem('user_id');
  useEffect(() => {
    SetStickerSelection(stickerPickItems.toString());
  }, [stickerPickItems]);

  const textRef = useRef(null);

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

  const [text, setText] = useState('');
  useEffect(() => {
    setValue('chat_reply_msg', text);
  }, [text]);

  const openSticker = () => {
    SetShowSticker(!showSticker);
  };

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
  const onRemove = (ban_chat_id: any) => {
    dispatch<any>(removeUserLounge({ ban_chat_id, RemoveType })).then(
      (res: any) => {
        window.location.reload();
        // Notify(toast('Comment Removed'));
      }
    );
  };

  const [editbox, SetEditBox] = useState<any | string>(false);
  const showEditBox = () => {
    SetEditBox(!editbox);
  };

  // const formattedMessage = (message: string) => {
  //   var domParser = new DOMParser();
  //   var doc = domParser.parseFromString(message, 'text/html');
  //   var links = doc.querySelectorAll('.mention');
  //   links.forEach(function (linkTag: any) {
  //     var aTag = document.createElement('a');
  //     // aTag.href = `https://mousewait.xyz/mousewaitnew/disneyland/user/${linkTag.dataset.id}/mypost`;
  //     aTag.href = `../../user/${linkTag.dataset.id}/mypost`;

  //     aTag.style.color = '#0000EE';
  //     aTag.style.marginRight = '3px';
  //     aTag.innerHTML = linkTag.innerHTML;
  //     linkTag.parentNode.replaceChild(aTag, linkTag);
  //   });
  //   return doc.body.innerHTML;
  // };

  const [formatedMsg, setFormatedMsg] = useState(replyData.chat_reply_msg);

  useEffect(() => {

    var domParser = new DOMParser();
    var doc = domParser.parseFromString(formatedMsg, 'text/html');
    var msg = doc.body.innerHTML;
    console.log('formatedMsg', msg)
    
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
      setFormatedMsg(msg)
    }
    convert();
  }, [replyData.chat_reply_msg]);

  return (
    <>      
      <div className='mid-comm-s mid-comm-s2'>
        <div className='comm-bo d-flex'>
          <div className='small-c'>
            <a href=''>
              <img
                style={{
                  verticalAlign: 'middle',
                  height: '35px',
                  width: '35px',
                  borderRadius: '50%',
                }}
                src={
                  GET_BASE_URL_IMAGE +
                  '/disneyland/images/thumbs/' +
                  replyData.replyuser.image
                }
                className='com-imggg'
              />
            </a>
          </div>
          <div className='comm-c d-flex'>
            <p className='commentlist' style={{ marginTop: '-1rem' }}>
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '1rm',

                  marginTop: '-1rem',
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
                }}
                to={`/disneyland/user/${replyData.replyuser?.user_id}/mypost`}
              >
                {replyData.replyuser?.user_name}
              </Link>

              <span className='com-tt'>
                <span>{replyData.replyuser?.rank}</span>
                <span
                  style={{
                    marginLeft: '.5rem',
                  }}
                >
                  #{replyData.replyuser?.position}
                </span>

                <span
                  style={{
                    marginLeft: '.5rem',
                    marginRight: '1rem',
                    fontSize: 'smaller',
                  }}
                >
                  {converDate(replyData?.chat_reply_date)}
                </span>
              </span>
              <br />
              <span className='co-l'>
                <span>FLAG</span>

                <>
                  <LikeCommentReply
                    likecount={replyData.no_of_likes}
                    chat_id={replyData.chat_id}
                    comment_id={replyData.chat_reply_id}
                    reply_id={replyData.id}
                    commnet_userid={replyData.replyuser.user_id}
                    type={'R'}
                    page={'DL'}
                  />
                </>

              </span>

              <>
                {replyData.replyuser.user_id == loginuserid ? (
                  <span className='co-l'>
                    <span onClick={showEditBox}>EDIT</span>
                    <span onClick={() => onRemove(replyData.id)}>DELETE</span>
                  </span>
                ) : (
                  <></>
                )}
              </>
            </p>
          </div>
        </div>
        <EditBox
          replyData={''}
          id={replyData.id}
          chatId={replyData.chat_id}
          chat_reply_id={replyData.chat_reply_id}
          chat_reply_msg={replyData.chat_reply_msg}
          stickerData={stickerData}
          editbox={editbox}
          type={'R'}
        />
      </div>
    </>
  );
};
