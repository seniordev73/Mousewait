import axios, { AxiosResponse } from 'axios';
import { FetchMyNotificationType } from '../redux/lounges/slice';
import { Lounge, Notification } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getAllMyNotificationApi = async ({
  sortType,
  currentPage,
}: FetchMyNotificationType) => {
  const responseBody = (response: AxiosResponse) => response.data;
  localStorage.setItem('pagename', 'My Notifications');
  const token = localStorage.getItem('token');
  //console.log(token)
  const apiEndpoint = GET_BASE_URL + '/backend/api/v1/notificationNew';
  const { data } = await axios
    .get<Notification[]>(`${apiEndpoint}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then(responseBody);

  return data;
};
