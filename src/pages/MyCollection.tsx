import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import { Placeholder } from '../components/Placeholder';

import { fetchMyCollection, fetchUser } from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import { LoungeHeader } from '../components/LoungeHeader';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ChangeEvent } from 'react';
import { postMyGift } from '../redux/lounges/slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';

const MyCollection = () => {
  const dispatch = useAppDispatch();
  const { myCollectionItem, userItem, status } = useSelector(selectLounges);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState<any | string>(false);
  const [modal, setModal] = useState(false);
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const { isLoggedIn } = useSelector(usersSelector);

  let sortType: any = null;
  let categoryId: any = null;
  //let currentPage: any = null;
  let searchValue: any = null;

  type FormData = {
    Id: number;
    UserName: string;
  };
  const [data, setData] = useState([]);
  const [Id, setId] = useState<number | any>('');
  const [UserName, setUserName] = useState<any | string>('');
  const [key, setKey] = useState<any | string>('');
  const [Notify, setIsNotify] = useState<any | string>();
  const [currentPage, setCurrentPage] = useState(1);
  const [myData, SetMyData] = useState<any | string>([]);

  useEffect(() => {
    //window.scrollTo(0, 0);
    dispatch(fetchMyCollection({ sortType, currentPage })).then((res: any) => {
      if (res.payload == undefined) {
        SetMyData((myCollectionItem as any).store);
      } else {
        SetMyData((prev: any) => [...prev, ...res.payload.store]);
      }
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

  async function search(key: any) {
    setKey(key);
    if (key.length > 0) {
      dispatch(fetchUser({ key }));
    }
  }

  useEffect(() => {
    setValue('Id', Id);
  }, [Id]);
  useEffect(() => {
    setValue('UserName', UserName);
  }, [UserName]);

  const getUserName = (username: any) => {
    setUserName(username);
  };
  //console.log(myCollectionItem)

  const myGift = (Id: any) => {
    setModal(true);
    setId(Id);
  };

  const onSubmit = (data: any) => {
    window.scrollTo(0, 0);
    dispatch(fetchMyCollection({ sortType, currentPage }));
    setModal(false);
    dispatch<any>(postMyGift(data)).then((res: any) => {
      //console.log(res)
      // Notify(toast(res.payload.data.message));
    });
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
                    <div className='container p-0'>
                      <div className='row'>
                        <div className='buy-m'>
                          <div className='mws-mid-sec mb-2'>
                            <h5 className='mid-head'>My Collection</h5>
                          </div>
                          <h6 className='mid-sub' style={{ fontWeight: '600' }}>
                            <span>
                              Credit Balance :{' '}
                              {(myCollectionItem as any).credit_balance}
                            </span>
                          </h6>

                          <>
                            {/*   {console.warn(data)} */}
                            <PureModal
                              header='Gift To MW Friend'
                              isOpen={modal}
                              closeButton={<i className='fa fa-close my-b' />}
                              closeButtonPosition='bottom'
                              onClose={() => {
                                setModal(false);
                                return true;
                              }}
                            >
                              <form
                                className='space-y-6'
                                onSubmit={handleSubmit(onSubmit)}
                                method='POST'
                              >
                                <div
                                  style={{ position: 'fixed', top: '2.7rem' }}
                                >
                                  <input
                                    type='text'
                                    className='inp'
                                    placeholder='Search MW Friend'
                                    {...register('UserName')}
                                    onChange={(e) => search(e.target.value)}
                                  />

                                  <input type='hidden' {...register('Id')} />

                                  <div
                                    className='mw-post text-center'
                                    style={{
                                      position: 'fixed',
                                      right: '30px',
                                      top: '50px',
                                    }}
                                  >
                                    <input
                                      className='MW-btn'
                                      type='Submit'
                                      value='Submit'
                                      style={{ padding: '0.2rem 0.7rem' }}
                                    />
                                  </div>
                                </div>

                                {userItem.length > 0 ? (
                                  <ul
                                    style={{
                                      height: '10rem',
                                      marginTop: '2rem',
                                    }}
                                  >
                                    {userItem.map((item: any) => (
                                      <li
                                        onClick={() => getUserName(item.value)}
                                        style={{
                                          padding: '10px 0px 5px 0px',
                                          borderBottom: '1px solid #000',
                                          cursor: 'pointer',
                                        }}
                                      >
                                        {item.value}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <ul
                                    style={{
                                      height: 'auto',
                                      marginTop: '1rem',
                                    }}
                                  >
                                    {/*   {data.map((item:any)=>
      
            <li style={{padding:'10px 0px 5px 0px',borderBottom: '1px solid #000',cursor: 'pointer'}}>
            {item.user_name} 
            </li>
            )} */}
                                  </ul>
                                )}
                              </form>
                            </PureModal>

                            <div className='mws-table-main mt-2'>
                              <div className='table-responsive'>
                                <table className='table table-borderless'>
                                  <thead>
                                    <tr className='tab-nav'>
                                      <th
                                        style={{
                                          width: '15%',
                                          fontWeight: '500',
                                        }}
                                        scope='col'
                                      >
                                        Image
                                      </th>
                                      <th
                                        style={{
                                          width: '20%',
                                          fontWeight: '500',
                                        }}
                                        scope='col'
                                      >
                                        Product
                                      </th>
                                      <th
                                        style={{
                                          width: '25%',
                                          fontWeight: '500',
                                        }}
                                        scope='col'
                                      >
                                        Description
                                      </th>
                                      <th
                                        style={{
                                          width: '20%',
                                          fontWeight: '500',
                                        }}
                                        scope='col'
                                      >
                                        Status
                                      </th>
                                      <th
                                        style={{
                                          width: '20%',
                                          fontWeight: '500',
                                        }}
                                        scope='col'
                                      >
                                        Action
                                      </th>
                                    </tr>
                                  </thead>

                                  <tbody className='tab-body'>
                                    {status === 'loading'
                                      ? [...new Array(9)]?.map((_, index) => (
                                          <Placeholder key={index} />
                                        ))
                                      : myData?.map((obj: any) => (
                                          <tr className='in-sec'>
                                            <th scope='row'>
                                              <div className='tab-img'>
                                                <img
                                                  src={
                                                    GET_BASE_URL_IMAGE +
                                                    '/disneyland/images/products_thumbnail/' +
                                                    obj.product_image
                                                  }
                                                  className='img-fluid'
                                                  alt='big-top'
                                                />
                                              </div>
                                            </th>
                                            <td style={{ fontWeight: '500' }}>
                                              {obj.product_name}
                                            </td>
                                            <td style={{ fontWeight: '500' }}>
                                              {obj.product_description}
                                            </td>
                                            <td style={{ fontWeight: '500' }}>
                                              {obj.status == '1' && <>Owner</>}
                                              {obj.status == '2' && (
                                                <>
                                                  Gift from{' '}
                                                  {obj.user?.user_name}
                                                </>
                                              )}
                                              {obj.status == '3' && <>Traded</>}
                                            </td>
                                            <td>
                                              <div className='buy-btn'>
                                                <a
                                                  onClick={() => myGift(obj.id)}
                                                  /* onClick={() => setModal(true)} */ style={{
                                                    background: '#a0b7e9',
                                                    borderRadius: '0.5rem',
                                                    padding: '0.5rem',
                                                    fontSize: '1rem',
                                                    textDecoration: 'none',
                                                    color: '#fff',
                                                  }}
                                                  type='button'
                                                  className='buy-b'
                                                >
                                                  Gift
                                                </a>
                                              </div>
                                            </td>
                                          </tr>
                                        ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </>
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

export default MyCollection;
