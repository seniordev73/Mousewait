import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderLounge from '../components/HeaderLounge';
import LeftLounge from '../components/LeftLounge';
import RightLounge from '../components/RightLounge';
import WdwLeftLounge from '../components/WdwLeftLounge';
import WdwRightLounge from '../components/WdwRightLounge';
{
  /* <Outlet/> */
}

var pathArray = window.location.pathname.split('/');

export default function LoungeLayout() {
  return (
    <div className='mousewait-bg'>
      {/*===== MW-Deshborad-sec Start =======*/}
      <div className='mousewait-deshborad'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='des-main-sec'>
              {/* ===leftbar start=== */}
              {pathArray[1] === 'loungeland' ||
              pathArray[1] === 'disneyland' || pathArray[1] === 'club333' ? (
                <LeftLounge />
              ) : (
                <WdwLeftLounge />
              )}

              {/* ===leftbar end=== */}
              {/* ===mid-sec start=== */}
              <Outlet />
              {/* ===mid-sec End=== */}
              {/* ===rightbar start=== */}
              {pathArray[1] === 'loungeland' ||
              pathArray[1] === 'disneyland' ? (
                <RightLounge />
              ) : (
                <WdwRightLounge />
              )}

              {/* ===rightbar End=== */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
