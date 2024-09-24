import { useEffect, useState, useRef } from 'react';
// @ts-ignore
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import { Link, useNavigate } from 'react-router-dom';
import { postLounge, postLoungeWdw, fetchLounges } from '../redux/lounges/slice';
import Modal from 'react-modal';
import { useAppDispatch } from '../redux/store';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectLounges } from '../redux/lounges/selectors';
import CircularProgress from '@mui/material/CircularProgress';
import { isMobile } from 'react-device-detect';
import Post from '../assets/img/h-p.png';
import { getValue } from '@testing-library/user-event/dist/utils';
import { BiWindows } from 'react-icons/bi';
import { RichTextEditor, DEFAULT_CONTROLS  } from '@mantine/rte';

// import ProgressBar from "@ramonak/react-progress-bar";
type LoungeBoxPropsType = {
  setVisible: any;
  isVisible: any;
  onCloseMenu: any;
};

Modal.setAppElement('#root');

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

export const LoungeBox: React.FC<LoungeBoxPropsType> = ({
  setVisible,
  isVisible,
  onCloseMenu
}) => {
  const [modalIsOpen, setIsOpen] = useState(isVisible);

  const [land, setLand] = useState<number | string>('7');

  const [file, setFile] = useState<number | string>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>();
  const loungland = localStorage.getItem('loungeland');
  const club333 = localStorage.getItem('club333');
  const [text, setText] = useState('');

  let subtitle: any;
  function openModal() {
    onCloseMenu();
    setIsOpen(true);
  }

  let navigate = useNavigate();

  const { register, setValue, getValues, formState: {  errors } } = useForm<{'chat_img': any, 'chat_room_id': any, 'chat_msg': any}>({defaultValues: {'chat_img': '', 'chat_room_id': '', 'chat_msg': ''}});

  const token = localStorage.getItem('token');
  const post_editor = localStorage.getItem('editor');

  const inputFile = useRef<HTMLInputElement | any>();

  function handleImageChange(e: any) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    if (file.type.match('image.*')) {
      reader.onloadend = () => {
        let result = reader.result;

        setFile(file);
        setImagePreviewUrl(result);

        setValue('chat_img', result);
      };

      reader.readAsDataURL(file);
    }
  }

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  useEffect(() => {
    setValue('chat_room_id', land);
  }, [land]);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<any | string>(false);

  const { items, status, sortByTime } = useSelector(selectLounges);

  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );

  const [ advancedpost, setAdvancedPost ] = useState(false);
  
  useEffect(() => {
    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  function closeModal() {
    setLand('');
    setImagePreviewUrl('');
    setValue('chat_img', '');
    setValue('chat_msg', '');
    setVisible(false);
    setIsOpen(false);
  }


  const onPostClick = () => {

    if (token == null) {
      navigate('/disneyland/login');
    } else {
      setIsLoading(true);
      var data;
      if(!advancedpost)
        data = {'chat_room_id': getValues('chat_room_id'), 'chat_msg': text, 'chat_img': getValues('chat_img')};
      else data = {'chat_room_id': getValues('chat_room_id'), 'chat_msg': richtextvalue, 'chat_img': ''};
      if(land == 5 || land == 6 || land == 10) {
        if(land == 10) data['chat_room_id'] = 0;
        else data['chat_room_id'] = land - 4;
        dispatch<any>(postLoungeWdw(data)).then((res: any) => {
          setIsLoading(false)
          closeModal();
          if (res.payload.data.message != undefined) {
            window.alert(res.payload.data.message);
          }
          window.location.reload();
        });
      }
      else {
        dispatch<any>(postLounge(data)).then((res: any) => {
          setIsLoading(false)
          closeModal();
          if (res.payload.data.message != undefined) {
            window.alert(res.payload.data.message);
          }
          window.location.reload();        
        });
      }
    }
    setIsLoading(true);
  }

  const onClickAdvanced = () => {
    setAdvancedPost(!advancedpost)
  }

  const [richtextvalue, onRichTextChange] = useState('');

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <form
          className='space-y-6'
          style={{height: '600px'}}
        >
          <div className='row'>
            <div className='box-t-1'>
              <h6>New Post</h6>
              <div className='close-p' onClick={closeModal}>
                <i className='fa fa-close my-b' />
              </div>
              <div className='boxwidth'>
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    style={{ width: 100, height: 100 }}
                  />
                ) : (
                  <p>
                    📷👨‍👩‍👧‍👦💰👍 Hey there! <br/>Share your Disney pics in the Lounge and earn MouseWait Credits! 👍📷😍 Just make sure they're family-friendly, and please don't post Googled pictures unless they're related to a news story.<br></br>🚫🔍 Thanks for being a part of our magical community! 🏰✨👸
                  </p>
                )}

                {post_editor == 'true' && (
                  <div className="advance-radio-gruop">
                    <div onClick={() => setAdvancedPost(false)}>
                      <input type="radio" id="default" checked={!advancedpost} onClick={onClickAdvanced}></input>
                      <label htmlFor="default">Default Post</label>
                    </div>
                    
                    <div onClick={() => setAdvancedPost(true)}>
                      <input type="radio" id="advanced" checked={advancedpost} onClick={onClickAdvanced}></input>
                      <label htmlFor="advanced">Advanced Post</label>
                    </div>
                  </div>
                )}

                {advancedpost != true ? (
                  <>
                    <div className='plus-p'>
                      <i className='fa fa-plus my-b' onClick={onButtonClick} />

                      <input
                        id='fileinput'
                        ref={inputFile}
                        className='fileInput'
                        type='file'
                        onChange={(e) => handleImageChange(e)}
                      />
                    </div>

                    <div className='box-ttt'>
                      {/* <label for="story" class="w-50 m-auto justify-content-start">Tell us your story</label> */}
                      <div className='advance-chatmsg'>
                        <textarea
                          rows={3}
                          cols={60}
                          value={text}
                          onChange={e => setText(e.target.value)}
                          placeholder='write a caption '
                          disabled={isLoading}
                          // {...register('chat_msg')}
                        />
                        <input
                          type='hidden'
                          // setValue={land}
                          {...register('chat_room_id')}
                        />
                        <input
                          type='hidden'
                          // setValue={file}
                          {...register('chat_img')}
                        />
                      </div>
                    </div>
                  </>
                ) : 
                  <>
                    <div className="advance-editor">
                      <RichTextEditor 
                      value={richtextvalue}
                      onChange={onRichTextChange}
                      controls={DEFAULT_CONTROLS}
                      />
                    </div>
                  </>
                }

                <div>
                  <div className='box-li'>
                    <ul className='m-0 p-0' style={{ cursor: 'pointer' }}>
                      <li
                        style={land == 7 ? { backgroundColor: '#9BB8EF' } : {}}
                        onClick={() => setLand('7')}
                      >
                        DISNEYLAND TALK
                      </li>
                      <li
                        style={land == 1 ? { backgroundColor: '#9BB8EF' } : {}}
                        onClick={() => setLand('1')}
                      >
                        DISNEYLAND REALTIME
                      </li>
                      <li
                        style={land == 0 ? { backgroundColor: '#9BB8EF' } : {}}
                        onClick={() => setLand('0')}
                      >
                        LAND HUB{' '}
                      </li>

                      {loungland != '' ? (
                        <li
                          style={
                            land == 3 ? { backgroundColor: '#9BB8EF' } : {}
                          }
                          onClick={() => setLand('3')}
                        >
                          LOUNGE.LAND{' '}
                        </li>
                      ) : (
                        <></>
                      )}

                      {club333 != '' ? (
                        <li
                          style={
                            land == 4 ? { backgroundColor: '#9BB8EF' } : {}
                          }
                          onClick={() => setLand('4')}
                        >
                          CLUB 333{' '}
                        </li>
                      ) : (
                        <></>
                      )}

                      <li
                        style={land == 5 ? { backgroundColor: '#9BB8EF' } : {}}
                        onClick={() => setLand('5')}
                      >
                        WDW TALK
                      </li>
                      <li
                        style={land == 6 ? { backgroundColor: '#9BB8EF' } : {}}
                        onClick={() => setLand('6')}
                      >
                        WDW REALTIME
                      </li>

                      <li
                        style={land == 10 ? { backgroundColor: '#9BB8EF' } : {}}
                        onClick={() => setLand('10')}
                      >
                        WDW HUB{' '}
                      </li>

                    </ul>
                  </div>
                  <div className='mw-post text-center'>
                    <Link to='/disneyland/lounge'></Link>

                    {isLoading == true ? (
                      <CircularProgress />
                    ) : (
                      <>
                        {advancedpost ? (
                          <input className='MW-btn' type='button' value="Post" style={{backgroundColor: (richtextvalue == '' ||richtextvalue == '<p><br></p>') ? '#d8cccc' : '#0d6efd'}} disabled={richtextvalue == '' || richtextvalue == '<p><br></p>' || isLoading} 
                          onClick={onPostClick}
                        />
                        ) : (
                          <input className='MW-btn' type='button' value="Post" style={{backgroundColor: text == '' ? '#d8cccc' : '#0d6efd'}} disabled={text == '' || isLoading} 
                          onClick={onPostClick}
                        />
                        )}
                      </>                      
                      // <input className='MW-btn' type='button' value="Post" style={{backgroundColor: text == '' ? '#d8cccc' : '#0d6efd'}} disabled={text == '' || isLoading} 
                      // onClick={onPostClick}
                      // />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      {window.innerWidth < 1024 ? (
        <li className='nav-item last-li my-link' onClick={openModal}>
          <div className='nav-icon'>
            <img src={Post} className='img-fluid' alt='img' />
            <a style={{ marginLeft: '15px' }} href='javascript:void(0)'>
              Post to the Lounge
            </a>
          </div>
        </li>
      ) : (
        <div className='plus-show-btn' onClick={openModal}>
          <button className='plus-show'>
            <i className='fa fa-plus plus-i'></i>
          </button>
        </div>
      )}
    </div>
  );
};
