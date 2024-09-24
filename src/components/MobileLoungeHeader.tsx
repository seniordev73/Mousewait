import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { setSortByTime } from '../redux/lounges/slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';

import { Search } from '../components/Search';

export const MobileLoungeHeader = () => {
  const [stTime, SetStTime] = useState<any>(false);
  const srtvalue = localStorage.getItem('shortByTime');
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    srtvalue == null ? SetStTime(false) : SetStTime(srtvalue);
  }, [srtvalue]);
  const onSoryTime = (sorTBY: any) => {
    SetStTime(sorTBY);
    localStorage.setItem('shortByTime', sorTBY);
    let SortTimeType: any = sorTBY;
    let sortingTime: any = null;

    dispatch(setSortByTime({ SortTimeType }));
  };

  return (
    <>
      {/*-=====mobile-view start ======-*/}
      <div className='top-text-m text-center p-2'>
        {/*       <div className='top-mw text-center'>
          <h6>Top MouseWaiters of the Day</h6>
          <div className='top-sp d-flex justify-content-center'>
            <p>
              <span>1. grumpypapa 56.38 #5 (DL)</span>
              <span>2. grapesoda 52.67 #5 (DL)</span>
            </p>
          </div>
        </div> */}

        {/*  <div className='text-head-m text-center'>
          <ul className='p-0 m-0'>
            <li
              className={
                location.pathname == '/disneyland/d/L/most-viewed/'
                  ? 'selectmenu'
                  : ''
              }
            >
              <Link to='/disneyland/d/L/most-viewed/'>Best of the Day |</Link>
            </li>
            <li
              className={
                location.pathname == '/disneyland/mystore/' ? 'selectmenu' : ''
              }
            >
              <Link to='/disneyland/mystore/'>Sticker Store |</Link>
            </li>
            <li
              className={
                location.pathname == '/disneyland/lands/7/Disneyland-Talk/'
                  ? 'selectmenu'
                  : ''
              }
            >
              <Link to='/disneyland/lands/0/Disneyland-Talk/'>
                Disneyland Talk |
              </Link>
            </li>
            <br />
            <li
              className={
                location.pathname == '/disneyland/lands/1/Disneyland-Real-Time/'
                  ? 'selectmenu'
                  : ''
              }
            >
              <Link to='/disneyland/lands/1/Disneyland-Real-Time/'>
                Real-Time |
              </Link>
            </li>
            <li
              className={
                location.pathname == '/disneyland/lands/0/the-hub/'
                  ? 'selectmenu'
                  : ''
              }
            >
              <Link to='/disneyland/lands/0/the-hub/'>The Hub |</Link>
            </li>
            {stTime != 'true' ? (
              <li className='a-sortime' onClick={() => onSoryTime('true')}>
                Sort By Time
              </li>
            ) : (
              <li className='a-sortime' onClick={() => onSoryTime('false')}>
                Default
              </li>
            )}
          </ul>
        </div> */}
      </div>
      {/*-=====mobile-view start ======-*/}
    </>
  );
};
