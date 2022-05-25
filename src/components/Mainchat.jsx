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
import { FiSend } from 'react-icons/fi'
import { cookies } from '../shared/cookie';

let stompClient = null

const Mainchat = (props) => {

  const chatList = useSelector((state) => state.chat.list)

  const dispatch = useDispatch()

  const messageRef = useRef();
  const modalref = useRef()

  const Token = 'Bearer ' + cookies.get('accessToken')
  const userToken = jwtDecode(cookies.get('accessToken'))

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

    return () => stompDisConnect()
  }, [])

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" })
  }, [chatList])

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      sendPublicMessage()
    }
  };

  onkeydown = (e) => {
    if (e.key === "Escape") {
      modalExit()
    }
  }

  const modalExit = (show) => {

    stompDisConnect();

    setTimeout(() => {
      props.open(false)
      dispatch(ChatActions.clearChat())
    }, 700)

    modalref.current.style.animation = 'slide-out-elliptic-bottom-bck 0.7s ease-in both'
  }



  const stompConnect = () => {
    let sock = new SockJS(ChatUrls.sockUrl)

    stompClient = Stomp.over(sock);
    stompClient.connect({}, onConnected, onError);
  };

  const stompDisConnect = () => {
    try {
      const user_join = {
        status: "OUT",
        senderName: userData.nickname,
        message: `${userData.nickname}님이 퇴장`,
        area: 'main',
      };

      let header = {
        'Authorization': Token,
      }

      stompClient.send(ChatUrls.sendUrl, header, JSON.stringify(user_join));
      stompClient.disconnect(() => {
        stompClient.unsubscribe(ChatUrls.subscribeUrl)
      })
    } catch (err) {
      console.log(err)
    }
  };

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
        dispatch(ChatActions.addChat({ message: payloadData.message }))
        break;
      case "OUT":
        dispatch(ChatActions.addChat({ message: payloadData.message }))
        break;
      case "TALK":
        dispatch(ChatActions.addChat({ senderName: payloadData.senderName, message: payloadData.message, createdAt: payloadData.createdAt }))
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
          if (!v.senderName)
            return <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
              <p className='userchat' style={{ wordBreak: 'break-all', width: '240px', height: '100%', margin: '20px 0' }}>{v.message}</p>
            </div>

          return <div key={i} style={{ display: 'flex' }}>
            <div className='chatImg'></div>
            <p className='usernick'>{v.senderName}</p>
            <p className='userchat' style={{ justifyContent: 'left', wordBreak: 'break-all', width: '240px', height: '100%', margin: '-2px 10px 20px 0' }}>{v.message}</p>
            {/* <p className='chattime' style={{ margin: '4px 0 20px 0', fontSize: '10px' }}>{v.createdAt}</p> */}
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
        <FiSend className='sendBtn' onClick={sendPublicMessage} />
      </div>
    </ChatModal>
  )
}

export default Mainchat;

const ChatModal = styled.div`
  position: fixed;
  z-index: 100;
  
  width: 379.75px;
  height: 640px;

  padding-bottom: 300px;
  right: 30px;
  bottom: 5px;

  background: #FFFFFF;

  border: 0.75px solid #C1C1C1;
  box-sizing: border-box;
  /* 3 */

  box-shadow: 0px 6px 12px -3px rgba(22, 34, 51, 0.08);
  border-radius: 8.25px;

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
    padding: 0 15px;
    
    width: 348px;
    height: 58px;

    background: #222222;
    border-radius: 7.5px 7.5px 0px 0px;

    .onairp {
      width: 52px;
      height: 23px;
      
      width: 52.5px;
      height: 17.25px;
      /* margin: 0 15px 0 15px; */

      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 26px;
      display: flex;
      align-items: center;
      text-align: center;

      color: #FFFFFF;
    }

    .onairicon {
      width: 18px;
      height: 18px;
      
      width: 9.75px;
      height: 9.75px;

      margin: 4px 0 0 4px;

      color: #FF4E4E;
    }

    .headtitle {
      width: 171px;
      height: 29px;
      
      width: 142px;
      height: 22px;

      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 700;
      font-size: 15px;
      line-height: 29px;

      display: flex;
      align-items: center;
      text-align: center;

      color: #FFFFFF;
    }

    .buttonDown {
      width: 21px;
      height: 21px;
      color: #FFFFFF;
    }
  }

  .chatContainer {
    
    padding: 20px;
    height: 420px;
    overflow-y: auto;
    overflow-x: hidden;
    
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background: #C0C4C9;
      border-radius: 3.71094px;
      height: 84px;
    }

    .chatImg {
      min-width: 23px;
      height: 23px;
      margin: 2px 0 0 0;

      background: #C4C4C4;
      border-radius: 3px;
    }

    .usernick {
      width: 76px;
      min-width: 56px;
      /* width:42px; */
      max-height: 22px;
      justify-content: center;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 700;
      font-size: 15px;
      line-height: 22px;
      margin: 0 16px;

      /* display: flex; */
      align-items: center;

      color: #999999;
    }

    .userchat {
      width: 162px;
      height: 29px;

      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;

      display: flex;
      align-items: center;

      color: #222222;
    }
  }

  .chatBox {
    position: fixed;

    width: 337px;
    height: 119px;

    bottom: 0px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;

    border: 0.75px solid #DFDFDF;
    background: #F5F7FF;

    .chatInput {
      box-sizing: border-box;
      
      width: 320px;
      height: 48px;

      padding-left: 20px;
      padding-right: 90px;
      font-size: 15px;
      margin: 15px 0 56px 0;

      background: #FFFFFF;

      border: 1px solid #DFDFDF;
      border-radius: 3px;

      ::placeholder {
        font-size: 15px;
      }
    }

    .sendBtn {
      width: 30px;
      height: 30px;
      margin: 0 0 40px -40px;

      /* background: #C4C4C4; */
      
      cursor: pointer;
    }
  }
`