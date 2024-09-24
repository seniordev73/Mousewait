import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { setSortByTime } from '../redux/lounges/slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import midBanner from '../assets/img/mid-banner-img.png';
import { Search } from '../components/Search';
export const LoungeHeader = () => {
  const [stTime, SetStTime] = useState<any>(false);
  const srtvalue = localStorage.getItem('shortByTime');
  const loungeland = localStorage.getItem('loungeland');
  const getpagename = localStorage.getItem('pagename');
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

  const pageReload = () => {
    window.scrollTo(0, 0);
    window.location.reload();
  }
  return (
    <>
      <div className='banner-img'>
        {
          (window.location.pathname != '/disneyworld/lounge' && window.location.pathname != '/disneyworld/lounge/') ? 
          <>
            <img src={midBanner} className='img-fluid' alt='mid-banner-img' />
            <Link to='/disneyworld/lounge' className="banner-logo"></Link>
          </>
          : 
          <>
            <img src={midBanner} className='img-fluid' alt='mid-banner-img' onClick={pageReload} style={{cursor: 'pointer'}}/>
            {/* <Link to='/disneyland/lounge/' className="banner-logo" ></Link> */}
          </>
        }
      </div>
      <div className='top-trend'>
        <div className='text-head-trend text-center'>
          <h6 className='trending-t'>TRENDING SECTION</h6>
          <h6 className='trending-section-new'>
            {/*   {getpagename} (the name of the Land) */}
            {getpagename != '' ? <> {getpagename}</> : <> Disneyworld Lounge</>}
          </h6>
          <Search />
        </div>
      </div>
    </>
  );
};
