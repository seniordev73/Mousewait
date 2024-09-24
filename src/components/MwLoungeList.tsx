import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CommentReply } from './CommentReply';
import { useSelector } from 'react-redux';
import { TopImges } from '../components/TopImges';
import { TopTags } from '../components/TopTags';
import { useAppDispatch } from '../redux/store';
import { LikeButton } from '../components/LikeButton';
import { CommentButton } from '../components/CommentButton';
import { ToggleMenu } from '../components/ToggleMenu';
import { selectLounges } from '../redux/lounges/selectors';
import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import { fetchLounges } from '../redux/lounges/slice';
import { postLoungeFlag } from '../redux/lounges/slice';
import { GET_BASE_URL_IMAGE, dTime } from '../constants/apiEndpoints';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type MwLoungeListPropsType = {
  obj: any;
};

export const MwLoungeList: React.FC<MwLoungeListPropsType> = ({ obj }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const { items, status, sortByTime } = useSelector(selectLounges);
  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );
  let sortType: any = null;
  let LoungeId: any = null;
  let currentPage: any = null;
  let searchValue: any = null;

  useEffect(() => {
    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);
  //const user= localStorage.getItem("user_id");
  //console.log(user)
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
  const [isLoading, setIsLoading] = useState<any | string>(false);
  const [Notify, setIsNotify] = useState<any | string>();
  const onSubmit = (data: any) => {
    setIsLoading(true);
    dispatch<any>(postLoungeFlag(data)).then((res: any) => {
      //console.log(res.payload.data[0].error);
      // Notify(toast(res.payload.data[0].error));

      reset();
      setIsLoading(false);
      //loadProgressBar();
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
  };

  //console.log('yo')
  //console.log(obj)
  return (
    <>
      {obj.error != null ? (
        <div className='card-mn rounded'>
          <div className='card-body'>{obj.error}</div>{' '}
        </div>
      ) : (
        <div className='card-m rounded card-m2'>
          <div className='card-s-img justify-content-between d-flex'>
            <div className='small-box d-flex'>
              <div className='small-c'>
                <Link
                  to={`/disneyland/user/${obj?.chat?.user?.user_id}/mypost`}
                >
                  <img
                    src={
                      GET_BASE_URL_IMAGE +
                      '/disneyland/images/thumbs/' +
                      obj?.chat?.user?.image +
                      dTime
                    }
                    className='img-fluid'
                    alt='{obj.user?.user_name}'
                  />
                </Link>
              </div>
              <div className='small-tt'>
                <h6>
                  <Link
                    to={`/disneyland/user/${obj?.chat?.user?.user_id}/mypost`}
                  >
                    {obj?.chat?.user?.user_name}
                  </Link>
                </h6>
                <span>
                  {obj?.chat?.user?.totalpoints} #{obj?.chat?.user?.position}
                  Quality #5
                </span>

                <p>{converDate(obj?.chat?.chat_time)}</p>
              </div>
            </div>
            {/* 
            <div>
            
              <ToggleMenu
                onSubmit={onSubmit}
                register={register}
                handleSubmit={handleSubmit}
                setValue={setValue}
                isLoading={isLoading}
                LoungeId={obj?.chat?.chat_id}
                getThankYou={
                  obj?.chat?.isthankyou?.status == '1' ? true : false
                }
                getBookMark={
                  obj?.chat?.isbookmark?.status == '1' ? true : false
                }
                editType={false}
                chat_reply_msg={''}
              />
            </div> */}
          </div>
          {obj?.chat?.topimages && (
            <TopImges
              topImageData={obj?.chat?.topimages}
              chatId={obj?.chat?.chat_id}
            />
          )}
          <ToastContainer autoClose={8000} />
          <div className='card-img-b my-2'>
            {obj?.chat?.chat_img?.includes('c_img') && (
              <Link to={`/disneyland/lands-talk/${obj?.chat?.mapping_url}`}>
                <img
                  src={
                    GET_BASE_URL_IMAGE +
                    '/disneyland/chat_images/' +
                    obj?.chat?.chat_img
                  }
                  className='card-img-top img-fluid'
                  alt='img'
                />
              </Link>
            )}
          </div>

          <div className='card-body'>
            <div className='t-link text-center'>
              {obj?.chat?.tagcomposit && (
                <>
                  <TopTags
                    gettagged={obj?.chat?.tagcomposit}
                    chatId={obj?.chat?.tagcomposit.chat_id}
                  />
                </>
              )}
            </div>
            <div>
              <Link to={`/disneyland/lands-talk/${obj?.mapping_url}`}>
                <h6
                  dangerouslySetInnerHTML={{
                    __html: obj?.chat?.chat_msg
                    // ?.replace(
                      // 'mousewait.com',
                      // 'mousewait.xyz'
                    // ),
                  }}
                />
              </Link>

              <div className='chat-icon d-flex'>
                <LikeButton
                  likecount={obj?.chat?.likecount}
                  chatId={obj?.chat?.chat_id}
                />
                <Link to={`/disneyland/lands-talk/${obj?.chat?.mapping_url}`}>
                  <CommentButton
                    commentcount={obj?.chat?.commentcount}
                    chatId={obj?.chat?.chat_id}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
