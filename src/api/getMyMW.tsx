import axios, { AxiosResponse } from 'axios';
import { FetchMyFavType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getAllMyMWApi = async ({
  sortType,
  currentPage,
  UserId,
}: FetchMyFavType) => {
  const responseBody = (response: AxiosResponse) => response.data;

  const token = localStorage.getItem('token');
  const apiEndpoint = GET_BASE_URL + '/backend/api/v1/myfavourites';
  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then(responseBody);

  return data;
};
