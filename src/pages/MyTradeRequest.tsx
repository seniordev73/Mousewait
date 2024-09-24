import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';
import { Placeholder } from '../components/Placeholder';

import {
  fetchMyTradeRequest,
  removeTrade,
  acceptTrade,
} from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';

import { LoungeHeader } from '../components/LoungeHeader';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';
const MyTradeRequest = () => {
  const dispatch = useAppDispatch();
  const { myTradeRequestItem, status } = useSelector(selectLounges);
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

    dispatch(fetchMyTradeRequest({ sortType, currentPage }));
  }, []);

  /* const [list, setList] = useState([]);
  async function handleRemove(tid:any) {
    console.log(tid); 
    //let  result = await fetch('http://144.208.70.141/~mouse/mousewaitnew/backend/api/v1/tradeRequestReject?tid='+id);
    //let response = await result.json();
  // console.log(response)

   const response = await fetch(
    "https://mousewait.xyz/mousewaitnew/backend/api/v1/tradeRequestReject",
    {
      method: "POST",
      headers: {
        //'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tid,
     
         
      }),
    }
  )

  console.log(response)

  } */
  const [Notify, setIsNotify] = useState<any | string>();

  const tradeRemove = (tid: any) => {
    window.scrollTo(0, 0);
    dispatch(fetchMyTradeRequest({ sortType, currentPage }));
    dispatch<any>(removeTrade({ tid })).then((res: any) => {
      //console.log(res)
    });
    // Notify(toast('Reject'));
  };

  const tradeAccept = (tid: any) => {
    window.scrollTo(0, 0);
    dispatch(fetchMyTradeRequest({ sortType, currentPage }));
    dispatch<any>(acceptTrade({ tid })).then((res: any) => {
      //console.log(res)
    });
    // Notify(toast('Accept'));
  };

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
            <ToastContainer autoClose={3000} />
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
                          <div className='mws-mid-sec mb-3'>
                            <h5
                              style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              Trade Requests
                            </h5>
                          </div>
                          {/* <h6 className="mid-sub">
            <span>Credit Balance : {(myTradeRequestItem as any).credit_balance}</span>
       
          </h6> */}

                          <div className='mws-table-main mt-2'>
                            <>
                              {status === 'loading'
                                ? [...new Array(9)].map((_, index) => (
                                    <Placeholder key={index} />
                                  ))
                                : myTradeRequestItem?.map((obj) =>
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
                                        {obj.get_trade_request.map(function (
                                          item: any
                                        ) {
                                          // {console.log(item)}

                                          return (
                                            <div className='MW-buy-sec'>
                                              <div className='container'>
                                                <div className='row'>
                                                  <div className='buy-m'>
                                                    <div className='buy-sec justify-content-between d-flex'>
                                                      <div className='tab-img d-flex'>
                                                        <img
                                                          src={
                                                            GET_BASE_URL_IMAGE +
                                                            '/disneyland/images/products_thumbnail/' +
                                                            item.product_image
                                                          }
                                                          className='img-fluid'
                                                          alt='big-top'
                                                        />

                                                        <div
                                                          className='buy-t'
                                                          style={{
                                                            marginTop: '1rem',
                                                            marginLeft: '1rem',
                                                          }}
                                                        >
                                                          <h6
                                                            style={{
                                                              fontWeight: '600',
                                                            }}
                                                          >
                                                            {item.product_name}
                                                          </h6>
                                                          <span
                                                            style={{
                                                              fontWeight: '600',
                                                            }}
                                                          >
                                                            Requested By:{' '}
                                                            {
                                                              item.user
                                                                .requested_prod_username
                                                            }
                                                          </span>
                                                        </div>
                                                      </div>

                                                      <div className='buy-btn'>
                                                        <a
                                                          onClick={() =>
                                                            tradeAccept(item.id)
                                                          }
                                                          style={{
                                                            marginRight: '1rem',
                                                            color: '#fff',
                                                          }}
                                                          type='button'
                                                          className='buy-b'
                                                        >
                                                          Accept
                                                        </a>
                                                        <a
                                                          onClick={() =>
                                                            tradeRemove(item.id)
                                                          }
                                                          style={{
                                                            color: '#fff',
                                                          }}
                                                          type='button'
                                                          className='buy-b'
                                                        >
                                                          Reject
                                                        </a>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div></div>
                                                </div>
                                              </div>
                                            </div>

                                            /* 
<div className="buy-sec justify-content-between d-flex">
<div className="tab-img">
                      <img
                        src={"https://www.mousewait.xyz/disneyland/images/products_thumbnail/"+item.product_image}
                        className="img-fluid"
                        alt="big-top"
                      />
                    </div>

        <div className="buy-t">
          <h6>{item.product_name}</h6>
         <span>{item.user.requested_prod_username}</span> 
        </div> 
        <div className="buy-btn">
          <a  type="button" className="buy-b">select</a>
        </div>
      </div> */
                                          );
                                        })}
                                      </>

                                      /*  <tr className="in-sec">
    <th scope="row">
      <div className="tab-img">
         <img
          src={"https://www.mousewait.xyz/disneyland/images/products_thumbnail/"+obj.get_trade_request[0].product_image}
          className="img-fluid"
          alt="big-top"
        />
      </div>
    </th>
    <td>{obj.get_trade_request[0].product_name}</td>
    <td>{obj.get_trade_request[0].user.requested_prod_username}</td>
   
  
    <td />
  </tr> */
                                    )
                                  )}
                            </>
                          </div>

                          <div className='mws-mid-sec mt-3'>
                            <h5
                              style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              Pending Trade Requests
                            </h5>
                          </div>
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

export default MyTradeRequest;
