import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux/store';
import {
  postLoungeCommentReply,
  postLoungeCommentEdit,
  postLoungeCommentEditWdw,
  fetchLoungeDetails,
  fetchStickerLounges,
  addSticker,
} from '../redux/lounges/slice';
import stickerImage from '../assets/img/stickers.jpg';
import { StickerTabs } from '../components/StickerTabs';
import { selectLounges } from '../redux/lounges/selectors';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeUserLounge } from '../redux/lounges/slice';

import axios, { AxiosResponse } from 'axios';
import { GET_BASE_URL } from '../constants/apiEndpoints';
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';

type EditBoxPropsType = {
  replyData: any;

  chatId: any;
  chat_reply_id: any;
  stickerData: any;
  id: any;
  editbox: boolean;
  type: string;
  chat_reply_msg: string;
};
type FormData = {
  chat_reply_msg: string;
  chat_id: number;
  chat_reply_id: number;
  type: string;
  id: number;
};

export const EditBox: React.FC<EditBoxPropsType> = ({
  replyData,

  chatId,
  chat_reply_id,
  stickerData,
  editbox,
  type,
  chat_reply_msg,
  id,
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useAppDispatch();

  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\-sÅÄÖåäö_]*$/,
      mentionDenotationChars: ['@', '#', ' '],
      source: (
        searchTerm: any,
        renderList: any,
        mentionChar: any,
        callback: any
      ) => {
        setSearchText(searchTerm);
        // console.log('searchTerm', searchTerm)
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

  const modules = {
    mention: mentions,
    toolbar: false,
  };
  //const [commentData, SetCommentData] = useState<any | []>(replyData);
  const [showSticker, SetShowSticker] = useState<any | string>(false);
  const [stickerSelection, SetStickerSelection] = useState<any | string>('');
  //const [edittype, SetEditType] = useState<any | string>('C');
  const token = localStorage.getItem('token');
  const loginuserid = localStorage.getItem('user_id');

  const textRef = useRef(null);
  const [ filterUser, setFilterUser ] = useState([]);
  const [ searchText, setSearchText ] = useState('');

  const onClickSticker = (data: any) => {
    setFilterUser([]);

    let editor = (textRef.current  as any ).getEditor();
    var range = editor.getSelection();
    let position = range ? range.index : editor.getLength()-1;
    
    var rte = document.getElementById('my-rich-text-editor'); // Replace with the ID of your Rich Text Editor
    rte?.focus();
    var imageSrc = data;
    editor.insertEmbed(position, 'image', imageSrc);
    editor.setSelection(position + 1, 0);
  }

  useEffect(() => {
    if(stickerSelection == '' || stickerSelection == '<p><br></p>') 
      setFilterUser([]);
  }, [stickerSelection])

  if (editbox == true) {
    if (stickerSelection == '') {
      SetStickerSelection(chat_reply_msg);
    }
  }

  const openSticker = () => {
    SetShowSticker(!showSticker);
  };

  const { LoungeId, url } = useParams();
  const [Notify, setIsNotify] = useState<any | string>();

  const onSubmit = (data: any) => {
    data['chat_reply_msg'] = stickerSelection; 
     /* return false; */
    
     if(type === 'WC' || type === 'WR') {
      data['type'] = type.slice(1);
      stickerSelection != '<p><br></p>' && stickerSelection != ''
      ? dispatch<any>(postLoungeCommentEditWdw(data)).then((res: any) => {
          reset();
          SetStickerSelection(null);
          window.location.reload();
          // Notify(toast('Updated Successfully'));
        })
      : alert('Please enter comment');
     }
     else {
      stickerSelection != '<p><br></p>' && stickerSelection != ''
        ? dispatch<any>(postLoungeCommentEdit(data)).then((res: any) => {
            reset();
            SetStickerSelection(null);
            window.location.reload();
            // Notify(toast('Updated Successfully'));
          })
        : alert('Please enter comment');
     }
  };

 
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
      {editbox == true && (
        <div>
          <div
            className='editbox'
            style={{
              padding: '10px', 'position': 'relative'
            }}
          >
            {type === 'C' || type === 'WC' ? (
              <h6 style={{ textAlign: 'center', color: 'red' }}>
                Edit
              </h6>
            ) : (
              <h6 style={{ textAlign: 'center', color: 'red' }}>
                Reply
              </h6>
            )}           

            <form
              className='space-y-6'
              onSubmit={handleSubmit(onSubmit)}
              method='POST'
            >
              <div className='com-box-main' style={{position: 'relative'}}>

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
                  <ReactQuill
                    theme='snow'
                    className='form-control'
                    modules={modules}
                    onChange={SetStickerSelection}
                    value={stickerSelection}
                    placeholder='Add your magic...'
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
                  <input
                    type='hidden'
                    readOnly={true}
                    {...register('type')}
                    defaultValue={type}
                  />
                  <input
                    type='hidden'
                    readOnly={true}
                    {...register('id')}
                    defaultValue={id}
                  />
                  <div className='icon-ic d-flex'>
                    <div
                      className='icon-ic0'
                      onClick={handleSubmit(onSubmit)}
                    ></div>
                    <div className='icon-ic1' onClick={openSticker}></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {showSticker == true && (
            <div>
              <StickerTabs tabData={stickerData} onClickSticker={onClickSticker}/>
            </div>
          )}{' '}
        </div>
      )}
    </>
  );
};
