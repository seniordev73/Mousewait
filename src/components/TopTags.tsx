import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  postThankyou,
  postBookMark,
  postLoungeComment,
} from '../redux/lounges/slice';
type TopImgesPropsType = {
  chatId: number;
  gettagged: [];
};

export const TopTags: React.FC<TopImgesPropsType> = ({ chatId, gettagged }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className='card-body'>
        <div className='t-link text-center'>
          <ul className='m-0 p-0 taglist'>
            {gettagged?.map((obj: any) => (
              <li>
                <Link
                  to={`/disneyland/tag/${obj.gettagged[0]?.tags_name
                    .replace(/\s+/g, '-')
                    .toLowerCase()}/`}
                >
                  {obj.gettagged[0]?.tags_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
