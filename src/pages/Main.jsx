import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { __logout } from '../redux/modules/user';

import Mainchat from '../components/Mainchat'

const Main = () => {
  
  const dispatch = useDispatch();
  const clickLogout = () => {
      dispatch(__logout());
    };

  return (
    <ChatContainer>
      <Mainchat />
            <button onClick={clickLogout}>logout</button>
    </ChatContainer>
  )
}

export default Main

const ChatContainer = styled.div`
  height: 1000px;
`