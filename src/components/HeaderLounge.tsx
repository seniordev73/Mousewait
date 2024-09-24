import logoSvg from '../assets/img/pizza-logo.svg';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCart } from '../redux/cart/selectors';
import { useLocation } from 'react-router';
import { useEffect, useRef } from 'react';

const HeaderLounge = () => {
  const { items, totalPrice, totalCaunt } = useSelector(selectCart);

  const isMounted = useRef(false);

  // Set cart items to localStorage after second rerender
  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  const location = useLocation();

  return (
    <div className='mousewait-bg'>
      {/*===== MW-Deshborad-sec Start =======*/}
      <div className='mousewait-deshborad'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='des-main-sec'>
              {/* ===leftbar start=== */}
              <div className='leftbar'>
                <ul className='nav flex-column'>
                  <li className='nav-item'>
                    <a className='nav-link' aria-current='page' href='#'>
                      <i className='fa-solid fa-star' />
                      Notifications
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' href='#'>
                      <i className='fa-solid fa-calendar' />
                      MyMW
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' href='#'>
                      <i className='fas fa-th-large' />
                      MW Store
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' href='#'>
                      <i className='fa-solid fa-circle' />
                      WDW Talk
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' href='#'>
                      <i className='fa-solid fa-calendar' />
                      Schedule
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' href='#'>
                      <i className='fa-solid fa-gear' />
                      Settings
                    </a>
                  </li>
                </ul>
                <ul className='nav'>
                  <li className='nav-item logout'>
                    <a className='nav-link' href='#'>
                      <i className='fa-solid fa-arrow-right-from-bracket' />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
              {/* ===leftbar end=== */}
              {/* ===mid-sec start=== */}
              <div className='mid-main'>
                <div className='container'>
                  <div className='mid-sec'>
                    <div className='banner-img'>
                      <img
                        src='images/mid-banner-img.png'
                        className='img-fluid'
                        alt='mid-banner-img'
                      />
                    </div>
                    <div className='text-head text-center'>
                      <ul className='p-0 m-0'>
                        <li>
                          <a href=''>Best of the Day</a>
                        </li>
                        <li>
                          <a href=''>Sticker Store</a>
                        </li>
                        <li>
                          <a href=''>Disneyland Talk</a>
                        </li>
                        <li>
                          <a href=''>Real-Time</a>
                        </li>
                        <li>
                          <a href=''>The Hub</a>
                        </li>
                      </ul>
                    </div>
                    {/*-=====mobile-view start ======-*/}
                    <div className='top-text-m text-center p-2'>
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
                            <button
                              id='button-addon4'
                              type='button'
                              className='btn'
                            >
                              <i className='fa fa-search' />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*-=====mobile-view start ======-*/}
                    <div className='mid-card-sec'>
                      <div className='card-m rounded'>
                        <div className='card-s-img justify-content-between d-flex'>
                          <div className='small-box d-flex'>
                            <div className='small-c'>
                              <img
                                src='images/card-s-img.png'
                                className='img-fluid'
                                alt='img'
                              />
                            </div>
                            <div className='small-tt'>
                              <h6>Disney Diane316</h6>
                              <span>2030 #10 Quality #5</span>
                              <p>March 12, 2021</p>
                            </div>
                          </div>
                          <div className='icon-img'>
                            <i className='fa-solid fa-ellipsis-vertical' />
                          </div>
                        </div>
                        <div className='card-img-b my-2'>
                          <img
                            src='images/card-m-img.png'
                            className='card-img-top img-fluid'
                            alt='img'
                          />
                        </div>
                        <div className='card-body'>
                          <h6>This is the post text</h6>
                          <div className='chat-icon d-flex'>
                            <span>
                              <i className='fa-solid fa-thumbs-up' /> 17
                            </span>
                            <span>
                              <i className='fa-solid fa-comment-dots' /> 2
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='card-m rounded'>
                        <div className='card-m rounded'>
                          <div className='card-s-img justify-content-between d-flex'>
                            <div className='small-box d-flex'>
                              <div className='small-c'>
                                <img
                                  src='images/card-s-img.png'
                                  className='img-fluid'
                                  alt='img'
                                />
                              </div>
                              <div className='small-tt'>
                                <h6>Disney Diane316</h6>
                                <span>2030 #10 Quality #5</span>
                                <p>March 12, 2021</p>
                              </div>
                            </div>
                            <div className='icon-img'>
                              <i className='fa-solid fa-ellipsis-vertical' />
                            </div>
                          </div>
                          <div className='card-img-b my-2'>
                            <img
                              src='images/card-m-img.png'
                              className='card-img-top img-fluid'
                              alt='img'
                            />
                          </div>
                          <div className='card-body'>
                            <h6>This is the post text</h6>
                            <div className='chat-icon d-flex'>
                              <span>
                                <i className='fa-solid fa-thumbs-up' /> 17
                              </span>
                              <span>
                                <i className='fa-solid fa-comment-dots' /> 2
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ===mid-sec End=== */}
              {/* ===rightbar start=== */}
              <div className='rightbar'>
                <div className='pro-main'>
                  <div className='profile-sec justify-content-between d-flex'>
                    <div className='small-box d-flex'>
                      <div className='small-c'>
                        <img
                          src='images/user_dp.png'
                          className='img-fluid'
                          alt='img'
                        />
                      </div>
                      <div className='small-tt'>
                        <h6>Abhishek Saha</h6>
                        <span>pixabuddy@gmail.com</span>
                      </div>
                    </div>
                    <div className='pro-right'>
                      <span className='rounded-pill'>Pro</span>
                    </div>
                  </div>
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
              {/* ===rightbar End=== */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLounge;
