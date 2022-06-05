import React, { lazy } from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import store, { history } from "../redux/configStore";
import { Suspense } from "react";

//pages
// //Signup,Login
// import Signup from "../pages/Signup";
// import SignupMBTI from "../pages/SignupMBTI";
// import SignupCharacter from "../pages/SignupCharacter";
// import Login from "../pages/Login";
// import AuthRedirectHandler from "../auth/AuthRedirectHandler";

// //main
// import StartPage from "../pages/StartPage";
// import Main from "../pages/Main";
// import About from "../pages/About";

// //Search
// import SearchResult from "../pages/SearchResult";

// //dictionary
// import DictAdd from "../pages/DictAdd";
// import DictDetail from "../pages/DictDetail";
// import DictList from "../pages/DictList";
// import DictDetailEdit from "../pages/DictDetailEdit";
const DictAdd = lazy(() => import("../pages/DictAdd"));
const DictDetail = lazy(() => import("../pages/DictDetail"));
const DictList = lazy(() => import("../pages/DictList"));
const DictDetailEdit = lazy(() => import("../pages/DictDetailEdit"));
const SearchResult = lazy(() => import("../pages/SearchResult"));
const About = lazy(() => import("../pages/About"));
const Main = lazy(() => import("../pages/Main"));
const StartPage = lazy(() => import("../pages/StartPage"));
const AuthRedirectHandler = lazy(() => import("../auth/AuthRedirectHandler"));
const Login = lazy(() => import("../pages/Login"));
const SignupCharacter = lazy(() => import("../pages/SignupCharacter"));
const SignupMBTI = lazy(() => import("../pages/SignupMBTI"));
const Signup = lazy(() => import("../pages/Signup"));

// //trouble
// import TroubleList from "../pages/TroubleList";
// import TroubleDetail from "../pages/TroubleDetail";
// import TroubleAdd from "../pages/TroubleAdd";
// import TroubleDetailEdit from "../pages/TroubleDetailEdit";

// //MyPage
// import MyPageScrap from "../pages/MyPageScrap";
// import MyPageMyWord from "../pages/MyPageMyWord";
// import MyPageWriting from "../pages/MyPageWriting";
// import MyPageEdit from "../pages/MyPageEdit";

// import CrossWord from "../pages/CrossWord";
// import GameMain from "../pages/GameMain";

const GameMain = lazy(() => import("../pages/GameMain"));
const CrossWord = lazy(() => import("../pages/CrossWord"));
const MyPageEdit = lazy(() => import("../pages/MyPageEdit"));
const MyPageWriting = lazy(() => import("../pages/MyPageWriting"));
const MyPageMyWord = lazy(() => import("../pages/MyPageMyWord"));
const MyPageScrap = lazy(() => import("../pages/MyPageScrap"));
const TroubleDetailEdit = lazy(() => import("../pages/TroubleDetailEdit"));
const TroubleAdd = lazy(() => import("../pages/TroubleAdd"));
const TroubleDetail = lazy(() => import("../pages/TroubleDetail"));
const TroubleList = lazy(() => import("../pages/TroubleList"));

const Router = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path="/" exact component={StartPage} />
          <Route path="/about" exact component={About} />

          <Route path="/signup" exact component={Signup} />
          <Route path="/signup/making" exact component={SignupMBTI} />
          <Route
            path="/signup/making/character"
            exact
            component={SignupCharacter}
          />
          <Route path="/login" exact component={Login} />

          <Route
            path="/user/kakao/callback"
            exact
            component={AuthRedirectHandler}
          />

          <Route path="/main" exact component={Main} />
          <Route path="/searchresult/:keyword" exact component={SearchResult} />

          <Route path="/dictionary" exact component={DictList} />
          <Route path="/dictionary/add" exact component={DictAdd} />
          <Route
            path="/dictionary/detail/:cardTitleId"
            exact
            component={DictDetail}
          />
          <Route
            path="/dictionary/detail/:cardTitleId/edit"
            exact
            component={DictDetailEdit}
          />

          <Route path="/trouble" exact component={TroubleList} />
          <Route path="/trouble/detail/:id" exact component={TroubleDetail} />
          <Route path="/trouble/add" exact component={TroubleAdd} />
          <Route
            path="/trouble/detail/:id/edit"
            exact
            component={TroubleDetailEdit}
          />

          <Route path="/mypage/scrap" exact component={MyPageScrap} />
          <Route path="/mypage/myword" exact component={MyPageMyWord} />
          <Route path="/mypage/writing" exact component={MyPageWriting} />
          <Route path="/mypage/edit" exact component={MyPageEdit} />

          <Route path="/gamemain" exact component={GameMain} />
          <Route path="/game" exact component={CrossWord} />
        </Suspense>
      </ConnectedRouter>
    </Provider>
  );
};

export default Router;
