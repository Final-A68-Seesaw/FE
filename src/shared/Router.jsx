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
import AddDict from '../pages/AddDict';
import AddDictFigma from '../pages/AddDictFigma.jsx';
import Detail from '../pages/Detail';

import Main from '../pages/Main';
import Mypage from '../pages/Mypage';
import ProfileEdit from '../pages/ProfileEdit';
import SearchResult from '../pages/SearchResult';
import AuthRedirectHandler from '../auth/AuthRedirectHandeler';
import CrossWord from '../pages/CrossWord';

import Trouble from '../pages/Trouble';
import TroubleDetail from '../pages/TroubleDetail';
import TroubleWrite from '../pages/TroubleWrite';

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

        <Route path="/dictionary/add" exact component={AddDict}/>
        <Route path="/dictionary/add/figma" exact component={AddDictFigma}/>

        <Route path="/searchresult" exact component={SearchResult} />
        <Route path="/detail" exact component={Detail} />
        <Route path="/mypage" exact component={Mypage} />
        <Route path="/profiledit" exact component={ProfileEdit} />
        <Route path="/user/kakao/callback" exact component={AuthRedirectHandler}/>

        <Route path="/trouble" exact component={Trouble}/>
        <Route path="/troubledetail/:id" exact component={TroubleDetail}/>
        <Route path="/troublewrite" exact component={TroubleWrite}/>

        <Route path="/game" exact component={CrossWord}/>
        
      </ConnectedRouter>
    </Provider>
  )
}

export default Router;
