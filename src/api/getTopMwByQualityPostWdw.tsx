import axios, { AxiosResponse } from 'axios';
import { FetchTopMwByQualityPostTypeWdw } from '../redux/lounges/slice';
import { Lounge, MyStore } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getTopMwByQualityPostApiWdw =
  async ({}: FetchTopMwByQualityPostTypeWdw) => {
    const responseBody = (response: AxiosResponse) => response.data;

    const apiEndpoint = GET_BASE_URL + '/backend/api/v1/topMwByQualityPostWdw';

    const { data } = await axios
      .get<MyStore[]>(`${apiEndpoint}`, {})
      .then(responseBody);

    return data;
  };
