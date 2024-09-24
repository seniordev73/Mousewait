import star from '../assets/img/star.png';
import MyMW from '../assets/img/MyMW.png';
import mws from '../assets/img/mws.png';
import WDW from '../assets/img/WDW.png';
import Sticker from '../assets/img/sticker.png';
import Best from '../assets/img/best.png';
import Real from '../assets/img/real.png';
import Hub from '../assets/img/hub.png';
import Disney from '../assets/img/disneyland.png';
import Schedule from '../assets/img/Schedule.png';
import Settings from '../assets/img/Settings.png';
import Logout from '../assets/img/Logout.png';
import { Link, useNavigate } from 'react-router-dom';
import { setSortByTime } from '../redux/lounges/slice';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/cart/selectors';
import { useLocation } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import RightLoungeBest from '../components/RightLoungeBest';
import { LoungeBox } from '../components/LoungeBox';

import {
  fetchLounges,
  fetchUserMenu,
  fetchStickyLounge,
} from '../redux/lounges/slice';


const LeftLounge = (props: any) => {
  let navigate = useNavigate();

  const [ token, setToken] = useState(localStorage.getItem('token') as any);
  const [ userId, setUserId] = useState(localStorage.getItem('user_id') as any);
  const [ loginfrom, setLoginFrom] = useState(localStorage.getItem('loginfrom'));
  const [ loungeland, setLoungeLand ] = useState(localStorage.getItem('loungeland'));
  const [ club333, setClub333 ] = useState(localStorage.getItem('club333'));
  const [showMenu, setShowMenu] = useState<any | string>(false);

  localStorage.getItem('token');

  const [isLoading, setIsLoading] = useState<any | string>(false);
  const [assignMenu, SetAssignMenu] = useState<any | string>([]);

  // Set cart items to localStorage after second rerender
  useEffect(() => {
    setToken(localStorage.getItem('token') as any);
    setUserId(localStorage.getItem('user_id') as any);
    
    setLoginFrom(localStorage.getItem('loginfrom'));

    if(assignMenu.length > 0) {
      assignMenu.map((item: any) => {
        if( item.rights_id == '13' )
           localStorage.setItem('loungeland', 'true');
      })
    }

    if(assignMenu.length > 0) {
      assignMenu.map((item: any) => {
        if( item.rights_id == '14' )
           localStorage.setItem('club333', 'true');
      })
    }

    setClub333(localStorage.getItem('club333'));
    setLoungeLand(localStorage.getItem('loungeland'));
  }, [token, assignMenu]);

  useEffect(() => {

    dispatch(fetchUserMenu({ loginuserid: userId })).then((res: any) => {
      SetAssignMenu(res.payload);
    });
  }, []);

  const location = useLocation();

  const onLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('email');
    localStorage.clear();
    setToken(null);
    setUserId(null);
    window.location.reload();
    navigate('/disneyland/lounge/');
  };
  const [isOpen, setOpen] = useState<any | string>(false);
  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  const [stTime, SetStTime] = useState<any>(false);
  const srtvalue = localStorage.getItem('shortByTime');
  const dispatch = useAppDispatch();

  const [closeHamburger, setCloseHamburger] = useState(false);

  const onCloseHamburgerMenu = () => {
    setCloseHamburger(true);
    setOpen(false);
  }

  useEffect(() => {
    srtvalue == null ? SetStTime(false) : SetStTime(srtvalue);
  }, [srtvalue]);
  const onSoryTime = (sorTBY: any) => {
    SetStTime(sorTBY);
    localStorage.setItem('shortByTime', sorTBY);
    let SortTimeType: any = sorTBY;
    let sortingTime: any = null;

    dispatch(setSortByTime({ SortTimeType }));
    window.location.reload();
  };
  const SideBarLinks = (closeSideBar: any) => {
    return (
      <nav className='navbar navbar-expand-md'>
        <div className={`collapse navbar-collapse ${isOpen == true && 'show'}`}>
          <ul className='navbar-nav flex-column p-0 m-0'>
            <li className='nav-item' onClick={closeSideBar}>
              <Link to='disneyland/notification'>Notifications</Link>
            </li>

            <li className='nav-item' onClick={closeSideBar}>
              <Link to='/disneyland/lounge/'>Disneyland Talk</Link>
            </li>

            <li className='nav-item' onClick={closeSideBar}>
              <Link to='/disneyland/lands/1/Disneyland-Real-Time/'>
                Disneyland Real-Time
              </Link>
            </li>
            <li className='nav-item' onClick={closeSideBar}>
              <Link to='/disneyland/lands/0/the-hub/'>The Hub</Link>
            </li>

            <li className='nav-item new-color' onClick={closeSideBar}>
              <Link to={`/disneyland/user/${userId}/mypost`}>MyMW</Link>
            </li>

            <li className='nav-item new-color' onClick={closeSideBar}>
              <Link to='disneyland/mystore'>Sticker Store</Link>
            </li>
            <li className='nav-item new-color' onClick={closeSideBar}>
              <Link to='/disneyland/d/L/most-viewed/'>Best of the Day</Link>
            </li>

            {stTime != 'true' ? (
              <li
                className='nav-item a-sortime'
                onClick={() => onSoryTime('true')}
              >
                Sort by Time
              </li>
            ) : (
              <li
                className='nav-item a-sortime'
                onClick={() => onSoryTime('false')}
              >
                Default
              </li>
            )}
            <li className='nav-item' onClick={closeSideBar}>
              <Link className='new-nr' to='disneyworld/lounge'>
                WDW Talk
              </Link>
            </li>

            {loungeland == 'true' ? (
              <li className='nav-item ' onClick={closeSideBar}>
                <Link
                  className={
                    location.pathname == '/loungeland/'
                      ? 'selectmenu new-nr'
                      : 'new-nr'
                  }
                  to='/loungeland/'
                >
                  LOUNGE.LAND
                </Link>
              </li>
            ) : (
              <li></li>
            )}

            {club333 == 'true' ? (
              <li className='nav-item ' onClick={closeSideBar}>
                <Link
                  className={
                    location.pathname == '/club333/'
                      ? 'selectmenu new-nr'
                      : 'new-nr'
                  }
                  to='/club333/'
                >
                  CLUB 333
                </Link>
              </li>
            ) : (
              <li></li>
            )}

            <LoungeBox
              isVisible={closeHamburger}
              setVisible={setCloseHamburger}
              onCloseMenu={onCloseHamburgerMenu}
            />

            <li className='nav-item desk-li' onClick={closeSideBar}>
              <div className='nav-icon'>
                <img src={Settings} className='img-fluid' alt='img' />
              </div>
              <Link className='new-nr' to='disneyland/setting'>
                Settings
              </Link>
            </li>

            {token != null && loginfrom == 'true' ? (
              <li className='nav-item new-color-login-out' onClick={onLogOut}>
                <div className='nav-icon'>
                  <img src={Logout} className='img-fluid' alt='img' />
                </div>
                <a href='javascript:void(0)'>Logout</a>
              </li>
            ) : (
              <></>
            )}

            {token == null ? (
              <li className='nav-item new-color-login-out'>
                <div className='nav-icon'>
                  <img src={Logout} className='img-fluid' alt='img' />
                </div>
                <Link to='disneyland/login'>Login</Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </nav>
    );
  };

  const [open, setIsopen] = useState(false);

  const ToggleSidebar = () => {
    setOpen(false);
    open === true ? setIsopen(false) : setIsopen(true);
  };

  const backMe = () => {
    window.history.back();
  };

  return (
    <div className='leftbar'>
      <div className='leftbarContainer'>
        <div className='listcheck'>
          <SideBarLinks closeSideBar={closeSideBar} />
        </div>

        <>
          <div className='container-fluid mobile-right-bar'>
            <div
              className={`sidebar ${open == true ? 'active' : ''}`}
              onClick={ToggleSidebar}
            >
              <RightLoungeBest />
            </div>
            <div
              className={`sidebar-overlay ${open == true ? 'active' : ''}`}
              onClick={ToggleSidebar}
            ></div>
          </div>
        </>
      </div>

      <div>
        <div className='backarrow' onClick={() => backMe()}>
          <i className='fa-solid fa-chevron-left'></i>
        </div>
        <Menu 
            id="mobileHamburger"
            right 
            isOpen={isOpen} 
            onOpen={handleIsOpen}
            onClose={handleIsOpen}
            >
          <SideBarLinks className='newMenuPadding' closeSideBar={closeSideBar} />
          <RightLoungeBest />
        </Menu>
      </div>
    </div>
  );
};

export default LeftLounge;
