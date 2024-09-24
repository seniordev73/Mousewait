import axios, { AxiosResponse } from 'axios';
import { FetchCatLoungesTypeWdw } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getCatLoungesWdwApi = async ({
  landid,
  landname,
  sortType,
  LoungeId,
  currentPage,
  searchValue,
  shortByTime,
}: FetchCatLoungesTypeWdw) => {
  const responseBody = (response: AxiosResponse) => response.data;
  const token = localStorage.getItem('token');
  let sorvalue = null;
  let sortByTime =
    shortByTime == 'true'
      ? `?page=${currentPage}&sortordefault=ww`
      : `?page=${currentPage}`;

  let pagename = landname
    .replace(/([/~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\?\- ])+/g, ' ');

  if(landid == '5') localStorage.setItem('pagename', 'Wdw LoungeLand');
  else localStorage.setItem('pagename', landname);

  const apiEndpoint =
    GET_BASE_URL + `/backend/api/v1/disneyworldHome/` + landid;

  if (searchValue != null) {
    const { data } = await axios
      .get<Lounge[]>(`${apiEndpoint}/search/post/${searchValue}${sortByTime}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(responseBody);
    return data.data;
  } else {
    const { data } = await axios
      .get<Lounge[]>(`${apiEndpoint}${sortByTime}`)
      .then(responseBody);
    return data.data;
  }
};
