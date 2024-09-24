import axios, { AxiosResponse } from 'axios';
import { FetchMyStoreType } from '../redux/lounges/slice';
import { Lounge, MyStore } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getAllMyHistoryApi = async ({
  sortType,
  currentPage,
}: FetchMyStoreType) => {
  const responseBody = (response: AxiosResponse) => response.data;

  const token = localStorage.getItem('token');
  const apiEndpoint =
    GET_BASE_URL + `/backend/api/v1/getMyHistory?page=${currentPage}`;
  const { data } = await axios
    .get<MyStore[]>(`${apiEndpoint}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then(responseBody);

  return data;
};
