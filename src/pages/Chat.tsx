import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { LoungeHeader } from '../components/LoungeHeader';

import { MobileLoungeHeader } from '../components/MobileLoungeHeader';

import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import stickerImage from '../assets/img/stickers.jpg';

import { chatSend } from '../redux/users/slice';

import 'axios-progress-bar/dist/nprogress.css';


type FormData = {
  user_message: string;
};

const Chat = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<FormData>();
  

  const onSubmit = (data: any) => {
   
    dispatch<any>(chatSend(data['user_message'])).then((res: any) => {
       console.log(res);
     });
  };

  return (
    <>
      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec'>
            <LoungeHeader />
            <MobileLoungeHeader />

            <div className="card-chat rounded">
        {/*top-image-sec -*/}
       
        {/*chat-box-sec -*/}
        <div className="main-chat-box">
          {/*chat-box1-sec -*/}
          <div className="chat-box d-flex flex-row">
            <div className="chat-box-c">
              <div className="chat-box-d">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <div className="img-css"> 
                      <img src="images/com-img.jpg" className="com-imgg  img-fluid" alt="img" /> 
                    </div>
                  </div>
                  <div className="chat-box-t flex-grow-1">
                    <p className="commm-p">Hi. i'M Kate, your virtual plaid i am here to help you with your disneyland trip!</p>
                  </div>
                </div>
              </div>
              <div className="chat-box-tt">
                <p className="commm-p">Hi. i'M Kate, your virtual plaid i am here to help you with your disneyland trip!</p>
              </div>
            </div>
          </div>
          {/*chat-box2-sec -*/}
          <div className="chat-box d-flex flex-row">
            <div className="chat-box-c">
              <div className="chat-box-d">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <div className="img-css"> 
                      <img src="images/com-img.jpg" className="com-imgg  img-fluid" alt="img" /> 
                    </div>
                  </div>
                  <div className="chat-box-t flex-grow-1">
                    <p className="commm-p">Hi. i'M Kate, your virtual plaid i am here to help you with your disneyland trip!</p>
                  </div>
                </div>
              </div>
              <div className="chat-bb">
                <div className="chat-box-d">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <div className="icon-chat"> 
                        <i className="fa-sharp fa-solid fa-comment-dots" />
                      </div>
                    </div>
                    <div className="chat-box-t flex-grow-1">
                      <div className="chat-button">
                        <button type="submit" className="btn pro-btn">Dining</button>
                        <button type="submit" className="btn pro-btn">Next question</button>
                        <button type="submit" className="btn pro-btn">Next question</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*chat-input-sec -*/}
          <form action='' onSubmit={handleSubmit(onSubmit)}>
          <div className="chat-input">
            <div className="input-group">
              <input type="text" className="form-control" 
               {...register('user_message', {
                required: true,
           
              })} />
              <span className="input-group-btn">
                <button className="btn btn-sub"    type='button'
                        onClick={handleSubmit(onSubmit)}><i className="fa-sharp fa-solid fa-paper-plane" /></button>
              </span>
            </div>
          </div>
          </form>
        </div>
      </div>



          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
