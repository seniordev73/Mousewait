import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { MdMessage } from 'react-icons/md';
import { selectLounges } from '../redux/lounges/selectors';
import axios, { AxiosResponse } from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import {
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';

import {
  fetchAllTaglists,
  assignTagToPost,
} from '../redux/lounges/slice';

import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import { type } from 'os';

type TagMePropsType = {
  isOpen: any;
  isClosed: any;
  TagDatas: any;
  chatId: any;
  Page: any;
};

const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};


export const TagMe: React.FC<TagMePropsType> = ({
  isOpen,
  isClosed,
  TagDatas,
  chatId,
  Page,
}) => {
  type FormData = {
    checkedId: any;
    chatId: any;
  };
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [closeToggle, setCloseToggle] = useState<any | String>(isClosed);

  const closeTagToggle = () => {
    setCloseToggle(isClosed);
  };

  const dispatch = useAppDispatch();
  let tagData: any = null;

  const [ListsOfdata, setListsOfdatas] = useState<any | String>(TagDatas);
  const { sortByTime } = useSelector(selectLounges);

  const [shortByTime, setShortByTime] = useState<any | string>(
    localStorage.getItem('shortByTime')
  );

  useEffect(() => {
    sortByTime != '' && setShortByTime(sortByTime);
  }, [sortByTime]);

  const onSubmit = () => {
    let data = {chatId: chatId, checkedId: optionSelected.map((val: any) => val.value)};
    // console.log('onSubmit', data);
    dispatch<any>(assignTagToPost(data)).then((res: any) => {
      window.location.reload();
    });
  };

  const [searchTag, setAllSearcTag] = useState<any | String>();
  
  const [ allTagList, setAllTagList ] = useState([]);
  type optionType = {
    value: any,
    label: any; 
  }

  const [ optionSelected, setOptionSelected ] = useState<Array<optionType>>([]);

  useEffect( () => {
    let LoungeId: any = chatId;
    let tagData: any = null;
    let preSelectList: any = [];

    dispatch(fetchAllTaglists({ tagData, LoungeId })).then((res: any) => {
      const transformedOptions = res.payload.map((option: any) => {
          if(isOpen && option.gettagdata.length != 0) {
            preSelectList = [...preSelectList, {value: option['id'], label: option['tags_name']}];
          }
          return {
           value: option['id'],
           label: option['tags_name'],
          }
        }
      );
      setOptionSelected(preSelectList);
      setAllTagList(transformedOptions);
    });
  }, [isOpen])

  const fields = {value: 'id', text: 'tags_name'};

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
                  width: '20rem',
                  height: '80%',
                },
              }}
              className="tagDialog"
              open={isOpen}
              onClose={isClosed}
            >
              <DialogContent>

                <input type="button" value="Submit" onClick={onSubmit} style={{display: 'flex', margin: '10px auto'}}></input>
                <span
                  className="d-inline-block"
                  data-toggle="popover"
                  data-trigger="focus"
                  data-content="Please selecet account(s)"
                  style={{width: '100%'}}
                >
                <ReactSelect
                  options={allTagList}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{
                    Option
                  }}
                  menuIsOpen = {true}
                  onChange={(selected: any) => setOptionSelected(selected)}
                  // allowSelectAll={true}
                  value={optionSelected}
                />
              </span>
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
};

export default TagMe;
