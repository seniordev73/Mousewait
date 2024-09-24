import axios, { AxiosResponse } from 'axios';
import { FetchLoungesType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL, LOCAL_BASE_URL } from '../constants/apiEndpoints';
export const getAllLoungesApi = async ({
  sortType,
  LoungeId,
  currentPage,
  searchValue,
  shortByTime,
}: FetchLoungesType) => {
  const responseBody = (response: AxiosResponse) => response.data;

  let sorvalue = null;
  
  localStorage.setItem('pagename', 'Disneyland Talk');
  
  const token = localStorage.getItem('token');

  let sortByTime =
    shortByTime == 'true'
      ? `?page=${currentPage}&sortordefault=ww`
      : `?page=${currentPage}`;

  const user_id = localStorage.getItem('user_id');
  // remove endpoint
  const apiEndpoint = GET_BASE_URL + `/backend/api/v1/home`;

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
    const { data } = await axios
      .get<Lounge[]>(`${apiEndpoint}${sortByTime}&user_id=${user_id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(responseBody);

    return data;
  }
};
