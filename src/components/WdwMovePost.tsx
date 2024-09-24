import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { MdMessage } from 'react-icons/md';
import { selectLounges } from '../redux/lounges/selectors';
import axios, { AxiosResponse } from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  AiOutlineTag,
  AiOutlineCloseCircle,
  AiOutlineMessage,
} from 'react-icons/ai';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

import {
  fetchAllTaglists,
  sendDmMessage,
  assignTagToPost,
  movePostWdw,
  fetchLounges,
  fetchUserLounges,
} from '../redux/lounges/slice';

type MovePostPropsType = {
  isOpen: any;
  isClosed: any;
  TagDatas: any;
  chatId: any;
  Page: any;
  chatRoomId: any;
};

export const MovePost: React.FC<MovePostPropsType> = ({
  isOpen,
  isClosed,
  TagDatas,
  chatId,
  Page,
  chatRoomId,
}) => {
  type FormData = {
    roomid: any;
    chatId: any;
  };
  let navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [TagList, setTagLists] = useState<any | string>('');
  const [closeToggle, setCloseToggle] = useState<any | String>(isClosed);

  const closeTagToggle = () => {
    setCloseToggle(isClosed);
  };

  const dispatch = useAppDispatch();
  let tagData: any = null;

  const [ListsOfdata, setListsOfdatas] = useState<any | String>(TagDatas);
  const [land, setLand] = useState<number | string>(chatRoomId);
  const checktagged = (id: any) => {
    // let checked = e.target.checked
    // console.log(checked)
    //console.log(id);
  };

  useEffect(() => {
    setValue('roomid', land);
  }, [land]);

  const { sortByTime } = useSelector(selectLounges);
  let sortType: any = null;
  let currentPage: any = null;
  let searchValue: any = null;
  let LoungeId: any = null;

  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );

  useEffect(() => {
    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  const onSubmit = (data: any) => {
    dispatch<any>(movePostWdw(data)).then((res: any) => {
      navigate(`/disneyworld/lands/${land}/${res.payload.data}`);
    });
  };

  return (
    <div>
      {isOpen == true && (
        <>
          <div className='containerDialog'>
            <Dialog
              PaperProps={{
                sx: {
                  overflowY: 'inherit',
                  zIndex: '1',
                  width: '17rem',
                  height: '80%',
                },
              }}
              open={isOpen}
              onClose={isClosed}
            >
              <DialogContent>
                <form action='' onSubmit={handleSubmit(onSubmit)}>
                  <input type='submit' />

                  <div className='closebutton'>
                    <div className='buttondialog'>
                      <AiOutlineCloseCircle
                        className='icon'
                        onClick={closeTagToggle}
                      />
                    </div>
                  </div>
                  <DialogContentText>
                    <div className='box-li'>
                      <ul
                        className='m-0 p-0'
                        style={{ cursor: 'pointer', display: 'inline-grid' }}
                      >
                        <input
                          type='hidden'
                          value={land}
                          {...register('roomid')}
                        />
                        <li
                          className='mt-1'
                          style={
                            land == 1 ? { backgroundColor: '#9BB8EF' } : {}
                          }
                          onClick={() => setLand('1')}
                        >
                          WDW TALK
                        </li>
                        <li
                          className='mt-1'
                          style={
                            land == 2 ? { backgroundColor: '#9BB8EF' } : {}
                          }
                          onClick={() => setLand('2')}
                        >
                          WDW REALTIME
                        </li>
                        <li
                          className='mt-1'
                          style={
                            land == 3 ? { backgroundColor: '#9BB8EF' } : {}
                          }
                          onClick={() => setLand('3')}
                        >
                          Disneyworld Resort News{' '}
                        </li>
                      </ul>
                    </div>

                    <input
                      type='hidden'
                      value={chatId}
                      {...register('chatId')}
                    />
                  </DialogContentText>
                </form>
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
};

export default MovePost;
