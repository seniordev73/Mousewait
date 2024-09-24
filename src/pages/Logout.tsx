import {  useEffect} from 'react';
import {  useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom'

type FormData = {
  password: string;
  username: string;
 
};



const Logout = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();






  useEffect(() => {
    alert('dd');
    
  }, []);





  return (
    <>

<>

</>


      </>
  )
}

export default Logout