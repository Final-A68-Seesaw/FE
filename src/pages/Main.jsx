import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { __logout } from '../redux/modules/user';

import Mainchat from '../components/Mainchat'
import Header from '../components/Header';

const Main = () => {

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(!showModal);
  }

  console.log(showModal)

  const dispatch = useDispatch();

  const clickLogout = () => {
    dispatch(__logout());
  };

  return (
    <ChatContainer>
      <Header />

      <ChatBtn onClick={openModal}><div></div><p>실시간 아무말대잔치</p></ChatBtn>

      {showModal ? <Mainchat open={setShowModal} /> : null}

    </ChatContainer>
  )
}

export default Main

const ChatContainer = styled.div`
  height: 1000px;
`

const ChatBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 18px 30px 18px 20px;

  position: fixed;
  width: 280px;
  height: 72px;
  right: 30px;
  bottom: 30px;

  background: #FFFFFF;
/* 3 */

  box-shadow: 0px 8px 16px -4px rgba(22, 34, 51, 0.08);
  border-radius: 400px;

  :hover {
    cursor: pointer;
  }

  div {
    position: static;
    width: 60px;
    height: 60px;

    /* gray_#EDEFF2 */

    background: #EDEFF2;
    border-radius: 200px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px 14px;
  }

  p {
    position: static;
    width: 171px;
    height: 29px;

    /* 20pt_Medium */

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 29px;
    /* identical to box height */

    display: flex;
    align-items: center;

    /* Black_#222222 */

    color: #222222;


    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0px 14px;
  }
`