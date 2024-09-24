import { useState, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CommentReply } from './CommentReply';
import stickerImage from '../assets/img/stickers.jpg';
import { useForm } from 'react-hook-form';
import { StickerTabs } from '../components/StickerTabs';
import ReactQuill from 'react-quill';
import { selectLounges } from '../redux/lounges/selectors';
import imageicon from '../assets/img/chart-icon1.png';
import emojiicon from '../assets/img/chart-icon2.png';
import { MentionsInput, Mention } from 'react-mentions';
import imageiconh from '../assets/img/chart-icon1h.png';
import emojiiconh from '../assets/img/chart-icon2h.png';
import { RichTextEditor } from '@mantine/rte';
import { fetchUser } from '../redux/lounges/slice';
import { useAppDispatch } from '../redux/store';
import axios, { AxiosResponse } from 'axios';
import { GET_BASE_URL } from '../constants/apiEndpoints';
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';


type CommenBoxPropsType = {
  chatId: any;
  onSubmit: any;
  register: any;
  handleSubmit: any;
  setValue: any;
  stickerData: any;
};

type FormData = {
  chat_msg: string;
  chat_id: number;
};

export const CommentBox: React.FC<CommenBoxPropsType> = ({
  chatId,
  onSubmit,
  register,
  handleSubmit,
  setValue,
  stickerData,
}) => {
  // const { register, setValue, handleSubmit,getValues, formState: { errors } } = useForm<FormData>();
  const [showSticker, SetShowSticker] = useState<any | string>(false);
  const token = localStorage.getItem('token');

  const [text, setText] = useState('');
  
  const textRef = useRef(null);
  
  const [ filterUser, setFilterUser ] = useState([]);
  const [ searchText, setSearchText ] = useState('');

  useEffect(() => {
    setValue('chat_msg', text);
    if(text == '' || text == '<p><br></p>') 
      setFilterUser([]);
  
    }, [text]);

  
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

  let navigate = useNavigate();
  const openSticker = () => {
    if (token == null) {
      navigate('/disneyland/login');
    } else {
      SetShowSticker(!showSticker);
    }
  };

  const dispatch = useAppDispatch();
  const [people, SetPeople] = useState<any | string>([]);

  const tags = [
    { id: 1, value: 'JavaScript' },
    { id: 2, value: 'TypeScript' },
    { id: 3, value: 'Ruby' },
    { id: 3, value: 'Python' },
  ];

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

          const list = mentionChar === '@' ? people : tags;
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
    <div >
      
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

            <div className='icon-ic d-flex'>
              <div className='icon-ic0' onClick={handleSubmit(onSubmit)}></div>
              <div className='icon-ic1' onClick={openSticker}></div>
            </div>
          </div>
        </div>
      </form>
      {showSticker == true && (
        <div>
          <StickerTabs tabData={stickerData} onClickSticker={onClickSticker}/>
        </div>
      )}
    </div>
  );
};
