import styles from './Search.module.scss'
import React, { useCallback, useRef, useState } from 'react'

import { Link, useNavigate,useParams } from 'react-router-dom'
import {  useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
type SearchData = {
  searchValue: string,
};

const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState("")
  const { register: register2,formState: { errors: errors2 }, handleSubmit: handleSubmit2,} =  useForm<SearchData>();
  
  let navigate = useNavigate();

  // Optimization the search field. Update setSerchValue after same time.
  const onSearch =(data:any) =>{
  
   navigate('/disneyland/search/post/'+data.searchValue);

  }
 
  return (
    <div className="Search-bar">
    <form className="space-y-6" onSubmit={handleSubmit2(onSearch)} method="POST"
>
      <div className="input-group  bg-white border rounded-pill p-1">
        <input
          type="text"
          placeholder="Search the Lounge"
          aria-describedby="button-addon4"
          className="form-control  border-0"
          {...register2("searchValue")} 
        />
        <div className="input-group-prepend border-0">
          <button
            id="button-addon4"
            type="submit"
            className="btn"
          >
            <i className="fa fa-search" />
          </button>
        </div>
      </div>
      </form>
    </div>
  );
}

export default Search