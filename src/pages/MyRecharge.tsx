import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';
import { Placeholder } from '../components/Placeholder';

import { fetchMyRechargeCredit } from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';

import { LoungeHeader } from '../components/LoungeHeader';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const MyRecharge = () => {
  const dispatch = useAppDispatch();
  const { myRechargeItem, status } = useSelector(selectLounges);
  //console.log('uyoga')

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const { isLoggedIn } = useSelector(usersSelector);

  let sortType: any = null;
  let categoryId: any = null;
  let currentPage: any = null;
  let searchValue: any = null;

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchMyRechargeCredit({ sortType, currentPage }));
  }, []);

  function renderInputField(obj: any) {
    if (
      obj.product_quantity > 0 &&
      obj.product_isauction === 0 &&
      token != null
    ) {
      return <td>Buy Now </td>;
    } else {
      return null;
    }
  }

  //console.log(myRechargeItem)

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
                            <h5 className='mid-head'>Recharge Credits</h5>
                            <h6
                              className='mid-sub'
                              style={{ fontWeight: '600' }}
                            >
                              <span>
                                Credit Balance :{' '}
                                {(myRechargeItem as any).credit_balance}
                              </span>
                            </h6>
                            <h6 className='mt-2'>
                              <span>
                                Your Cerdits work in ALL of our Apps including
                                TRIVILATOR and MagicRace. Thank you for your
                                support!
                              </span>
                            </h6>
                          </div>

                          {status === 'loading'
                            ? [...new Array(9)]?.map((_, index) => (
                                <Placeholder key={index} />
                              ))
                            : //: ((myRechargeItem as any).store)?.map((obj:any) =>obj.error != null?(

                              // : ((myRechargeItem as any).store)?.map((obj:any) => (obj.error != null?

                              /* : ((myRechargeItem as any).store)?.map((obj:any) => 
               (
              <div className="card-mn rounded">
              <div className="card-body">
               
              <h6>{obj.error}</h6></div></div>): 
              ( */

                              (myRechargeItem as any).store?.map((obj: any) => (
                                <>
                                  <div className='buy-sec justify-content-between d-flex'>
                                    <div className='buy-t'>
                                      <h6>Buy {obj.credits} Credits</h6>
                                      <span>{obj.amount}</span>
                                    </div>
                                    <div className='buy-btn'>
                                      <a
                                        href='https://mousewait.org/shop/credits/'
                                        type='button'
                                        className='buy-b'
                                        style={{ color: '#fff' }}
                                      >
                                        Buy
                                      </a>
                                    </div>
                                  </div>
                                </>
                              ))}
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

export default MyRecharge;
