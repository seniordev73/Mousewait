import axios, { AxiosResponse } from 'axios';
import { FetchRightBarData } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getRightBarApi = async ({
  sortType,
  currentPage,
}: FetchRightBarData) => {
  const responseBody = (response: AxiosResponse) => response.data;
  const apiEndpoint = GET_BASE_URL + '/backend/api/v1/rightBar';

  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}`)
    .then(responseBody);

  return data;
};
