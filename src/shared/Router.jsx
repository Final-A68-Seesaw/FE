import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';

//pages
import Login from '../pages/Login';
import Detail from '../pages/Detail';
import Main from '../pages/Main';
import Mypage from '../pages/Mypage';
import ProfileEdit from '../pages/ProfileEdit';
import SearchResult from '../pages/SearchResult';

const Router = () => {
  return (
    <div>
        <Route path="/" exact component={Login}/>
  
    </div>
  )
}

export default Router
