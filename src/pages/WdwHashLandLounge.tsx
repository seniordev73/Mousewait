import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';
import { Placeholder } from '../components/Placeholder';
import { LoungeHeader } from '../components/WdwLoungeHeader';
import { LikeButton } from '../components/LikeButton';
import { TopImges } from '../components/TopImges';
import { TopTags } from '../components/TopTags';
import { CommentButton } from '../components/CommentButton';
import { MobileLoungeHeader } from '../components/WdwMobileLoungeHeader';
import { WDWLoungeList } from '../components/WDWLoungeList';
import { fetchHashLoungesWdw } from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';

import stickerImage from '../assets/img/stickers.jpg';
import faceBookImage from '../assets/img/face-s.jpg';
import pinImage from '../assets/img/face-s.jpg';
import { postLounge } from '../redux/lounges/slice';
import cardmImage from '../assets/img/card-m-img.png';
// @ts-ignore
import MetaTags from 'react-meta-tags';

type FormData = {
  chat_msg: string;
};

type SearchData = {
  searchValue: string;
};

const HashLandLounge = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const { tag } = useParams();

  const { tagItems, status, sortByTime } = useSelector(selectLounges);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm<SearchData>();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const { isLoggedIn } = useSelector(usersSelector);

  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );
  let sortType: any = null;
  let LoungeId: any = null;
  let currentPage: any = null;
  let tagValue: any = null;

  useEffect(() => {
    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (tag) {
      tagValue = '#' + tag;
    }

    dispatch(
      fetchHashLoungesWdw({
        sortType,
        LoungeId,
        currentPage,
        tagValue,
        shortByTime,
      })
    );
  }, [shortByTime, tag]);

  function converDate(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
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

  return (
    <>

      <MetaTags>
        <title>{tag}</title>
        <meta
          name='description'
          content=""
        />
        <meta property='og:title' content='Mousewait' />
        <meta
          property='og:image'
          content='https://mousewait.com/static/media/MouseWait-img.fed12113160621608cfe.png'
        />
        <meta
          property='og:description'
          content='MouseWait provides a wealth of information for both casual and frequent visitors to the Disneyland Resort. It does exactly what it claims and more, and it does it extremely well. '
        />
      </MetaTags>

      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec'>
            <LoungeHeader />
            <MobileLoungeHeader />
            <div className='mid-card-sec'>
              {status === 'error' ? (
                <div className='content__error-info'>
                  <h2>Error</h2>
                  <p>Please try to open the page later.</p>
                </div>
              ) : (
                <div className='content__items'>
                  {status === 'loading'
                    ? [...new Array(9)]?.map((_, index) => (
                        <Placeholder key={index} />
                      ))
                    : tagItems?.map((obj) => <WDWLoungeList obj={obj} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HashLandLounge;
