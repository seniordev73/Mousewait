import React, { useCallback, useRef, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
type SearchData = {
  searchValue: string;
};

export const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    reset,
  } = useForm<SearchData>();

  let navigate = useNavigate();
  const onSearch = (data: any) => {
    if(data.searchValue == '')
      return;
    if (window.location.href.indexOf('disneyland') > -1) {
      window.location.href = '/disneyland/search/post/' + data.searchValue;
    } else {
      window.location.href = '/disneyworld/search/post/' + data.searchValue;
    }

    reset();
  };

  return (
    <div className='Search-bar'>
      <form
        className='space-y-6'
        onSubmit={handleSubmit2(onSearch)}
        method='POST'
      >
        <div className='input-group  bg-white border rounded-pill p-1'>
          <input
            type='text'
            placeholder='Search the Lounge'
            aria-describedby='button-addon4'
            className='form-control  border-0'
            {...register2('searchValue')}
          />
          <div className='input-group-prepend border-0'>
            <button
              id='button-addon4'
              type='submit'
              className='btn'
              style={{ zIndex: 0 }}
            >
              <i className='fa fa-search' />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
