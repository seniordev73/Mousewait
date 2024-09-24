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
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { StickyPost } from '../components/StickyPost';
import stickerImage from '../assets/img/stickers.jpg';

import { postLounge } from '../redux/lounges/slice';

// @ts-ignore
import MetaTags from 'react-meta-tags';

type FormData = {
  chat_msg: string;
};

type SearchData = {
  searchValue: string;
};

const Club333 = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const landid = '4';
  const { search } = useParams();
  const { items, stickyItem, status, sortByTime } = useSelector(selectLounges);
  const token = localStorage.getItem('token');
  const club333 = localStorage.getItem('club333');

  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );

  const [showPopup, setShowPopup] = useState<any | string>(true);
  const [isLoading, setIsLoading] = useState<any | string>(false);
  let subtitle: any;

  let sortType: any = null;
  let LoungeId: any = null;
  let searchValue: any = null;

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (token == null) {
      navigate('/disneyland/login');
    }

    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  const handleLoginClick = () => {
    if (token == null) {
      navigate('/disneyland/login');
    }

    setShowPopup(!showPopup);
  };
  
  const landname = '';

  useEffect(() => {
    window.scrollTo(0, 0);
    // dispatch(fetchStickyLounge({}));
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

  return (
    <>
      <MetaTags>
        <title>Club 333</title>
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

            {
              club333 == 'true' ? (
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

                      {items.map((e) =>
                        e.checksticky === null ? <LoungeList obj={e} /> : ''
                      )}
                    </div>
                  )}
                </div>
              )
              : <div className='no-permission'><div>Sorry <br></br> You don't have permission to access this page</div></div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Club333;
