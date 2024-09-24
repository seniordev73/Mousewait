import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import { Link, useNavigate } from 'react-router-dom'
import qs from 'qs';
import { Placeholder } from '../components/Placeholder'
import { fetchMyStore } from '../redux/lounges/slice'
import {selectLounges} from '../redux/lounges/selectors'
import { usersSelector } from '../redux/users/selectors'

import midBanner from '../assets/img/mid-banner-img.png';




const BuyCredit = () => {
  const dispatch = useAppDispatch()
  const { myStoreItem , status } = useSelector(selectLounges)

  console.log('dd'+myStoreItem);
  const token= localStorage.getItem("token");
  const user= localStorage.getItem("user");
  const { isLoggedIn } = useSelector(
    usersSelector
  );

  let sortType:any =null;
  let categoryId:any =null;
  let currentPage:any =null;
  let searchValue:any =null;

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchMyStore({ sortType,  currentPage }))
   
  }, []);

  function renderInputField (obj: any) {
  if(obj.product_quantity>0 && obj.product_isauction===0 && token!=null )
   {return <td>Buy Now </td>;}
    else{ return null}
  }
  
  


  return (
    <>

<div className="mid-main">
  <div className="container">
    <div className="mid-sec mwstore-page-bg">
      <div className="banner-img">
      <img
                    src={midBanner}
                    className="img-fluid"
                    alt="mid-banner-img"
                  />
      </div>
      <div className="text-head text-center">
        <ul className="p-0 m-0">
          <li>
            <a href="">Best of the Day</a>
          </li>
          <li>
            <a href="">Sticker Store</a>
          </li>
          <li>
            <a href="">Disneyland Talk</a>
          </li>
          <li>
            <a href="">Real-Time</a>
          </li>
          <li>
            <a href="">The Hub</a>
          </li>
        </ul>
      </div>
      {/*-=====mobile-view start ======-*/}
      <div className="top-text-m text-center p-2 text-head text-center">
        <div className="top-mw text-center">
          <h6>Top MouseWaiters of the Day</h6>
          <div className="top-sp d-flex justify-content-center">
            <p>
              <span>1. grumpypapa 56.38 #5 (DL)</span>
              <span>2. grapesoda 52.67 #5 (DL)</span>
            </p>
          </div>
        </div>
        <div className="text-head-m text-center">
          <ul className="p-0 m-0">
            <li>
              <a href="">Best of the Day</a>
            </li>
            <li>
              <a href="">Food Blog</a>
            </li>
            <li>
              <a href="">Tips</a>
            </li>
            <li>
              <a href="">Sticker Store</a>
            </li>
          </ul>
        </div>
        <div className="Search-bar">
          <div className="input-group  bg-white border rounded-pill p-1">
            <input
              type="search "
              placeholder="Search the Lounge"
              aria-describedby="button-addon4"
              className="form-control  border-0"
            />
            <div className="input-group-prepend border-0">
              <button id="button-addon4" type="button" className="btn">
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*-=====mobile-view start ======-*/}
      {/*-=====MouseWait Store-page start ======-*/}
      <div className="mwstore-mid-bg">
        <div className="mws-mid-sec">
          <h5 className="mid-head">MouseWait Store</h5>
          <h6 className="mid-sub">
            <span>Credit Balance : {(myStoreItem as any).credit_balance}</span>
       
          </h6>
        </div>
        {/*-=====store-tab-main start ======-*/}
        <div className="store-tab-main">
          <ul className="nav nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="pills-1-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-1"
                role="tab"
                aria-controls="pills-1"
              >
                BUY CREDITS
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="pills-2-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-2"
                type="text"
                role="tab"
                aria-controls="pills-2"
              >
                GIFT CREDITS
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="pills-3-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-3"
                type="text"
                role="tab"
                aria-controls="pills-3"
              >
                Collection
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="pills-4-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-4"
                type="text"
                role="tab"
                aria-controls="pills-4"
              >
                My Trade Req.
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="pills-5-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-5"
                type="text"
                role="tab"
                aria-controls="pills-5"
              >
                History
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="pills-6-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-6"
                type="text"
                role="tab"
                aria-controls="pills-6"
              >
                MW Trading
              </a>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade"
              id="pills-1"
              role="tabpanel"
              aria-labelledby="pills-1-tab"
              tabIndex={0}
            >
              This is some placeholder content the Contact tab's associated
              content. Clicking another tab will toggle the visibility of this
              one for the next. The tab JavaScript swaps classes to control the
              content visibility and styling. You can use it with tabs, pills,
              and any other .nav-powered navigation.
            </div>
            <div
              className="tab-pane fade"
              id="pills-2"
              role="tabpanel"
              aria-labelledby="pills-2-tab"
              tabIndex={0}
            >
              rahul
            </div>
            <div
              className="tab-pane fade"
              id="pills-3"
              role="tabpanel"
              aria-labelledby="pills-3-tab"
              tabIndex={0}
            >
              vihna
            </div>
            <div
              className="tab-pane fade"
              id="pills-4"
              role="tabpanel"
              aria-labelledby="pills-4-tab"
              tabIndex={0}
            >
              rahul
            </div>
            <div
              className="tab-pane fade"
              id="pills-5"
              role="tabpanel"
              aria-labelledby="pills-5-tab"
              tabIndex={0}
            >
              5
            </div>
            <div
              className="tab-pane fade"
              id="pills-6"
              role="tabpanel"
              aria-labelledby="pills-6-tab"
              tabIndex={0}
            >
              6
            </div>
          </div>
        </div>
        {/*-=====store-tab-main end ======-*/}
        {/*-=====store-table-main start ======-*/}
        <div className="mws-table-main">
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr className="tab-nav">
                  <th scope="col">Image</th>
                  <th scope="col">Product</th>
                  <th scope="col">Description</th>
                  <th scope="col">Available</th>
                  <th scope="col">Credits</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              
            </table>
          </div>
        </div>
        {/*-=====store-table-main end ======-*/}
      </div>
    </div>
    {/*-=====MouseWait Store-page end ======-*/}
  </div>
</div>


      </>
  )
}

export default BuyCredit