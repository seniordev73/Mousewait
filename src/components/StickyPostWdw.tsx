import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CommentReply } from './CommentReply';
import { useSelector } from 'react-redux';
import { TopImges } from '../components/TopImges';
import { TopTags } from '../components/TopTags';
import { useAppDispatch } from '../redux/store';
import { LikeButtonWdw } from '../components/LikeButtonWdw';
import { CommentButton } from '../components/CommentButton';
import { ToggleMenu } from '../components/ToggleMenuDisneyWorld';
import { selectLounges } from '../redux/lounges/selectors';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { fetchLounges } from '../redux/lounges/slice';
import {
  postLoungeFlag,
  postLoungeCommentEditWdw,
} from '../redux/lounges/slice';
// @ts-ignore
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GET_BASE_URL_IMAGE, dTime } from '../constants/apiEndpoints';
import { CommonPostMessage } from '../components/CommonPostMessage';
type StickyPostPropsType = {
  obj: any;
  mybutton: any;
};

export const StickyPost: React.FC<StickyPostPropsType> = ({
  obj,
  mybutton,
}) => {
  const dispatch = useAppDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState<any | string>(false);
  const user = localStorage.getItem('user_id');
  // const { items, status, sortByTime } = useSelector(selectLounges);
  const { search } = useParams();
  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );

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
  function converTime(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
    return formattedDate;
  }

  let sortType: any = null;
  let LoungeId: any = null;
  let currentPage: any = null;
  let searchValue: any = null;

  // useEffect(() => {
  //   sortByTime != '' && setShortByTime(sortByTime);
  // }, [sortByTime]);

  //const notify = () => toast("Wow so easy!");
  const [Notify, setIsNotify] = useState<any | string>();
  const onSubmit = (data: any) => {
    /* console.log('uuuu');
    console.log(data);
    console.log(data.chat_reply_msg);
    return false; */

    if (data.chat_reply_msg != undefined) {
      dispatch<any>(postLoungeCommentEditWdw(data)).then((res: any) => {
        reset();
        window.location.reload();
        // Notify(toast('Post Updated Successfully'));
      });
    } else {
      setIsLoading(true);
      dispatch<any>(postLoungeFlag(data)).then((res: any) => {
        // Notify(toast(res.payload.data[0].error));
        reset();
        setIsLoading(false);
        loadProgressBar();
        dispatch(
          fetchLounges({
            sortType,
            LoungeId,
            currentPage,
            searchValue,
            shortByTime,
          })
        );
      });
    }
  };

  const [isShow, setIsShow] = useState<any | String>(mybutton);

  const hideStickyPost = () => {
    setIsShow(false);
  };
  const showStickyPost = () => {
    setIsShow(true);
  };

  function removeTags(string: any) {
    let newstring = string
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    let content = newstring?.split(/((?:#|@|https?:\/\/[^\s]+)[a-zA-Z]+)/);
    let hashtag;

    return content?.map((word: any) => {
      if (word.startsWith('#')) {
        hashtag = word.replace('#', '');
        return (
          <Link to={`/disneyland/hash/${hashtag}`}>
            <a style={{ color: 'blue', textDecoration: 'underline' }}>{word}</a>
          </Link>
        );
      } else {
        return word;
      }
    });
  }

  return (
    <>
      {isShow == true ? (
        <div>
          <a
            style={{ color: 'blue', textDecoration: 'underline' }}
            href={'javascript:void(0)'}
            onClick={() => hideStickyPost()}
          >
            Hide Admin Message
          </a>
        </div>
      ) : (
        <div>
          <a
            style={{ color: 'blue', textDecoration: 'underline' }}
            href={'javascript:void(0)'}
            onClick={() => showStickyPost()}
          >
            Show Admin Message
          </a>
        </div>
      )}
      {isShow == true ? (
        <div className='card-m rounded card-m2'>
          <div className='card-s-img justify-content-between d-flex'>
            <div className='small-box d-flex'>
              <div className='small-c'>
                <Link to={`/disneyworld/user/${obj.user?.user_id}/mypost`}>
                  <img
                    src={
                      GET_BASE_URL_IMAGE +
                      '/disneyland/images/thumbs/' +
                      obj.user?.image +
                      dTime
                    }
                    className='img-fluid'
                    alt='{obj.user?.user_name}'
                  />
                </Link>
              </div>
              <div className='small-tt'>
                <h6>
                  {' '}
                  <Link to={`/disneyworld/user/${obj.user?.user_id}/mypost`}>
                    {obj.user?.user_name}
                  </Link>
                </h6>
                <span>
                  {obj.user?.totalpoints} #{obj.user?.position} Quality #5
                </span>

                <p>{converDate(obj.chat_time)}</p>
              </div>
            </div>

            <div>
              <ToggleMenu
                onSubmit={onSubmit}
                register={register}
                handleSubmit={handleSubmit}
                setValue={setValue}
                isLoading={''}
                LoungeId={obj.chat_id}
                username={obj.user.user_name}
                userid={obj.user.user_id}
                getThankYou={obj.isthankyou?.status == '1' ? true : false}
                getBookMark={obj.isbookmark?.status == '1' ? true : false}
                editType={obj.user?.user_id == user ? true : false}
                chat_reply_msg={obj.chat_msg}
                // chat_type={obj.chat_type}
                pageName={'Detail'}
                lock={obj.islock == '0' ? 'Lock' : 'UnLock'}
                chatRoomId={obj.chat_room_id}
                getStick={obj.checksticky == null ? 'Stick' : 'UnStick'}
                getSubscribe={
                  obj.subscribepost?.user_id == user &&
                  obj.subscribepost != null
                    ? false
                    : true
                }
              />
            </div>
          </div>
          {obj.topimages && (
            <TopImges topImageData={obj.topimages} chatId={obj.chat_id} />
          )}

          {/*  <ToastContainer autoClose={3000} /> */}
          <div className='card-img-b my-2'>
            {obj.chat_img?.includes('c_img') && (
              <Link
                to={
                  obj.mapping_url
                    ? '/disneyworld/lands-talk/' +
                      obj.mapping_url.replace(
                        /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                        '-'
                      )
                    : '/disneyworld/lands-talk/' + obj.chat_id + '/Mousewait'
                }
              >
                <img
                  src={
                    GET_BASE_URL_IMAGE +
                    '/disneyworld/chat_images_medium/' +
                    obj.chat_img
                  }
                  className='card-img-top img-fluid'
                  alt='img'
                />
              </Link>
            )}
          </div>

          <div className='card-body'>
            <div className='t-link text-center'>
              {obj.tagcomposit && (
                <>
                  <TopTags
                    gettagged={obj.tagcomposit}
                    chatId={obj.tagcomposit.chat_id}
                  />
                </>
              )}
            </div>
            <div>
              <Link
                to={
                  obj.mapping_url
                    ? '/disneyworld/lands-talk/' +
                      obj.mapping_url.replace(
                        /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                        '-'
                      )
                    : '/disneyworld/lands-talk/' + obj.chat_id + '/Mousewait'
                }
              >
                <CommonPostMessage myChat={obj.chat_msg}/>
              </Link>

              <div className='chat-icon d-flex'>
                <LikeButtonWdw likecount={obj.likecount} chatId={obj.chat_id} />
                <Link
                  to={
                    obj.mapping_url
                      ? '/disneyworld/lands-talk/' +
                        obj.mapping_url.replace(
                          /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                          '-'
                        )
                      : '/disneyworld/lands-talk/' + obj.chat_id + '/Mousewait'
                  }
                >
                  <CommentButton
                    commentcount={obj.commentcount}
                    chatId={obj.chat_id}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </>
  );
};
