import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux/store';
import {
  postLoungeCommentReply,
  postLoungeCommentEdit,
  fetchLoungeDetails,
  fetchStickerLounges,
  addSticker,
} from '../redux/lounges/slice';
import stickerImage from '../assets/img/stickers.jpg';
import { StickerTabs } from '../components/StickerTabs';
import { selectLounges } from '../redux/lounges/selectors';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeUserLounge } from '../redux/lounges/slice';

type FlagBoxPropsType = {
  id: any;
  editbox: boolean;
  type: string;
  chat_reply_msg: string;
  menutype: boolean;
};
type FormData = {
  ReasonForReport: string;
  chat_reply_msg: string;
  /* chat_id: number;
  chat_reply_id: number;
  type: string;
  id: number; */
};

export const FlagBox: React.FC<FlagBoxPropsType> = ({
  editbox,
  type,
  chat_reply_msg,
  id,
  menutype,
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
  const token = localStorage.getItem('token');
  const loginuserid = localStorage.getItem('user_id');
  const { LoungeId, url } = useParams();
  const [Notify, setIsNotify] = useState<any | string>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [Type, setFlagType] = useState<any | string>('C');
  const [LoungeIdd, setLoungeId] = useState<any | string>(LoungeId);

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

  let subtitle: any;

  if (menutype == true) {
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
  // const { register, setValue, handleSubmit,getValues, formState: { errors } } = useForm<FormData>();

  /*   useEffect(() => {
    setValue('Type', Type);
  }, [Type]);

  useEffect(() => {
    setValue('LoungeId', LoungeIdd);
  }, [LoungeIdd]); */

  // console.log(menutype);

  const onSubmit =()=>{
    alert('submit')
  }

  return (
    <>
      <div>
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
                {/*     {onedit != '' ? (
                    <h6
                      style={{ fontSize: '1rm', fontWeight: 400, color: 'red' }}
                    >
                      You Are Editing Post
                    </h6>
                  ) : (
                    <h6
                      style={{ fontSize: '1rm', fontWeight: 400, color: 'red' }}
                    >
                      You Are Reporting Post
                    </h6>
                  )} */}

                <div className='close-p' onClick={closeModal}>
                  <i className='fa fa-close my-b' />
                </div>

                {/*    <div className='boxwidth'>
                    <div className='box-ttt'>
                      {onedit != '' ? (
                        <textarea
                          rows={3}
                          cols={60}
                          {...register('chat_reply_msg')}
                          defaultValue={chat_reply_msg}
                        />
                      ) : (
                        <textarea
                          rows={3}
                          cols={60}
                          placeholder='write reason for reporting'
                          {...register('ReasonForReport')}
                        />
                      )}

                      <div className='mw-post text-center'>
                        {isLoading == true ? (
                          <input
                            className='MW-btn'
                            type='Submit'
                            value='Posting'
                          />
                        ) : (
                          <input
                            className='MW-btn'
                            type='Submit'
                            value='Post'
                          />
                        )}
                      </div>
                    </div>
                  </div> */}
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};
