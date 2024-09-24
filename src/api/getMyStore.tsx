import axios, { AxiosResponse } from 'axios';
import { FetchMyStoreType } from '../redux/lounges/slice';
import { Lounge, MyStore } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getAllMyStoreApi = async ({
  sortType,
  currentPage,
}: FetchMyStoreType) => {
  const responseBody = (response: AxiosResponse) => response.data;
  localStorage.setItem('pagename', 'Mousewait Store');
  const token = localStorage.getItem('token');
  const apiEndpoint = GET_BASE_URL + '/backend/api/v1/mystore';
  const { data } = await axios
    .get<MyStore[]>(`${apiEndpoint}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then(responseBody);

  return data;
};
