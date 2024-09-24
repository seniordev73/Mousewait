import axios, { AxiosResponse } from 'axios';
import { FetchTagLoungesType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getTagLoungesApi = async ({
  sortType,
  LoungeId,
  currentPage,
  tagValue,
  shortByTime,
}: FetchTagLoungesType) => {
  const responseBody = (response: AxiosResponse) => response.data;

  let sorvalue = null;

  const user_id = localStorage.getItem('user_id');
  let sortByTime = shortByTime == 'true' ? `&sortordefault=ww` : '';
  localStorage.setItem('pagename', tagValue);
  const apiEndpoint =
    GET_BASE_URL + `/backend/api/v1/tag?user_id=${user_id}&tags_name=${tagValue}` + sortByTime;

  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}`)
    .then(responseBody);
  return data;
};
