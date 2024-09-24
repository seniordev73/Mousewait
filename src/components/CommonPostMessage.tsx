import { Link, useParams } from 'react-router-dom';

import Linkify from 'react-linkify';
import { useEffect, useState } from 'react';
import { GET_BASE_URL } from '../constants/apiEndpoints';

type CommonPostMessagePropsType = {
  myChat: any;
  // chatType: any;
};

function removeTags(string: any) {
  // let newstring = string
  //   ?.replace(/<[^>]*>/g, ' ')
  //   ?.replace(/\s{2,}/g, ' ')
  //   ?.trim();
  // let content = newstring?.split(/((?:#|@|https?:\/\/[^\s]+)[a-zA-Z]+)/);
  let content = string?.trim()?.split(/((?:#|@)[a-zA-Z]+)/);
  let hashtag;

  return content?.map((word: any) => {
    if (word.startsWith('#')) {
      hashtag = word.replace('#', '');
      return (
        `
          <a href='${GET_BASE_URL}/disneyland/hash/${hashtag}' style={{ color: 'blue', textDecoration: 'underline' }}>${word}</a>`
      );
    } else {
      return word;
    }
  });
}
export const CommonPostMessage: React.FC<CommonPostMessagePropsType> = ({
  myChat
  // chatType
}) => {

  const [ newChat, setNewChat ] = useState(myChat)

  useEffect(() => {
    setNewChat(removeTags(myChat)?.join(''));
  }, [])

  return (
    <>
      <h6>
        {/* {chatType == '0' ?
          <Linkify>{removeTags(myChat)}</Linkify>
        :  */}

      

          <Linkify><div dangerouslySetInnerHTML={{__html: newChat}}></div></Linkify>
        {/* } */}
      </h6>
    </>
  );
};
