import axios, { AxiosResponse } from 'axios';
import {
  fetchByComposerEditor,
  fetchComposerTypeWdw,
} from '../redux/lounges/slice';
import { Lounge } from '../redux/lounges/types';
import { GET_BASE_URL } from '../constants/apiEndpoints';
export const getComposerWdw = async ({ LoungeId }: fetchComposerTypeWdw) => {
  const responseBody = (response: AxiosResponse) => response.data;

  const token = localStorage.getItem('token');
  const apiEndpoint =
    GET_BASE_URL + '/backend/api/v1/advanceEditorGetWdw?chat_id=' + LoungeId;
  const { data } = await axios
    .get<Lounge[]>(`${apiEndpoint}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then(responseBody);

  return data;
};
