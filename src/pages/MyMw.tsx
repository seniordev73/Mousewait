import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useNavigate, useParams } from 'react-router-dom';

import { Placeholder } from '../components/Placeholder';
import { LoungeHeader } from '../components/LoungeHeader';
import { LoungeBox } from '../components/LoungeBox';
import { LoungeList } from '../components/LoungeList';
import { MwLoungeList } from '../components/MwLoungeList';
import { MobileLoungeHeader } from '../components/MobileLoungeHeader';
import { fetchMyFav } from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { usersSelector } from '../redux/users/selectors';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import stickerImage from '../assets/img/stickers.jpg';

import { postLounge } from '../redux/lounges/slice';
// @ts-ignore
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';

type FormData = {
  chat_msg: string;
};

type SearchData = {
  searchValue: string;
};

const MyMw = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const { search } = useParams();
  const UserIdLogin = localStorage.getItem('user_id');
  //alert(UserId)
  const { items, status, sortByTime } = useSelector(selectLounges);
  const token = localStorage.getItem('token');
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );

  const [showPopup, setShowPopup] = useState<any | string>(true);
  const [isLoading, setIsLoading] = useState<any | string>(false);

  let subtitle: any;

  let sortType: any = null;
  let LoungeId: any = null;
  let currentPage: any = null;
  let searchValue: any = null;
  let UserId: any = UserIdLogin;
  useEffect(() => {

    if (token == null) {
      navigate('/disneyland/login');
    }


    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  const handleLoginClick = () => {
    setShowPopup(!showPopup);
  };
  useEffect(() => {

    if (token == null) {
      navigate('/disneyland/login');
    }

    window.scrollTo(0, 0);
    if (search) {
      searchValue = search;
    }
    loadProgressBar();
    dispatch(fetchMyFav({ sortType, UserId, currentPage }));
  }, [shortByTime, search]);
  
  return (
    <>
      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec'>
            <LoungeHeader />
            <MobileLoungeHeader />
            <div className='mid-card-sec'>
              {status === 'error' ? (
                <div className='content__error-info'>
                  <h2>Error</h2>
                  <p>Please try to open the page later.</p>
                </div>
              ) : (
                <div className='content__items'>
                  {/*        <div>
  <LoungeBox  onSubmit={onSubmit} register={register} handleSubmit={handleSubmit} setValue={setValue}  isLoading={isLoading} />
        </div> */}

                  {/* */}

                  {status === 'loading'
                    ? [...new Array(9)]?.map((_, index) => (
                        <Placeholder key={index} />
                      ))
                    : items?.map((obj) => <MwLoungeList obj={obj} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyMw;
