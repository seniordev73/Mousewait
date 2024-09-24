import { useCallback, useEffect, useRef, useState } from 'react';
import { Search } from '../components/Search';
import RightLoungeBest from '../components/RightLoungeBest';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLounges, fetchMyProfile } from '../redux/lounges/slice';
import { useForm } from 'react-hook-form';
import { GET_BASE_URL_IMAGE, dTime } from '../constants/apiEndpoints';
// import midbanner from '../assets/img/user_dp.png';
const RightLounge = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user_id');
  const userName = localStorage.getItem('user_name');
  const email = localStorage.getItem('email');
  const image = localStorage.getItem('image');

  return (
    <div className='rightbar'>
      {token && (
        <div className='pro-main'>
          <div className='profile-sec justify-content-between d-flex'>
            <div className='small-box d-flex'>
              <div className='small-c small-cc'>
                <img
                  src={
                    GET_BASE_URL_IMAGE +
                    '/disneyland/images/thumbs/' +
                    image +
                    dTime
                  }
                  className='img-fluid'
                />
              </div>
              <div className='small-tt'>
                <h6>{userName}</h6>
                {/*    <span style={{ color: 'black' }}>{email}</span> */}
              </div>
            </div>
            {/*  <div className='pro-right'>
              <span className='rounded-pill'>Pro</span>
            </div> */}
          </div>
        </div>
      )}

      <RightLoungeBest />
    </div>
  );
};

export default RightLounge;
