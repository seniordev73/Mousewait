import axios, { AxiosResponse } from 'axios';
import { FetchRightBarDataWdw } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getRightBarApiWdw = async ({
  sortType,
  currentPage,
}: FetchRightBarDataWdw) => {
  const responseBody = (response: AxiosResponse) => response.data;
  const apiEndpoint = GET_BASE_URL + '/backend/api/v1/rightBarWdw';

  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}`)
    .then(responseBody);

  return data;
};
