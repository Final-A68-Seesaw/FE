import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';

//pages

//Signup,Login
import Signup from '../pages/Signup'
import SignupMBTI from '../pages/SignupMBTI';
import SignupCharacter from '../pages/SignupCharacter';
import Login from '../pages/Login';

import Detail from '../pages/Detail';
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
import Trouble from '../pages/Trouble';

const Router = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route path="/signup" exact component={Signup} />
        <Route path="/signup/making" exact component={SignupMBTI}/>
        <Route path="/signup/making/character" exact component={SignupCharacter}/>

        <Route path="/login" exact component={Login} />
        
        <Route path="/" exact component={Main} />
        <Route path="/searchresult" exact component={SearchResult} />
        <Route path="/detail" exact component={Detail} />
        <Route path="/mypage" exact component={Mypage} />
        <Route path="/profiledit" exact component={ProfileEdit} />
        <Route path="/user/kakao/callback" component={AuthRedirectHandler}/>

        <Route path="/trouble" component={Trouble}/>
        <Route path="/game" component={CrossWord}/>
        
      </ConnectedRouter>
    </Provider>
  )
}

export default Router;
