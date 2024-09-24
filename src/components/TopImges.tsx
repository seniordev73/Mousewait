import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';
import {
  postThankyou,
  postBookMark,
  postLoungeComment,
} from '../redux/lounges/slice';
type TopImgesPropsType = {
  chatId: number;
  topImageData: any;
};

export const TopImges: React.FC<TopImgesPropsType> = ({
  chatId,
  topImageData,
}) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className='d-flex flex-row '>
        {topImageData?.map((obj: any) => (
          <div className='p-2 bd-highlight '>
            <img
              src={
                GET_BASE_URL_IMAGE +
                '/disneyland/images/products_thumbnail/' +
                obj.product_image
              }
              className=' img-fluid'
              alt='img'
            />
          </div>
        ))}
      </div>
    </>
  );
};
