import axios, { AxiosResponse } from 'axios';
import { FetchUserLoungesType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getAllUserLoungesApi = async ({
  sortType,
  UserId,
  currentPage,
}: FetchUserLoungesType) => {
  const responseBody = (response: AxiosResponse) => response.data;
  const token = localStorage.getItem('token');
  const apiEndpoint =
    GET_BASE_URL +
    '/backend/api/v1/user/' +
    UserId +
    '/myposts' +
    `?page=${currentPage}`;
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
