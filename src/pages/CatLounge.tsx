import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useNavigate, useParams } from 'react-router-dom';

import { Placeholder } from '../components/Placeholder';
import { LoungeHeader } from '../components/LoungeHeader';
import { LoungeBox } from '../components/LoungeBox';
import { LoungeList } from '../components/LoungeList';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';
import {
  fetchCatLounges,
  fetchLounges,
  fetchStickyLounge,
} from '../redux/lounges/slice';
// @ts-ignore
import MetaTags from 'react-meta-tags';

import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { StickyPost } from '../components/StickyPost';
import stickerImage from '../assets/img/stickers.jpg';

import { postLounge } from '../redux/lounges/slice';

type FormData = {
  chat_msg: string;
};

type SearchData = {
  searchValue: string;
};

const CatLounge = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const { search } = useParams();
  const { landid } = useParams();
  const { landname } = useParams();

  const { items, stickyItem, status, sortByTime } = useSelector(selectLounges);
  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );

  const token = localStorage.getItem('token');
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

    if (search) {
      searchValue = search;
    }
    setAudienceSample((prev) => [...prev, ...items]);
  }, [items]); // set the relation between redux campaign and local state

  useEffect(() => {
    /*  if (currentPage == 1) {
      window.scrollTo(0, 0);
    } */

    dispatch(fetchStickyLounge({}));
    dispatch(
      fetchCatLounges({
        landid,
        landname,
        sortType,
        LoungeId,
        currentPage,
        searchValue,
        shortByTime,
      })
    );
  }, [landid, currentPage, shortByTime, search]);

  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
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

  let myurl = window.location.href
        .substring(window.location.href.lastIndexOf(landid + '/') + 1)
        .replace(/([/~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\?\- ])+/g, ' ');


  // land real-time
  // console.log(items);
  return (
    <>
    <MetaTags>
      <title>{ landname }</title>
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
                  <div>
                    <LoungeBox
                      isVisible={false}
                      setVisible={() => {}}
                      onCloseMenu={() => {}}
                    />
                  </div>
                  {/* */}
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
                    e.checksticky === null ? <LoungeList obj={e} /> : ''
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

export default CatLounge;
