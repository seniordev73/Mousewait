import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import likeV from '../assets/img/like-v.png';
import {
  postThankyou,
  likeCommentReply,
  postLoungeComment,
} from '../redux/lounges/slice';
import { ToastContainer, toast } from 'react-toastify';
type LikeCommentReplyPropsType = {
  chat_id: number;
  likecount: number;
  comment_id: number;
  reply_id: any;
  commnet_userid: number;
  type: string;
  page: string;
};

export const LikeCommentReply: React.FC<LikeCommentReplyPropsType> = ({
  chat_id,
  likecount,
  comment_id,
  reply_id,
  commnet_userid,
  type,
  page,
}) => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const [likeCount, SetLikeCount] = useState<any>(likecount);
  const [Notify, setIsNotify] = useState<any | string>();
  const token = localStorage.getItem('token');

  const onLike = (
    chat_id: any,
    countvalue: number,
    comment_id: any,
    reply_id: any,
    commnet_userid: any,
    type: any,
    page: any
  ) => {
    /*     console.log(chat_id);
    console.log(countvalue);
    console.log(comment_id);
    console.log(reply_id);
    console.log(commnet_userid);
    console.log(type);
    return false; */
    if (token == null) {
      navigate('/disneyland/login');
    } else {
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
        if (res.payload.data == 'Like registered') {
          // console.log(likeCount);
          SetLikeCount(countvalue + 1);
          // console.log(likeCount);
        } else {
          // Notify(toast(res.payload.data));
        }
      });
    }
  };

  return (
    <>
      <span
        style={{ cursor: 'pointer' }}
        onClick={() =>
          onLike(
            chat_id,
            likeCount,
            comment_id,
            reply_id,
            commnet_userid,
            type,
            page
          )
        }
      >
        LIKE ({likeCount})
      </span>
    </>
  );
};
