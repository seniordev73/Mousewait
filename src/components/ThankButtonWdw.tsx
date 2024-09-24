import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import likeV from '../assets/img/like-v.png';
import likeB from '../assets/img/h-v.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  postThankyouWdw,
  postBookMarkWdw,
  postLoungeComment,
} from '../redux/lounges/slice';
type ThankButtonWdwPropsType = {
  chatId: number;
  likecount: number;
  getThankYou: boolean;
};

export const ThankButtonWdw: React.FC<ThankButtonWdwPropsType> = ({
  chatId,
  likecount,
  getThankYou,
}) => {
  const dispatch = useAppDispatch();
  const [likeCount, SetLikeCount] = useState<any>(likecount);
  const [Notify, setIsNotify] = useState<any | string>();
  const [myicon, SetMyIcon] = useState<any>(
    getThankYou == true ? likeB : likeV
  );
  const onLike = (LoungeId: any, countvalue: number) => {
    const token = localStorage.getItem('token');
    if(token == null){
      window.alert("Please login from the Me tab in the MouseWait App, or the menu icon on the top right, thanks!");
      return;
    }
    dispatch<any>(postThankyouWdw({ LoungeId })).then((res: any) => {
      res.payload.data[0].message == 'Added' && SetLikeCount(countvalue + 1);
      res.payload.data[0].message == 'Removed' && SetLikeCount(countvalue - 1);
      res.payload.data[0].message == 'Added' && SetMyIcon(likeB);
      res.payload.data[0].message == 'Removed' && SetMyIcon(likeV);
    });
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <span className='d-flex'>
        <div className='co-icon widerIcon' onClick={() => onLike(chatId, likeCount)}>
          <img src={myicon} className='img-fluid' />
        </div>
        <span className='widerIconText'>{likeCount}</span>
      </span>
    </>
  );
};
