import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';
import { Placeholder } from '../components/Placeholder';
import { fetchMyStore, postMyStore } from '../redux/lounges/slice';
//import { fetchMyHistory } from '../redux/lounges/slice'
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import { LoungeHeader } from '../components/LoungeHeader';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';

// @ts-ignore
import MetaTags from 'react-meta-tags';

const MyStore = () => {
  const dispatch = useAppDispatch();
  const { myStoreItem, status } = useSelector(selectLounges);
  console.log('uyoga');

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const { isLoggedIn } = useSelector(usersSelector);

  let sortType: any = null;
  let categoryId: any = null;
  let currentPage: any = null;
  let searchValue: any = null;

  useEffect(() => {
    
    if (token == null) {
      navigate('/disneyland/login');
    }

    window.scrollTo(0, 0);
    dispatch(fetchMyStore({ sortType, currentPage }));
    // dispatch(fetchMyHistory({ sortType,  currentPage }))
  }, []);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [modal, setModal] = useState(false);
  const [Id, setId] = useState<number | any>('');
  const [Notify, setIsNotify] = useState<any | string>();
  type FormData = {
    Id: number;
    //UserName: string;
  };
  useEffect(() => {
    if (token == null) {
      navigate('/disneyland/login');
    }


    setValue('Id', Id);
  }, [Id]);

  let navigate = useNavigate();
  const myStoreBuy = (Id: any) => {

    if (token == null) {
      navigate('/disneyland/login');
    } else {
      setModal(true);
      setId(Id);
    }
  };

  const onSubmit = (data: any) => {

    if (token == null) {
      navigate('/disneyland/login');
    }

    window.scrollTo(0, 0);
    dispatch(fetchMyStore({ sortType, currentPage }));
    setModal(false);
    dispatch<any>(postMyStore(data)).then((res: any) => {
      // Notify(toast(res.payload.data));
    });
  };

  /* function renderInputField(obj: any) {
    if (
      obj.product_quantity > 0 &&
      obj.product_isauction === 0 &&
      token != null
    ) {
      return <td>Buy Now </td>;
    } else {
      return null;
    }
  } */
  /*  const pathname = window.location.pathname;
   console.log(pathname)
  console.log(pathname.substring(pathname.lastIndexOf('/') + 1));
const lastsegmet = pathname.substring(pathname.lastIndexOf('/') + 1);
console.log(myStoreItem) */

  return (
    <>

    <MetaTags>
        <title>Mousewait Store</title>
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

                <PureModal
                  header='Please Confirm'
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
                    <div style={{ position: 'fixed', top: '2.7rem' }}>
                      <input type='hidden' {...register('Id')} />

                      <div
                        style={{
                          position: 'fixed',
                          width: '100%',
                          height: '10rem',
                          left: '0',
                          background: '#fff',
                          padding: '1rem',
                          fontSize: '14px',
                          wordBreak: 'break-word',
                        }}
                      >
                        By clicking Submit you will purchase this item with your
                        Credits and it cannot be undone, are you sure?
                      </div>

                      <div
                        className='mw-post text-center'
                        style={{
                          position: 'fixed',
                          top: '8rem',
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
                  </form>
                </PureModal>

                <TabPanel>
                  <div className='mws-mid-sec'>
                    <h5 className='mid-head'>MouseWait Store</h5>
                    <h6 className='mid-sub'>
                      <span>
                        Credit Balance : {(myStoreItem as any).credit_balance}
                      </span>
                    </h6>
                    <h6 className='mt-2'>
                      <span>
                        Purchase Stickers with MouseWait Credits below. You can
                        use this sticker you own in the Lounge just as you would
                        use emojis!
                      </span>
                    </h6>
                  </div>

                  <div className='mws-table-main mt-2'>
                    <div className='table-responsive'>
                      <table className='table table-borderless'>
                        <thead>
                          <tr className='tab-nav'>
                            <th
                              style={{ width: '15%', fontWeight: '500' }}
                              scope='col'
                            >
                              Image
                            </th>
                            <th
                              style={{ width: '20%', fontWeight: '500' }}
                              scope='col'
                            >
                              Product
                            </th>
                            <th
                              style={{ width: '14%', fontWeight: '500' }}
                              scope='col'
                            >
                              Description
                            </th>
                            <th
                              style={{ width: '18%', fontWeight: '500' }}
                              scope='col'
                            >
                              Available
                            </th>
                            <th
                              style={{ width: '13%', fontWeight: '500' }}
                              scope='col'
                            >
                              Credit
                            </th>
                            <th
                              style={{ width: '20%', fontWeight: '500' }}
                              scope='col'
                            >
                              Action
                            </th>
                          </tr>
                        </thead>

                        <tbody className='tab-body'>
                          {status === 'loading'
                            ? [...new Array(9)].map((_, index) => (
                                <Placeholder key={index} />
                              ))
                            : (myStoreItem as any).store?.map((obj: any) => (
                                <tr className='in-sec'>
                                  <th scope='row'>
                                    <div className='tab-img'>
                                      <img
                                        src={
                                          GET_BASE_URL_IMAGE +
                                          '/disneyland/images/products_fullsize/' +
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
                                    {obj.product_quantity}
                                  </td>
                                  <td style={{ fontWeight: '500' }}>
                                    {obj.product_price}
                                  </td>

                                  {/*  {renderInputField(obj)} */}
                                  {obj.product_quantity > 0 &&
                                  obj.isauction == 0 ? (
                                    <td>
                                      {/*    <a
                                        onClick={() => myStoreBuy(obj.id)}
                                        type='button'
                                        className='buy-b buy-from-mystore'
                                      >
                                        Buy Now
                                      </a> */}

                                      <a
                                        onClick={() => myStoreBuy(obj.id)}
                                        /* onClick={() => setModal(true)} */ style={{
                                          background: '#a0b7e9',
                                          borderRadius: '0.5rem',
                                          padding: '0.5rem',
                                          fontSize: '1rem',
                                          textDecoration: 'none',
                                          color: '#fff',
                                        }}
                                        type='button'
                                        className='buy-b mycollection-buy'
                                      >
                                        Buy
                                      </a>
                                    </td>
                                  ) : (
                                    <td></td>
                                  )}
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabPanel>
              </Tabs>

              {/*-=====store-tab-main end ======-*/}
              {/*-=====store-table-main start ======-*/}
            </div>
          </div>
          {/*-=====MouseWait Store-page end ======-*/}
        </div>
      </div>
    </>
  );
};

export default MyStore;
