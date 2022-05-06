import React, { useEffect, useRef } from 'react'
import Stomp from 'stompjs';
import SockJS from "sockjs-client";
import styled from 'styled-components'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { actionCreators as ChatActions } from '../redux/modules/chat'
import { ChatUrls } from '../shared/ChatApi'

import { BsChevronDown } from 'react-icons/bs'
import { FaRegDotCircle } from 'react-icons/fa'

let stompClient = null

const Mainchat = (props) => {

  const chatList = useSelector((state) => state.chat.list)

  const dispatch = useDispatch()

  const messageRef = useRef();
  const modalref = useRef()

  const Token = 'Bearer ' + (localStorage.getItem('accessToken'))
  const userToken = jwtDecode(localStorage.getItem('accessToken'))

  const [userData, setUserData] = React.useState({
    nickname: userToken.NICKNAME,
    message: null,
  });

  const ConnectReady = () => {
    stompConnect()

    axios.get(ChatUrls.getChat)
      .then((res) => {
        dispatch(ChatActions.getChat(res.data))
        messageRef.current.scrollIntoView({ behavior: "smooth" })
      })
  }

  useEffect(() => {
    ConnectReady()
  }, [])

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" })
  }, [chatList])

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      sendPublicMessage();
    }
  };

  const modalExit = (show) => {

    setTimeout(() => {
      props.open(false)
      dispatch(ChatActions.clearChat())
    }, 700)

    modalref.current.style.animation = 'slide-out-elliptic-bottom-bck 0.7s ease-in both'
  }



  const stompConnect = () => {
    let sock = new SockJS(ChatUrls.sockUrl)

    stompClient = Stomp.over(sock);
    console.log(stompClient)
    stompClient.connect({}, onConnected, onError);
  };

  // const stompDisConnect = () => {
  //   console.log('disconnect')
  //   try {
  //     const user_join = { status: "OUT", senderName: username };
  //     stompClient.send("/app/mainchat", token, JSON.stringify(user_join));
  //     stompClient.disconnect(() => {
  //       stompClient.unsubscribe("/topic/mainchat");
  //     }, token);
  //   } catch (err) { }
  // };

  const onConnected = () => {
    try {
      const user_join = {
        status: "JOIN",
        senderName: userData.nickname,
        message: `${userData.nickname}님이 입장`,
        area: 'main',
      };

      let header = {
        'Authorization': Token,
      }

      stompClient.send(ChatUrls.sendUrl, header, JSON.stringify(user_join));
      stompClient.subscribe(ChatUrls.subscribeUrl, onPublicMessageReceived);

    } catch (err) {
      console.log(err);
    }
  };

  const onError = (err) => {
    console.log('Error! : ' + err)
    console.log((/Lost connection/g).test(err))
  };

  const sendPublicMessage = () => {

    if (!userData.message) {
      console.log("내용을 입력해주세요!");
    } else {
      try {
        let chatMessage = {
          status: "TALK",
          senderName: userData.nickname,
          message: userData.message,
          area: 'main',
        };

        let header = {
          'Authorization': Token,
        }

        stompClient.send(ChatUrls.sendUrl, header, JSON.stringify(chatMessage))

        setUserData({ ...userData, message: "" });
      }
      catch (err) {
        console.log(err)
      }
    }
  };

  const onPublicMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);

    switch (payloadData.status) {
      case "JOIN":
        break;
      case "OUT":
        break;
      case "TALK":
        dispatch(ChatActions.addChat({ senderName: payloadData.senderName, message: payloadData.message, createdAt: payloadData.createdAt }))
        console.log(chatList);
        break;
      default: break;
    }
  };



  return (
    <ChatModal ref={modalref}>
      <div className='head'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p className='onairp'>실시간</p>
          <FaRegDotCircle className='onairicon'></FaRegDotCircle>
        </div>
        <p className='headtitle'>아무말대잔치 채팅방</p>
        <BsChevronDown className='buttonDown' onClick={modalExit}></BsChevronDown>
      </div>

      <div className='chatContainer'>
        {chatList.map((v, i) => {
          if (v.senderName == userData.nickname)
            return <div key={i} style={{ display: 'flex', justifyContent: 'right' }}>
              <p className='chattime' style={{ margin: '2px 0 20px 0' }}>{v.createdAt}</p>
              <p className='userchat' style={{ justifyContent: 'right', wordBreak: 'break-all', width: '240px', height: '100%', margin: '2px 0 20px 0' }}>{v.message}</p>
              <p className='usernick'>{v.senderName}</p>
              <div className='chatImg'></div>
            </div>
          else
            return <div key={i} style={{ display: 'flex' }}>
              <div className='chatImg'></div>
              <p className='usernick'>{v.senderName}</p>
              <p className='userchat' style={{ justifyContent: 'left', wordBreak: 'break-all', width: '240px', height: '100%', margin: '2px 0 20px 0' }}>{v.message}</p>
              <p className='chattime' style={{ margin: '2px 0 20px 0' }}>{v.createdAt}</p>
            </div>
        })}
        <div ref={messageRef}></div>
      </div>

      <div className='chatBox'>
        <input className='chatInput'
          type='text'
          name='message'
          placeholder='메시지 보내기'
          value={userData.message || ''}
          maxLength='50'
          onKeyDown={onKeyDown}
          onChange={(e) => setUserData({ ...userData, message: e.target.value })}></input>
        <button className='sendBtn' onClick={sendPublicMessage}></button>
      </div>
    </ChatModal>
  )
}

export default Mainchat;

const ChatModal = styled.div`
  position: fixed;
  width: 470px;
  height: 868px;
  padding-bottom: 300px;
  right: 30px;
  bottom: 5px;

  /* White_#ffffff */

  background: #FFFFFF;
  /* gray_#c1c1c1 */

  border: 1px solid #C1C1C1;
  box-sizing: border-box;
  /* 3 */

  box-shadow: 0px 8px 16px -4px rgba(22, 34, 51, 0.08);
  border-radius: 11px;

  animation: slide-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;

  @keyframes slide-in-blurred-bottom {
    0% {
      transform: translateY(1000px) scaleY(2.5) scaleX(0.2);
      transform-origin: 50% 100%;
      filter: blur(40px);
      opacity: 0;
    }
    100% {
      transform: translateY(0) scaleY(1) scaleX(1);
      transform-origin: 50% 50%;
      filter: blur(0);
      opacity: 1;
    }
  }

  @keyframes slide-out-elliptic-bottom-bck {
    0% {
      transform: translateY(0) rotateX(0) scale(1);
      transform-origin: 50% -1400px;
      opacity: 1;
    }
    100% {
      transform: translateY(600px) rotateX(30deg) scale(0);
      transform-origin: 50% 100%;
      opacity: 1;
    }
  }
  

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    width: 409px;
    height: 38px;

    background: #222222;
    border-radius: 10px 10px 0px 0px;

    .onairp {
      width: 52px;
      height: 23px;

      /* 18pt_Medium */

      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      display: flex;
      align-items: center;
      text-align: center;

      /* White_#ffffff */
      color: #FFFFFF;
    }

    .onairicon {
      /* Ellipse 35 */

      width: 18px;
      height: 18px;
      margin: 4px 0 0 4px;

      /* White_#ffffff */

      color: #FF4E4E;
    }

    .headtitle {
      width: 171px;
      height: 29px;

      /* 20pt_Bold */

      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 29px;
      /* identical to box height */

      display: flex;
      align-items: center;
      text-align: center;

      /* White_#ffffff */

      color: #FFFFFF;
    }

    .buttonDown {
      /* Button_down */
      
      width: 28px;
      height: 28px;
      color: #FFFFFF;
    }
  }

  .chatContainer {
    
    padding: 20px;
    height: 100%;
    overflow-y: auto;

    .chatImg {
      width: 30px;
      height: 30px;

      background: #C4C4C4;
      border-radius: 4px;
    }

    .usernick {
      width: 56px;
      height: 29px;

      /* 20pt_Bold */

      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 29px;
      margin: 0 16px;
      /* identical to box height */

      display: flex;
      align-items: center;

      /* gray_#999999 */

      color: #999999;
    }

    .userchat {
      width: 162px;
      height: 29px;

      /* 20pt_Medium */

      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 29px;
      /* identical to box height */

      display: flex;
      align-items: center;

      /* Black_#222222 */

      color: #222222;
    }
  }

  .chatBox {
    position: fixed;
    width: 428px;
    height: 120px;
    bottom: 0px;
    padding: 20px;
    display: flex;
    align-items: center;
    border-radius: 0px 0px 11px 11px;

    background: #EDEFF2;

    .chatInput {
      box-sizing: border-box;

      width: 428px;
      height: 64px;
      padding: 24px;
      font-size: 20px;

      background: #FFFFFF;

      border: 1px solid #DFDFDF;
      border-radius: 4px;

      ::placeholder {
        font-size: 20px;
      }
    }

    .sendBtn {
      width: 40px;
      height: 40px;
      margin-left: -60px;

      background: #C4C4C4;
    }
  }
`