import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { __logout } from '../redux/modules/user';

import Mainchat from '../components/Mainchat'
import jwtDecode from 'jwt-decode';
import Header from '../components/Header';

import Apple from '../asset/group279.svg'
import Bpple from '../asset/group281.svg'
import Cpple from '../asset/group284.svg'

const Main = () => {

  const dispatch = useDispatch();

  let abc = jwtDecode(localStorage.getItem('accessToken'))



  const clickLogout = () => {
    dispatch(__logout());
  };

  return (
    <ChatContainer>
      <Header />
      <Mainchat />
      <button onClick={clickLogout}>logout</button>
    </ChatContainer>
  )
}

export default Main

const ChatContainer = styled.div`
  height: 1000px;
`

