import axios, { AxiosResponse } from 'axios';
import { fetchAllTaglistsType } from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getALlTagists = async ({
  tagData,
  LoungeId,
}: fetchAllTaglistsType) => {
  const responseBody = (response: AxiosResponse) => response.data;
  const ddd = tagData;
  const token = localStorage.getItem('token');

  const apiEndpoint =
    GET_BASE_URL + '/backend/api/v1/tagList?chat_id=' + LoungeId;

  if (tagData != null) {
    const { data } = await axios
      .get<Lounge[]>(`${apiEndpoint}&keytag=${tagData}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(responseBody);
    return data;
  } else {
    const { data } = await axios
      .get<Lounge[]>(`${apiEndpoint}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(responseBody);

    return data;
  }
};
