import axios, { AxiosResponse } from 'axios';
import { FetchTopMousewaiterTypeWdw } from '../redux/lounges/slice';
import { Lounge, MyStore } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getTopMousewaiterApiWdw = async ({
  type,
}: FetchTopMousewaiterTypeWdw) => {
  const responseBody = (response: AxiosResponse) => response.data;

  const apiEndpoint =
    GET_BASE_URL + '/backend/api/v1/topMousewaiterWdw?type=' + type;

  const { data } = await axios
    .get<MyStore[]>(`${apiEndpoint}`, {})
    .then(responseBody);

  return data;
};
