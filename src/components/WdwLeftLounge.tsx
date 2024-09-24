import star from '../assets/img/star.png';
import MyMW from '../assets/img/MyMW.png';
import mws from '../assets/img/mws.png';
import WDW from '../assets/img/WDW.png';
import Schedule from '../assets/img/Schedule.png';
import Settings from '../assets/img/Settings.png';
import Logout from '../assets/img/Logout.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { setSortByTime } from '../redux/lounges/slice';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/cart/selectors';
import { useLocation } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import RightLoungeBest from '../components/WdwRightLoungeBest';
import { LoungeBox } from '../components/LoungeBox';
import { useForm } from 'react-hook-form';
const WdwLeftLounge = (props: any) => {
  let navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem('token') as any);
  const [userId, setUserId] = useState(localStorage.getItem('user_id') as any);
  const loginfrom = localStorage.getItem('loginfrom');
  const loungeland = localStorage.getItem('loungeland');
  const club333 = localStorage.getItem('club333');
  const [showMenu, setShowMenu] = useState<any | string>(false);

  const menuclick = () => {
    setShowMenu(!showMenu);
  };

  localStorage.getItem('token');

  const { items, totalPrice, totalCaunt } = useSelector(selectCart);
  const [isLoading, setIsLoading] = useState<any | string>(false);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // Set cart items to localStorage after second rerender
  useEffect(() => {
    setToken(localStorage.getItem('token') as any);
    setUserId(localStorage.getItem('user_id') as any);
  }, [token]);

  const location = useLocation();
  const [closeHamburger, setCloseHamburger] = useState(false);

  const onCloseHamburgerMenu = () => {
    setCloseHamburger(true);
    setOpen(false);
  }

  const onLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('email');
    localStorage.clear();
    setToken(null);
    setUserId(null);
    window.location.reload();
    navigate('/disneyworld/lounge/');
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
  const SideBarLinks = (closeSideBar: any) => {
    return (
      <nav className='navbar navbar-expand-md'>
        <div className={`collapse navbar-collapse ${isOpen == true && 'show'}`}>
          <ul className='navbar-nav flex-column p-0 m-0'>
            {/* <div className='right-side-bar'>
              <i onClick={ToggleSidebar} className='fa fa-plus plus-i'></i>
            </div> */}
            <li className='nav-item' onClick={closeSideBar}>
              <Link to='disneyland/notification'>Notifications</Link>
            </li>

            <li className='nav-item' onClick={closeSideBar}>
              <Link to='/disneyworld/lounge'>Wdw Talk</Link>
            </li>

            <li className='nav-item' onClick={closeSideBar}>
              <Link to='/disneyworld/lands/2/Wdw-Real-Time/'>
                Wdw Real-Time
              </Link>
            </li>
            <li className='nav-item' onClick={closeSideBar}>
              <Link to='/disneyworld/lands/0/the-hub/'>The Hub</Link>
            </li>

            <li className='nav-item new-color' onClick={closeSideBar}>
              <Link to={`/disneyworld/user/${userId}/mypost`}>MyMW</Link>
            </li>

            <li className='nav-item new-color' onClick={closeSideBar}>
              <Link to='disneyland/mystore'>Sticker Store</Link>
            </li>
            <li className='nav-item new-color' onClick={closeSideBar}>
              <Link to='/disneyworld/d/L/most-viewed/'>Best of the Day</Link>
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
              <Link className='new-nr' to='disneyland/lounge'>
                Disneyland
              </Link>
            </li>

            {loungeland == 'true' ? (
              <li className='nav-item' onClick={closeSideBar}>
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
              <li className='nav-item' onClick={closeSideBar}>
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

            <li className='nav-item' onClick={closeSideBar}>
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
      <div>
        <div className='backarrow' onClick={() => backMe()}>
          <i className='fa-solid fa-chevron-left'></i>
        </div>

        <Menu id="mobileHamburger"  right isOpen={isOpen} onOpen={handleIsOpen} onClose={handleIsOpen}>
          <SideBarLinks className='newMenuPadding' closeSideBar={closeSideBar} />
          <RightLoungeBest />
        </Menu>
      </div>
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
    </div>
  );
};

export default WdwLeftLounge;
