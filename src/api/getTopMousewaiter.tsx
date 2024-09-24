import axios, { AxiosResponse } from 'axios';
import { FetchTopMousewaiterType } from '../redux/lounges/slice';
import { Lounge, MyStore } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getTopMousewaiterApi = async ({
  type,
}: FetchTopMousewaiterType) => {
  const responseBody = (response: AxiosResponse) => response.data;

  const apiEndpoint =
    GET_BASE_URL + '/backend/api/v1/topMousewaiter?type=' + type;

  const { data } = await axios
    .get<MyStore[]>(`${apiEndpoint}`, {})
    .then(responseBody);

  return data;
};
