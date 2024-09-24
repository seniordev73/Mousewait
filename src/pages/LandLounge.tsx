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
  fetchLounges,
  fetchUserMenu,
  fetchStickyLounge,
} from '../redux/lounges/slice';

// @ts-ignore
import MetaTags from 'react-meta-tags';

import { selectLounges } from '../redux/lounges/selectors';

import stickerImage from '../assets/img/stickers.jpg';

import { postLounge } from '../redux/lounges/slice';
// @ts-ignore
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import Progressbar from 'react-js-progressbar';
import { StickyPost } from '../components/StickyPost';

type FormData = {
  chat_msg: string;
};

type SearchData = {
  searchValue: string;
};

type ProgressbarProps = {
  input: number;
  pathWidth: number;
  pathColor: ('#56ab2f' | '#a8e063')[];
  trailWidth: number;
  trailColor: '#363636';
};

const LandLounge = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const { search } = useParams();

  const { items, stickyItem, status, sortByTime } = useSelector(selectLounges);
  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );
  const token = localStorage.getItem('token');

  const [showPopup, setShowPopup] = useState<any | string>(true);

  let sortType: any = null;
  let LoungeId: any = null;
  // let currentPage: any = null;
  let searchValue: any = null;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {

    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  const [audienceSample, setAudienceSample] = useState(items); // set campaign as default

  useEffect(() => {
    setAudienceSample((prev) => [...prev, ...items]);
  }, [items]); // set the relation between redux campaign and local state

  // console.log(audienceSample);

  const loadDataOnlyOnce = () => {
    /*    if (currentPage == 1) {
      window.scrollTo(0, 0);
    } */
    loadProgressBar();
    if (search) {
      searchValue = search;
    }
    else {
      dispatch(fetchStickyLounge({}));
    }
    
    dispatch(
      fetchLounges({
        sortType,
        LoungeId,
        currentPage,
        searchValue,
        shortByTime,
      })
    );
  };

  useEffect(() => {
    loadDataOnlyOnce(); // this will fire only on first render
  }, [shortByTime, search, currentPage]);

  // to get user menu
  const loginuserid = localStorage.getItem('user_id');
  const [assignMenu, SetAssignMenu] = useState<any | string>([]);
  useEffect(() => {

    dispatch(fetchUserMenu({ loginuserid })).then((res: any) => {
      SetAssignMenu(res.payload);
    });
  }, []);

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

  //console.log(items);

  return (
    <>
     <MetaTags>
        <title>MouseWait Disneyland Lounge</title>
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
                    e.checksticky === null ? <LoungeList obj={e} /> : ''
                  )}

                  {assignMenu.length > 0 ? (
                    assignMenu.map((item: any) =>
                      item.rights_id == '7'
                        ? localStorage.setItem('Tag', 'true')
                        : ''
                    )
                  ) : (
                    <>{localStorage.setItem('Tag', '')}</>
                  )}
                  {assignMenu.length > 0 ? (
                    assignMenu.map((item: any) =>
                      item.rights_id == '6'
                        ? localStorage.setItem('MP', 'true')
                        : ''
                    )
                  ) : (
                    <>{localStorage.setItem('MP', '')}</>
                  )}

                  {assignMenu.length > 0 ? (
                    assignMenu.map((item: any) =>
                      item.rights_id == '12'
                        ? localStorage.setItem('DM', 'true')
                        : ''
                    )
                  ) : (
                    <>{localStorage.setItem('DM', '')}</>
                  )}
                  {assignMenu.length > 0 ? (
                    assignMenu.map((item: any) =>
                      item.rights_id == '8'
                        ? localStorage.setItem('SP', 'true')
                        : ''
                    )
                  ) : (
                    <>{localStorage.setItem('SP', '')}</>
                  )}
                  {assignMenu.length > 0 ? (
                    assignMenu.map((item: any) =>
                      item.rights_id == '13'
                        ? localStorage.setItem('loungeland', 'true')
                        : ''
                    )
                  ) : (
                    <>{localStorage.setItem('loungeland', '')}</>
                  )}
                  {assignMenu.length > 0 ? (
                    assignMenu.map((item: any) =>
                      item.rights_id == '14'
                        ? localStorage.setItem('club333', 'true')
                        : ''
                    )
                  ) : (
                    <>{localStorage.setItem('club333', '')}</>
                  )}
                  {assignMenu.length > 0 ? (
                    assignMenu.map((item: any) =>
                      item.rights_id == '15'
                        ? localStorage.setItem('editor', 'true')
                        : ''
                    )
                  ) : (
                    <>{localStorage.setItem('editor', '')}</>
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

export default LandLounge;
