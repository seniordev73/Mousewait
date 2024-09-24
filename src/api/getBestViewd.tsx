import axios, { AxiosResponse } from 'axios';
import { FetchBestViewd } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getBestViewdApi = async ({
  sortType,
  UserId,
  currentPage,
  type,
}: FetchBestViewd) => {
  const responseBody = (response: AxiosResponse) => response.data;
  const apiEndpoint =
    GET_BASE_URL + '/backend/api/v1/bestoftheday?type=' + type;
  let searchByCategory = UserId > 0 ? `&category=${UserId}` : '';
  if(type == 'w')
    localStorage.setItem('pagename', 'Best of the Week');
  else if(type == 'm')
    localStorage.setItem('pagename', 'Best of the Month');
  else 
    localStorage.setItem('pagename', 'Best of the day');

  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}`)
    .then(responseBody);

  return data;
};
