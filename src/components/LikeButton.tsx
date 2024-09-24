import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import likeV from '../assets/img/like-v.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  postThankyou,
  postBookMark,
  postLoungeComment,
} from '../redux/lounges/slice';
type LikeButtonPropsType = {
  chatId: number;
  likecount: number;
};

export const LikeButton: React.FC<LikeButtonPropsType> = ({
  chatId,
  likecount,
}) => {
  const dispatch = useAppDispatch();
  const [likeCount, SetLikeCount] = useState<any>(likecount);
  const [Notify, setIsNotify] = useState<any | string>();
  const onLike = (LoungeId: any, countvalue: number) => {
    dispatch<any>(postBookMark({ LoungeId })).then((res: any) => {
      // console.log(res);

      res.payload.data[0].message == 'Added' && SetLikeCount(countvalue + 1);
      res.payload.data[0].message == 'Removed' && SetLikeCount(countvalue - 1);
      // Notify(toast(res.payload.data[0].message));
    });
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <span className='d-flex'>
        <div className='co-icon widerIcon' onClick={() => onLike(chatId, likeCount)}>
          <img src={likeV} className='img-fluid' />
        </div>
        <span className='widerIconText'>{likeCount}</span>
        
      </span>
    </>
  );
};
