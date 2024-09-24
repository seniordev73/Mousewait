import { Suspense, lazy } from 'react';
import '@fontsource/inter';
import './css/app.css';
import './css/responsive.css';
import Home from './pages/Home';
import Email from './pages/Email';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import MyStore from './pages/MyStore';
import MyRecharge from './pages/MyRecharge';
import MyCollection from './pages/MyCollection';
import MyHistory from './pages/MyHistory';
import MyTradeRequest from './pages/MyTradeRequest';
import Setting from './pages/Setting';
import Notification from './pages/Notification';
import BuyCredit from './pages/BuyCredit';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';
import LoungeLayout from './layouts/LoungeLayout';
import LandLoungeDetail from './pages/LandLoungeDetail';
import WdwLandLounge from './pages/WdwLandLounge';
import MyMw from './pages/MyMw';
import UpdateName from './pages/UpdateName';

import UpdateEmail from './pages/UpdateEmail';
import UpdateDetails from './pages/UpdateDetails';
import UpdatePic from './pages/UpdatePic';
import TopMwByQualityPost from './pages/TopMwByQualityPost';
import TopMousewaiter from './pages/TopMousewaiter';
import TopNewsFeatured from './pages/TopNewsFeatured';

import WdwTopMwByQualityPost from './pages/WdwTopMwByQualityPost';
import WdwTopMousewaiter from './pages/WdwTopMousewaiter';

import { Routes, Route } from 'react-router';
import WDWLoungeDetails from './pages/WDWLoungeDetails';
import MwAdvanceEditor from './components/MwAdvanceEditor';
import WdwAdvanceEditor from './components/WdwAdvanceEditor';
import ChatPage from './pages/ChatPage';
import ForgetPasswordConfirm from './pages/ForgetPasswordConfirm';
//import LoungeLandWdw from './pages/WdwLoungeLand';

// lazy loading (Split bundle on chunks and download them if needed)

const LandLounge = lazy(
  () => import(/* webpackChunkName: "LandLounge" */ './pages/LandLounge')
);
const LoungeLand = lazy(
  () => import(/* webpackChunkName: "LandLounge" */ './pages/LoungeLand')
);

const Club333 = lazy(
  () => import(/* webpackChunkName: "LandLounge" */ './pages/Club333')
);


const Chat = lazy(
  () => import(/* webpackChunkName: "LandLounge" */ './pages/Chat')
);

const CatLounge = lazy(
  () => import(/* webpackChunkName: "CatLounge" */ './pages/CatLounge')
);
const WdwCatLounge = lazy(
  () => import(/* webpackChunkName: "CatLounge" */ './pages/WdwCatLounge')
);

const UserLounge = lazy(
  () => import(/* webpackChunkName: "UserLounge" */ './pages/UserLounge')
);
const WdwUserLounge = lazy(
  () => import(/* webpackChunkName: "WdwUserLounge" */ './pages/WdwUserLounge')
);

const BestViewed = lazy(
  () => import(/* webpackChunkName: "BestViewd" */ './pages/BestViewed')
);
const WdwBestViewed = lazy(
  () => import(/* webpackChunkName: "BestViewd" */ './pages/WdwBestViewed')
);

const TagLandLounge = lazy(
  () => import(/* webpackChunkName: "TagLandLounge" */ './pages/TagLandLounge')
);

const WdwTagLandLounge = lazy(
  () =>
    import(/* webpackChunkName: "TagLandLounge" */ './pages/WdwTagLandLounge')
);

const HashLandLounge = lazy(
  () =>
    import(/* webpackChunkName: "HashLandLounge" */ './pages/HashLandLounge')
);
const WdwHashLandLounge = lazy(
  () =>
    import(/* webpackChunkName: "HashLandLounge" */ './pages/WdwHashLandLounge')
);

const Error = lazy(
  () => import(/* webpackChunkName: "Error" */ './pages/Error')
);

const App = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route path='/' element={<Home />} />
        <Route path='/email' element={<Email />} />
        <Route element={<MainLayout />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/forgotpassword/confirm' element={<ForgetPasswordConfirm />} />
          <Route path='/disneyland/login' element={<Login />} />
          <Route path='/disneyworld/mystore' element={<MyStore />} />

          <Route path='/disneyworld/logout' element={<Logout />} />
        </Route>

        <Route element={<LoungeLayout />}>
          <Route
            path='/disneyland/lounge'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <LandLounge />
              </Suspense>
            }
          />
          <Route
            path='/loungeland'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <LoungeLand />
              </Suspense>
            }
          />

          <Route
            path='/club333'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <Club333 />
              </Suspense>
            }
          />
          {/*         <Route
            path='/disneyworld/loungeland'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <LoungeLandWdw />
              </Suspense>
            }
          /> */}

          <Route
            path='/chat'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <Chat />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/myConversation/:userId'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <ChatPage />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/search/post/:search'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <LandLounge />
              </Suspense>
            }
          />

          <Route
            path='/disneyworld/search/post/:search'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <WdwLandLounge />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/setting/name'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <UpdateName />
              </Suspense>
            }
          />
          <Route
            path='/disneyland/setting/email'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <UpdateEmail />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/setting/about'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <UpdateDetails />
              </Suspense>
            }
          />
          {/* <Route
            path='/disneyland/mw-advance-editor/:LoungeId'
            element={<MwAdvanceEditor />}
          /> */}
          {/* <Route
            path='/disneyworld/mw-advance-editor/:LoungeId'
            element={<WdwAdvanceEditor />}
          /> */}
          <Route
            path='/disneyland/setting/dp'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <UpdatePic />
              </Suspense>
            }
          />

          <Route
            path='/disneyworld/lounge'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <WdwLandLounge />
              </Suspense>
            }
          />

          <Route
            path='/disneyworld/the-hub'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <WdwLandLounge />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/myaccount'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <MyStore />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/recharge'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <MyRecharge />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/mycollection'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <MyCollection />
              </Suspense>
            }
          />
          <Route
            path='/disneyland/mytrade-request'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <MyTradeRequest />
              </Suspense>
            }
          />
          <Route
            path='/disneyland/myhistory'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <MyHistory />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/mystore'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <MyStore />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/setting'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <Setting />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/notification'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <Notification />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/lands-talk/:LoungeId/:url'
            element={<LandLoungeDetail />}
          />

          <Route
            path='/disneyworld/lands-talk/:LoungeId/:msg'
            element={<WDWLoungeDetails />}
          />

          <Route
            path='/disneyland/user/:userId/mypost'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <UserLounge />
              </Suspense>
            }
          />
          <Route
            path='/disneyworld/user/:userId/mypost'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <WdwUserLounge />
              </Suspense>
            }
          />

          {/*    <Route path='/disneyland/user/myfav' element={<MyMw />} /> */}

          <Route
            path='/disneyland/:type/L/most-viewed'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <BestViewed />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/lands/:landid/:landname'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <CatLounge />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/tag/:tag'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <TagLandLounge />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/hash/:tag'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <HashLandLounge />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/topmwbyqualitypost'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <TopMwByQualityPost />
              </Suspense>
            }
          />
          <Route
            path='/disneyland/topmousewaiters/:type'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <TopMousewaiter />
              </Suspense>
            }
          />
          <Route
            path='/disneyland/topnewsfeatured'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <TopNewsFeatured />
              </Suspense>
            }
          />

          <Route
            path='/disneyland/changepassword'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <ChangePassword />
              </Suspense>
            }
          />

          <Route
            path='/disneyworld/lands/:landid/:landname'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <WdwCatLounge />
              </Suspense>
            }
          />
          <Route
            path='/disneyworld/:type/L/most-viewed'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <WdwBestViewed />
              </Suspense>
            }
          />
          <Route
            path='/disneyworld/topmwbyqualitypost'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <WdwTopMwByQualityPost />
              </Suspense>
            }
          />
          <Route
            path='/disneyworld/topmousewaiters/:type'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <WdwTopMousewaiter />
              </Suspense>
            }
          />
          <Route
            path='/disneyworld/hash/:tag'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <WdwHashLandLounge />
              </Suspense>
            }
          />
          <Route
            path='/disneyworld/tag/:tag'
            element={
              <Suspense fallback={<div>"Loading ..."</div>}>
                <WdwTagLandLounge />
              </Suspense>
            }
          />
        </Route>

        <Route
          path='*'
          element={
            <Suspense fallback={<div>"Loading ..."</div>}>
              <Error />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
