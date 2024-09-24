import axios, { AxiosResponse } from 'axios';
import { FetchCatLoungesType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getCatLoungesApi = async ({
  landid,
  landname,
  sortType,
  LoungeId,
  currentPage,
  searchValue,
  shortByTime,
}: FetchCatLoungesType) => {
  const responseBody = (response: AxiosResponse) => response.data;
  const token = localStorage.getItem('token');
  
  const user_id = localStorage.getItem('user_id');
  let sorvalue = null;
  let sortByTime =
    shortByTime == 'true'
      ? `?page=${currentPage}&sortordefault=ww`
      : `?page=${currentPage}`;
  const apiEndpoint = GET_BASE_URL + `/backend/api/v1/home/` + landid;

  if (searchValue != null) {
    const { data } = await axios
      .get<Lounge[]>(`${apiEndpoint}/search/post/${searchValue}${sortByTime}&user_id=${user_id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(responseBody);
    return data;
  } else {
    if (landid == 3) {
      localStorage.setItem('pagename', 'lounge.land');
    }
    else if(landid == 4) 
      localStorage.setItem('pagename', 'CLUB 333');
    else {
      let pagename = landname
        .replace(/([/~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\?\- ])+/g, ' ');
      localStorage.setItem('pagename', pagename);
    }

    const { data } = await axios
      .get<Lounge[]>(`${apiEndpoint}${sortByTime}&user_id=${user_id}`)
      .then(responseBody);
    return data;
  }
};
