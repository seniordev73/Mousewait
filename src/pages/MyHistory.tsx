import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';
import { Placeholder } from '../components/Placeholder';

import { fetchMyHistory } from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';

import { LoungeHeader } from '../components/LoungeHeader';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const MyHistory = () => {
  const dispatch = useAppDispatch();
  const { myHistoryItem, status } = useSelector(selectLounges);
  console.log('uyoga');

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const { isLoggedIn } = useSelector(usersSelector);

  let sortType: any = null;
  let categoryId: any = null;
  //let currentPage: any = null;
  let searchValue: any = null;

  const [currentPage, setCurrentPage] = useState(1);
  const [myData, SetMyData] = useState<any | string>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchMyHistory({ sortType, currentPage })).then((res: any) => {
      SetMyData((prev: any) => [...prev, ...res.payload]);
    });
  }, [currentPage]);

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

  //console.log(myHistoryItem)
  return (
    <>
      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec mwstore-page-bg'>
            <LoungeHeader />
            <MobileLoungeHeader />
            {/*-=====mobile-view start ======-*/}
            <div className='top-text-m text-center p-2 text-head text-center'>
              <div className='top-mw text-center'>
                <h6>Top MouseWaiters of the Day</h6>
                <div className='top-sp d-flex justify-content-center'>
                  <p>
                    <span>1. grumpypapa 56.38 #5 (DL)</span>
                    <span>2. grapesoda 52.67 #5 (DL)</span>
                  </p>
                </div>
              </div>
              <div className='text-head-m text-center'>
                <ul className='p-0 m-0'>
                  <li>
                    <a href=''>Best of the Day</a>
                  </li>
                  <li>
                    <a href=''>Food Blog</a>
                  </li>
                  <li>
                    <a href=''>Tips</a>
                  </li>
                  <li>
                    <a href=''>Sticker Store</a>
                  </li>
                </ul>
              </div>
              <div className='Search-bar'>
                <div className='input-group  bg-white border rounded-pill p-1'>
                  <input
                    type='search '
                    placeholder='Search the Lounge'
                    aria-describedby='button-addon4'
                    className='form-control  border-0'
                  />
                  <div className='input-group-prepend border-0'>
                    <button id='button-addon4' type='button' className='btn'>
                      <i className='fa fa-search' />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='mwstore-mid-bg'>
              <Tabs style={{ borderTopWidth: 0 }}>
                <TabList>
                  <Tab>
                    {' '}
                    <Link to='/disneyland/mystore'> MW Store </Link>{' '}
                  </Tab>
                  <Tab>
                    {' '}
                    <Link to='/disneyland/recharge'>
                      {' '}
                      Recharge Credits{' '}
                    </Link>{' '}
                  </Tab>
                  <Tab>
                    {' '}
                    <Link to='/disneyland/mycollection'>
                      {' '}
                      My Collection{' '}
                    </Link>{' '}
                  </Tab>
                  <Tab>
                    {' '}
                    <Link to='/disneyland/mytrade-request'>
                      {' '}
                      My Trade Request{' '}
                    </Link>{' '}
                  </Tab>
                  <Tab>
                    {' '}
                    <Link to='/disneyland/myhistory'> My History </Link>{' '}
                  </Tab>
                </TabList>

                <TabPanel>
                  <div className='MW-buy-sec'>
                    <div className='container'>
                      <div className='row'>
                        <div className='buy-m'>
                          <div className='mws-mid-sec mb-4'>
                            <h5 className='mid-head'>My History</h5>
                          </div>

                          {status === 'loading'
                            ? [...new Array(9)]?.map((_, index) => (
                                <Placeholder key={index} />
                              ))
                            : myData?.map((obj: any) =>
                                obj.error != null ? (
                                  <div className='card-mn rounded'>
                                    <div className='card-body'>
                                      <h6 style={{ fontWeight: '600' }}>
                                        {obj.error}
                                      </h6>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className='buy-sec justify-content-between d-flex'>
                                      <div className='buy-t'>
                                        <h6>{obj.product_name}</h6>
                                        <span>Balance </span>
                                        <span style={{ marginLeft: '1rem' }}>
                                          Debits {obj.debits}
                                        </span>
                                        <span style={{ marginLeft: '1rem' }}>
                                          Credits {obj.credts}
                                        </span>
                                        <br />
                                        <span>
                                          <i
                                            className='fa fa-calendar'
                                            aria-hidden='true'
                                            style={{ marginRight: '8px' }}
                                          ></i>
                                          {converDate(obj.createdon)}
                                        </span>
                                      </div>
                                    </div>
                                  </>
                                )
                              )}
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyHistory;
