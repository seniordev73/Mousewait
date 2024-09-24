import { CommentReply } from './CommentReply';
import { memo } from 'react';

import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux/store';
import { addSticker } from '../redux/lounges/slice';
import { selectLounges } from '../redux/lounges/selectors';
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';
type StickerTabPropsType = {
  tabData: any;
  onClickSticker: any;
};

function Tab(props: any) {
  const dispatch = useAppDispatch();
  const onAddSticker = (data: any) => {
    props.onClick(
      GET_BASE_URL_IMAGE +
      '/disneyland/images/products_thumbnail/' +
      data
    );
    
    dispatch<any>(addSticker(data));
  };

  return (
    <div className={`tab-content`}>
      <div className='tab-pane fade active show'>
        {props.tab?.getemojidata.map((item: any, index: any) => (
          <img
            key={index}
            onClick={() => onAddSticker(item.product_image)}
            src={
              GET_BASE_URL_IMAGE +
              '/disneyland/images/products_thumbnail/' +
              item.product_image
            }
            className='img-fluid'
            alt=''
          />
        ))}
      </div>
    </div>
  );
}

function Navigation(props: any) {
  return (
    <div className='post-sec'>
      <ul className={`nav nav-pills`}>
        {props.tabs.map((item: any) => (
          <li key={item?.id} className={`nav-item`}>
            <span
              className={`nav-link ${
                props.activeTabId === item?.id ? 'active' : ''
              }`}
              onClick={() => props.onNavClick(item?.id)}
            >
              {item.emoji_category_name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const StickerTabs: React.FC<StickerTabPropsType> = ({ tabData, onClickSticker }) => {
  const [activeTabId, setActiveTab] = useState(tabData[0]?.id);

  const activeTab = useMemo(
    () => tabData.find((tab: any) => tab?.id === activeTabId),
    [activeTabId, tabData]
  );

  return (
    <div className='com-box-main'>
      <div className='post-sec'>
        <div className={`tabs`}>
          <Navigation
            tabs={tabData}
            onNavClick={setActiveTab}
            activeTabId={activeTabId}
          />
          <Tab tab={activeTab} onClick={onClickSticker}/>
        </div>
      </div>
    </div>
  );
};

export default memo(StickerTabs);
