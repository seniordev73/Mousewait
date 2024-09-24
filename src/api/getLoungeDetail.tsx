import axios, { AxiosResponse } from 'axios';
import { FetchLoungesDetails } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getAllLoungeDetailApi = async ({
  LoungeId,
}: FetchLoungesDetails) => {
  const responseBody = (response: AxiosResponse) => response.data;
  const token = localStorage.getItem('token');
  const apiEndpoint = GET_BASE_URL + '/backend/api/v1/postdetail/' + LoungeId;
  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then(responseBody);

  return data;
};
