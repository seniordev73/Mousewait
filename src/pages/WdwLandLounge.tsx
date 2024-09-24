import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useNavigate, useParams } from 'react-router-dom';

import { Placeholder } from '../components/Placeholder';
import { LoungeHeader } from '../components/WdwLoungeHeader';
import { LoungeBox } from '../components/LoungeBox';
import { LoungeList } from '../components/LoungeList';
import { MobileLoungeHeader } from '../components/WdwMobileLoungeHeader';
import {
  fetchDisneyWorldLounges,
  fetchStickyLoungeWdw,
} from '../redux/lounges/slice';
// @ts-ignore
import MetaTags from 'react-meta-tags';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { StickyPost } from '../components/StickyPostWdw';
import stickerImage from '../assets/img/stickers.jpg';

import { postLoungeWdw } from '../redux/lounges/slice';
// @ts-ignore
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import { WDWLoungeList } from '../components/WDWLoungeList';

type FormData = {
  chat_msg: string;
};

type SearchData = {
  searchValue: string;
};

const WdwLandLounge = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const { search } = useParams();

  const { items, status, sortByTime, stickyItem } = useSelector(selectLounges);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );

  const [showPopup, setShowPopup] = useState<any | string>(true);
  const [isLoading, setIsLoading] = useState<any | string>(false);

  let subtitle: any;

  let sortType: any = null;
  let LoungeId: any = null;
  //let currentPage: any = null;
  let searchValue: any = null;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  const handleLoginClick = () => {
    setShowPopup(!showPopup);
  };

  const [audienceSample, setAudienceSample] = useState(items); // set campaign as default

  useEffect(() => {
    setAudienceSample((prev) => [...prev, ...items]);
  }, [items]); // set the relation between redux campaign and local state

  // console.log(audienceSample);

  useEffect(() => {
    loadProgressBar();
    if (search) {
      searchValue = search;
    }
    else 
      dispatch(fetchStickyLoungeWdw({}));
    /*   if (currentPage == 1) {
      window.scrollTo(0, 0);
    } */
    dispatch(
      fetchDisneyWorldLounges({
        sortType,
        LoungeId,
        currentPage,
        searchValue,
        shortByTime,
      })
    );
  }, [shortByTime, search, currentPage]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handelInfiniteScroll);
    return () => window.removeEventListener('scroll', handelInfiniteScroll);
  }, []);

  return (
    <>
    
      <MetaTags>
        <title>MouseWait Disneyworld Lounge</title>
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
                  <div>
                    <LoungeBox
                      setVisible={() => {}}
                      isVisible={false}
                      onCloseMenu={() => {}}
                    />
                  </div>

                  {status === 'loading' ? (
                    [...new Array(9)]?.map((_, index) => (
                      <Placeholder key={index} />
                    ))
                  ) : stickyItem[0] != null ? (
                    <StickyPost obj={stickyItem[0]} mybutton={true} />
                  ) : (
                    ''
                  )}

                  {audienceSample.map((e) =>
                    e.checksticky === null ? <WDWLoungeList obj={e} /> : ''
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WdwLandLounge;
