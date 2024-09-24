import axios, { AxiosResponse } from 'axios';
import { FetchWdwUserLoungesType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getAllWdwUserLoungesApi = async ({
  sortType,
  UserId,
  currentPage,
}: FetchWdwUserLoungesType) => {
  const responseBody = (response: AxiosResponse) => response.data;
  const token = localStorage.getItem('token');
  const apiEndpoint =
    GET_BASE_URL + '/backend/api/v1/user/' + UserId + '/wdwmyposts';
  let searchByCategory = UserId > 0 ? `&category=${UserId}` : '';

  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then(responseBody);

  return data;
};
