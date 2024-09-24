import axios, { AxiosResponse } from 'axios';
import { FetchBestViewdWdw } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getBestViewdApiWdw = async ({
  sortType,
  UserId,
  currentPage,
  type,
}: FetchBestViewdWdw) => {
  const responseBody = (response: AxiosResponse) => response.data;
  const apiEndpoint =
    GET_BASE_URL + '/backend/api/v1/most_viwed_chat_json?type=' + type;
  let searchByCategory = UserId > 0 ? `&category=${UserId}` : '';
  localStorage.setItem('pagename', 'Best of the Day');
  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}`)
    .then(responseBody);

  return data;
};
