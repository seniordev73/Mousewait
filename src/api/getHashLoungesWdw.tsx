import axios, { AxiosResponse } from 'axios';
import { FetchHashLoungesTypeWdw } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getHashLoungesApiWdw = async ({
  sortType,
  LoungeId,
  currentPage,
  tagValue,
  shortByTime,
}: FetchHashLoungesTypeWdw) => {
  tagValue = tagValue.replace('#', '');
  const responseBody = (response: AxiosResponse) => response.data;
  localStorage.setItem('pagename', 'My Hash');
  let sorvalue = null;

  let sortByTime = shortByTime == 'true' ? `&sortordefault=ww` : '';
  const apiEndpoint =
    GET_BASE_URL + `/backend/api/v1/hashWdw=${tagValue}` + sortByTime;

  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}`)
    .then(responseBody);
  return data;
};
