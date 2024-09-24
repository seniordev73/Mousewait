import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {
  fetchUserMessage,
  sendDmMessage,
  sendDmMessageReply,
  fetchMyNotification,
} from '../redux/lounges/slice';

type DmMePropsType = {
  isOpen: any;
  isClosed: any;
  isSubmitted: any;
  LoungeId: any;
  onSubmit?: any;
  register: any;
  handleSubmit: any;
  setValue: any;
  userName?: any;
  user_id?: any;
  chatId?: any;
  type?: any;
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

export const DmMe: React.FC<DmMePropsType> = ({
  isOpen,
  isClosed,
  isSubmitted,
  userName,
  user_id,
  chatId,
  type,
}) => {
  type FormData = {
    user_text_message: any;
    user_id: any;
    tbox_name: String;
    chat_id: string;
  };

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const afterOpenModal = () => {};

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [openDmBox, setOpenDmBox] = useState<any | string>(true);
  const [Notify, setIsNotify] = useState<any | string>();
  const [NavState, setNavState] = useState<any | string>(false);
  const [MessageData, setMessageData] = useState<any | string>();
  const [loader, setLoader] = useState<any | string>(false);

  // console.log('from outside'+user_id)

  let sortType: any = null;
  let currentPage: any = null;

  const onSubmit = (data: any) => {
    setLoader(true);
    if (type != '') {
      dispatch<any>(sendDmMessageReply(data)).then((res: any) => {
        setOpenDmBox(false);
        dispatch<any>(fetchMyNotification({ sortType, currentPage }));
        //console.log(res);
      });
    } else {
      dispatch<any>(sendDmMessage(data)).then((res: any) => {
        let userId = user_id;
        /*   dispatch<any>(fetchUserMessage({ userId })).then((res: any) => {
          console.log(res);
          setOpenDmBox(false);
          //console.log(res.payload.data);
          setMessageData(res.payload.data);
        }); */

        // dispatch(fetchusermessages({user_id}));
        navigate('/disneyland/myConversation/' + user_id);
        // Notify(toast(res.payload.data));
        setNavState(true);
      });
    }
  };

  // useEffect(()=>{

  // },[NavState])

  const [messages, setmessages] = useState<any | string>('');
  // console.log(`username is ${userName} and userId is ${user_id} and chat Id ${chatId}`)

  return (
    <div>
      {isOpen == true && (
        <>
          <ToastContainer autoClose={3000} />
          <Modal
            isOpen={openDmBox}
            onAfterOpen={afterOpenModal}
            onRequestClose={isClosed}
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
                  <div className='close-p' onClick={isClosed}>
                    <i className='fa fa-close my-b' />
                  </div>
                  <div className='boxwidth'>
                    <div
                      className='username'
                      style={{ paddingLeft: '12%', paddingRight: '13%' }}
                    >
                      <label htmlFor='input'></label>
                      {type != '' ? <div>You are replying to</div> : <></>}
                      <div className='input-group mb-2'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Username'
                          aria-label='Username'
                          aria-describedby='basic-addon1'
                          value={userName}
                          {...register('tbox_name')}
                        />
                      </div>
                    </div>
                    <div className='box-ttt'>
                      <textarea
                        rows={3}
                        cols={60}
                        required
                        {...register('user_text_message')}
                        placeholder='Enter messaage here'
                      />

                      <input
                        type='hidden'
                        defaultValue={user_id}
                        {...register('user_id')}
                      />
                      <input
                        type='hidden'
                        value={chatId}
                        {...register('chat_id')}
                      />

                      <div className='send_button'>
                        {loader == true ? (
                          <CircularProgress />
                        ) : (
                          <button type='submit' className='btn btn-primary'>
                            Send Message
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default DmMe;
