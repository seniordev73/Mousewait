import axios, { AxiosResponse } from 'axios';
import { FetchLoungesType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getDisnyworldLoungesApi = async ({
  sortType,
  LoungeId,
  currentPage,
  searchValue,
  shortByTime,
}: FetchLoungesType) => {
  const responseBody = (response: AxiosResponse) => response.data;
  localStorage.setItem('pagename', 'Wdw Talk');
  let sorvalue = null;
  const token = localStorage.getItem('token');
  let sortByTime =
    shortByTime == 'true'
      ? `?page=${currentPage}&sortordefault=ww`
      : `?page=${currentPage}`;
  const apiEndpoint = GET_BASE_URL + `/backend/api/v1/disneyworldHome`;

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
      .get<Lounge[]>(`${apiEndpoint}${sortByTime}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(responseBody);

    return data.data;
  }
};
