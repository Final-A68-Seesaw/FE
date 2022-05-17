import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';

//pages
//Signup,Login
import Signup from '../pages/Signup'
import SignupMBTI from '../pages/SignupMBTI';
import SignupCharacter from '../pages/SignupCharacter';
import Login from '../pages/Login';

//dictionary
import DictAdd from '../pages/DictAdd';
import DictDetail from '../pages/DictDetail';
import DictList from '../pages/DictList';
import DictDetailEdit from '../pages/DictDetailEdit'

//trouble
import Trouble from '../pages/Trouble';
import TroubleDetail from '../pages/TroubleDetail';
import TroubleWrite from '../pages/TroubleWrite';

import Main from '../pages/Main';
import Mypage from '../pages/Mypage';
import ProfileEdit from '../pages/ProfileEdit';
import SearchResult from '../pages/SearchResult';
import AuthRedirectHandler from '../auth/AuthRedirectHandeler';
import CrossWord from '../pages/CrossWord';

// HOC (high order components)
import PublicRoute from "../auth/PublicRoute";
import PrivateRoute from "../auth/PrivateRoute";

import { Provider } from 'react-redux';
import store, { history } from '../redux/configStore';

const Router = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route path="/signup" exact component={Signup} />
        <Route path="/signup/making" exact component={SignupMBTI}/>
        <Route path="/signup/making/character" exact component={SignupCharacter}/>
        <Route path="/login" exact component={Login} />
        
        <Route path="/" exact component={Main} />

        <Route path="/dictionary" exact component={DictList}/>
        <Route path="/dictionary/add" exact component={DictAdd}/>
        <Route path="/dictionary/detail/:cardTitleId" exact component = {DictDetail}/>
        <Route path="/dictionary/detail/:cardTitleId/edit" exact component = {DictDetailEdit}/>

        <Route path="/searchresult/:id" exact component={SearchResult} />
        <Route path="/mypage" exact component={Mypage} />
        <Route path="/profiledit" exact component={ProfileEdit} />
        <Route path="/user/kakao/callback" exact component={AuthRedirectHandler}/>

        <Route path="/trouble" exact component={Trouble}/>
        <Route path="/troubledetail/:id" exact component={TroubleDetail}/>
        <Route path="/troublewrite" exact component={TroubleWrite}/>
        <Route path="/troublewrite/:id" exact component={TroubleWrite}/>

        <Route path="/game" exact component={CrossWord}/>
        
      </ConnectedRouter>
    </Provider>
  )
}

export default Router;
