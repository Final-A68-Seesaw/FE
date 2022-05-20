import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";

import { GoSearch } from "react-icons/go";

import Image from '../elements/Image'
import { InputText } from '../elements/Input'
import Text from '../elements/Text'
import Character from './Character'

import HeaderIcon from '../asset/HeaderIcon.svg'
import isLogin from '../auth/isLogin'
import { useDispatch, useSelector } from 'react-redux'
import { __logout } from '../redux/modules/user'
import { MainApi } from '../api/mainApi'
import { actionCreators as SearchActions } from '../redux/modules/search'
import { userActions } from '../redux/modules/user'

import { bold14, bold15, bold16 } from "../themes/textStyle";

const Header = (props) => {
    const dispatch = useDispatch();
    const userinfo = useSelector((state) => (state.user.userinfo))

    const [scrolly, setScrolly] = useState(0)
  const [showModal, setShowModal] = useState(false);
  const [headInput, setHeadInput] = useState("");

  onscroll = (e) => {
    setScrolly(scrollY);
  };

  // const openModal = () => {
  //     setShowModal(!showModal);
  // }
//왼족 메뉴 그룹 컬러 변경
const [textColor, setTextColor] = useState('white');
const [isWhite, setIsWhite] = useState(true);

const onChangeColor = (e) => {
  setIsWhite(!isWhite);
  setTextColor(isWhite ? "var(--yellow)": "white");
  history.push("/dictionary")
}

//검색 기능
  const HeadSearch = (e) => {
    if (e.key === "Enter") {
      history.push(`/searchresult/${headInput}`);
      setHeadInput("");
    }
  };

    // const openModal = () => {
    //     setShowModal(!showModal);
    // }

    useEffect(() => {
        dispatch(userActions.loadUser())
    }, [])

    return (
        <Head>
            {/* {showModal ?
                <ModalContainer className='slide-in-left'>
                    <div>메뉴</div>
                </ModalContainer> : null} */}

      <HeadInner>
        <div style={{ display: "flex" }}>
          <HeaderIcon
            className="jello-horizontal"
            onClick={() => history.push("/")}
            style={{ cursor: "pointer" }}
          />
          {/* <div style={{ margin: '0 30px', cursor: 'pointer' }} onClick={openModal}>오잉</div> */}

          <div style={{ display: "flex", margin: "0 0 0 25px" }}>
            <HearderText
              className="jello-horizontal"
              onClick={onChangeColor}
            >
              사전장
            </HearderText>

            <HearderText
              className="jello-horizontal"
              onClick={() => history.push("/trouble")}
            >
              질문장
            </HearderText>

            <HearderText
              className="jello-horizontal"
              onClick={() => history.push("/gamemain")}
            >
              게임장
            </HearderText>
          </div>
        </div>

        {
          <SearchDiv>
            <SearchInput
              placeholder="검색어를 입력해주세요"
              value={headInput}
              onChange={(e) => setHeadInput(e.target.value)}
              onKeyDown={HeadSearch}
            />
            <GoSearch style={{ margin: "0 0 0 -25px", color: "#FAFAFA" }} />
          </SearchDiv>
        }

        {!isLogin() ? (
          <div style={{ display: "flex" }}>
            <WriteDicBtn onClick={() => history.push("/login")}>
              <p>로그인</p>
            </WriteDicBtn>
            <WriteDicBtn onClick={() => history.push("/signup")}>
              <p>회원가입</p>
            </WriteDicBtn>
          </div>
        ) : (
          <RightGroup>
            <WordAddBtn
              className="jello-horizontal"
              onClick={() => history.push("/dictionary/add")}
            >
              단어 등재하기
            </WordAddBtn>

            <TroubleAddBtn
              className="jello-horizontal"
              onClick={() => history.push("/trouble/add")}
            >
              고민 상담하기
            </TroubleAddBtn>

            <HeadNick
              className="jello-horizontal"
              onClick={() => history.push("/mypage/scrap")}
            >
              {localStorage.getItem("nickname")}
            </HeadNick>
          </RightGroup>
        )}
      </HeadInner>
    </Head>
  );
};

export default Header;

const Head = styled.div`
  position: fixed;
  background: #262626;
  box-shadow: 0px 4px 8px -4px rgba(22, 34, 51, 0.08),
    0px 16px 24px rgba(22, 34, 51, 0.08);
  z-index: 100;
  width: 100%;
  top: 0px;
  height: 74px;

  .jello-horizontal {
    :hover {
      animation: jello-horizontal 0.9s both;
    }
  }

  @keyframes jello-horizontal {
    0% {
      transform: scale3d(1, 1, 1);
    }
    30% {
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  }

  .slide-in-left {
    animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  @keyframes slide-in-left {
    0% {
      transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .slide-out-left {
    animation: slide-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  }

  @keyframes slide-out-left {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-1000px);
      opacity: 0;
    }
  }
`;

const HeadInner = styled.div`
  max-width: 80rem;
  height: 74px;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WordAddBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;
  ${bold15}
  margin-right: 1rem;
  color: #eeeeee;
  background: #333333;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
`;

const TroubleAddBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;
  ${bold15}
  margin-right: 1rem;
  color: var(--yellow);
  background: #333333;
  border: 1.5px solid rgba(255, 196, 56, 0.3);
  border-radius: 30px;
`;

const HearderText = styled.p`
  margin-right: 1.5rem;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 28px;

  display: flex;
  align-items: center;
  text-align: center;
  /* margin-right: 30px; */

  cursor: pointer;

  color: #fafafa;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 10px;
  top: 110px;
  /* transform: translate(-50%, -50%); */
  max-height: 80%;
  width: 20rem;
  height: 80%;
  padding: 16px;
  background: rgba(200, 200, 200, 0.8);
  border-radius: 10px;
  text-align: center;
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 380px;
  height: 36px;

  background: #494949;
  border-radius: 2px;
  padding: 0px 15px;
  /* margin: 23px 0 15px 0; */

  ::placeholder {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;

    color: #a2a2a2;
  }
`;

const WriteDicBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  margin-left: 1rem;
  width: 113px;
  height: 36px;

  background: #333333;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: right;

  color: #eeeeee;

  flex: none;
  order: 0;
  flex-grow: 0;

  cursor: pointer;
`;
const RightGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProfileDiv = styled.div`
  display: flex;
  width: 48px;
  height: 30px;
`;

const HeadNick = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  color: #ffffff;
`;
