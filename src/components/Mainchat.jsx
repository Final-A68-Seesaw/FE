import React, { useEffect, useRef } from 'react'
import Stomp from 'stompjs';
import SockJS from "sockjs-client";

import styled from 'styled-components'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { actionCreators as ChatActions } from '../redux/modules/chat'
import { ChatUrls } from '../shared/ChatApi'

let stompClient = null

const Mainchat = () => {

    const chatList = useSelector((state) => state.chat.list)

    const dispatch = useDispatch()
    const [addChat, setAddChat] = React.useState([])

    const [userData, setUserData] = React.useState({
        username: "wow",
        message: "",
    });

    const messageRef = useRef();

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



    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            sendPublicMessage();
        }
    };



    const sendPublicMessage = () => {
      
        if (!userData.message) {
            console.log("내용을 입력해주세요!");
        } else {
            try {
                let chatMessage = {
                    status: "TALK",
                    senderName: userData.username,
                    message: userData.message,
                    area: 'main',
                };

                stompClient.send(ChatUrls.sendUrl, {}, JSON.stringify(chatMessage))

                setUserData({ ...userData, message: "" });

                console.log('send over')
            }
            catch (err) {
                console.log(err)
            }
        }
    };



    useEffect(() => {
        stompConnect()

        axios.get(ChatUrls.getChat)
            .then((res) => {
                dispatch(ChatActions.getChat(res.data))
                setAddChat(res.data)
                console.log('list : ', chatList)
            })

        // return stompDisConnect()
    }, [])



    const getchat = () => {
        axios.get(ChatUrls.getChat)
            .then((res) => {
                setAddChat(res.data)
                console.log(res.data)
                console.log(addChat)
                console.log('list : ', chatList)
            })
    }



    const onConnected = () => {
        console.log('onCon')
        try {
            const user_join = {
                status: "JOIN",
                senderName: 'wow',
                message: 'wow님이 입장했나요?',
                area: 'main',
            };

            stompClient.send(ChatUrls.sendUrl, {}, JSON.stringify(user_join));
            stompClient.subscribe(ChatUrls.subscribeUrl, onPublicMessageReceived);
            // if (chatScroll !== true) {
            //   scroll();
            //   setChatScroll(true);
            // }
        } catch (err) {
            console.log(err);
        }
    };

    const onError = (err) => {
        console.log('Error! : ' + err)
        console.log((/Lost connection/g).test(err))
    };

    const onPublicMessageReceived = (payload) => {
        console.log(payload)
        let payloadData = JSON.parse(payload.body);
        console.log(payloadData)
        switch (payloadData.status) {
            case "JOIN":
                console.log('join')
                break;
            case "OUT":
                console.log('out')
                break;
            case "TALK":
                setAddChat({ senderName: payloadData.senderName, message: payloadData.message, createdAt: payloadData.createdAt })
                console.log('msg')

                break;
            default: break;
        }
    };



    return (
        <ChatDiv>
            <ChatTab>
                <li
                    onClick={() => {
                        // setTab("CHATROOM");
                    }}>
                    채팅
                </li>
            </ChatTab>
            <ChatList ref={messageRef}>
                <ul>
                    <p>chat - start</p>
                    {chatList.map((v, i) => {
                        if (v.senderName == userData.username)
                            return <p key={i} style={{ display: 'flex', flexDirection: 'row-reverse' }}>{v.createdAt} : {v.senderName} : {v.message}</p>
                        else
                            return <p key={i}>{v.createdAt} : {v.senderName} : {v.message}</p>
                    })}
                    {/* {chat_list &&
                        chat_list.map((chat, index) => (
                            <li
                                className={` ${chat.senderName === username ? "self" : "user"}`}
                                key={index}>
                                {chat.senderName !== username && (
                                    <>
                                        <Profile size='32' imgUrl={userData.userImage} />
                                        <div>
                                            <strong>{chat.senderName}</strong>
                                            <i>{chat.career}</i>
                                        </div>
                                    </>
                                )}
                                <dl>
                                    <dt className='message-data'>{chat.message}</dt>
                                    <dd className='u'>
                                        {chat.createdAt.split("T")[1].split(".")[0]}
                                    </dd>
                                </dl>
                            </li>
                        ))} */}

                    {/* {publicChats.map((chat, index) => (
                        <li
                            className={` ${chat.senderName === username ? "self" : "user"}`}
                            key={index}>
                            {chat.senderName !== username && (
                                <>
                                    <Profile size='32' imgUrl={userData.userImage} />
                                    <div>
                                        <strong>{chat.senderName}</strong>
                                        <i>{chat.career}</i>
                                    </div>
                                </>
                            )}
                            <dl>
                                <dt className='message-data'>{chat.message}</dt>
                                <dd className='me'>
                                    {chat.createdAt.split("T")[1].split(".")[0]}
                                </dd>
                            </dl>
                        </li>
                    ))} */}
                </ul>
            </ChatList>
            <ChatInput>
                <div>
                    <input
                        type='text'
                        name='message'
                        value={userData.message}
                        placeholder='채팅을 입력해주세요 :)'
                        onChange={(e) => setUserData({ ...userData, message: e.target.value })}
                        onKeyPress={onKeyPress}
                    />
                    <button onClick={sendPublicMessage}>
                        버튼
                    </button>
                    <button onClick={getchat}>
                        Axios
                    </button>
                </div>
            </ChatInput>
        </ChatDiv>
    )
}

export default Mainchat;




const ChatDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 124px - 224px - 18px - 18px);
  background-color: #f9f8ff;
  border-radius: 8px;
  overflow: hidden;
`;

const ChatTab = styled.ul`
  display: flex;
  flex: none;
  overflow: auto;
  li {
    width: 74px;
    text-align: center;
    margin: 0 12px;
    font-size: 18px;
    font-weight: 700;
    line-height: 58px;
    color: #5e45f2;
    border-bottom: solid 3px #5e45f2;
  }
`;

const ChatList = styled.div`
  flex: auto;
  padding: 0 10px;
  overflow: auto;
  ul {
    padding-top: 30px;
    overflow: hidden;
  }
  li {
    width: 286px;
    &.welcome {
      color: #5e45f2;
    }
    &.user {
      position: relative;
      padding-top:6px;
      padding-left: 36px;
      padding-right: 10px;
      padding-bottom:12px;
      div {
        display: flex;
        align-items: center;
      }
      strong {
        font-size: 14px;
        color: #5e45f2;
      }
      dt {
        margin-top: 8px;
        color: #333;
        background-color: #fff;
        box-shadow: 0 4px 14px 0 rgba(65, 0, 131, 0.06);
      }
      dd {
        text-align: start;
      }
    }
    &.self {
      margin: 12px 0;
      margin-left: auto;
      dl {
        flex-direction: row-reverse;
      }
      dt {
        color: #fff;
        background-color: #7966ff;
      }
      dd {
        text-align: end;
      }
    }
  }
  dl {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    dt {
      width: 80%;
      padding: 8px;
      word-break: break-all;
      border-radius: 8px;
    }
    dd {
      display: block;
      text-align: right;
      font-size: 10px;
    }
  }
  span {
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 0 4px 0 rgba(121, 102, 255, 0.2);
  }
  i {
    position: relative;
    padding-left:5px;
    margin-left:6px;
    color: #797979;
    font-size: 12px;
    font-style: normal;
    &:before {
      --dot-size: 2px;
      content: "";
      display: block;
      position: absolute;
      left:0;
      top:50%;
      transform:translateY(-50%);
      width: var(--dot-size);
      height: var(--dot-size);
      border-radius: var(--dot-size);
      background-color:#797979;
    }
  }
  dd {
    display: block;
    margin-top: 10px;
    color: #797979;
    font-size: 12px;
    font-style: normal;
    text-align: end;
  }
`;

const ChatInput = styled.div`
  padding: 24px 16px;
  background-color: #f9f8ff;
  box-shadow: 0 -4px 10px 0 rgba(133, 47, 243, 0.05);
  > div {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 8px 14px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: inset 0 2px 6px 0 rgba(60, 4, 105, 0.08);
    background-color: #fff;
  }
  input {
    flex: auto;
    padding: 0;
    background-color: transparent;
  }
  button {
    flex: none;
    svg {
      vertical-align: middle;
    }
  }
`;