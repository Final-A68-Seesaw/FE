import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import isLogin from "../auth/isLogin";
import { throttle } from 'lodash'

//redux
import { history } from "../redux/configStore";
import { __logout } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";

//element & component
import Character from "./Character";
import { bold15, bold16, med14, med19 } from "../themes/textStyle";

//style
import styled, { css } from "styled-components";
import HeaderIcon from "../asset/HeaderIcon.svg";
import { GoSearch } from "react-icons/go";
import DropdownBtn from "../asset/HeaderDropdownBtn.svg";
import { __loadMypage } from "../redux/modules/mypage";

const Header = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const mypageInfo = useSelector((state) => state.mypage.list);
  const [scrolly, setScrolly] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [headInput, setHeadInput] = useState("");

  const ModRef = useRef()

  // onscroll = (e) => {
  //   setScrolly(scrollY);
  // };

  // const openModal = () => {
  //     setShowModal(!showModal);
  // }

  //검색 기능
  const HeadSearch = (e) => {
    if (e.key === "Enter") {
      Searching()
    }
  };

  const Searching = () => {
    if (headInput === '')
      alert('검색할 단어를 입력해주세요 !')
    else
      history.push(`/searchresult/${headInput}`);

    setHeadInput("");
  }

  const ModalOut = () => {
    setTimeout(() => {
      // setShowModal(null)
    }, 800)

    // ModRef.current.style.animation = 'slide-out-top 0.8s ease-in-out both'
  }

  const ModalList = (cate) => {
    setShowModal(cate)

    switch (cate) {
      case 'dict': console.log('didi'); return
      case 'ques': console.log('ques'); return
      case 'profile': console.log('pro'); return
      default: return
    }
  }

  useEffect(() => {
    dispatch(__loadMypage());
  }, []);

  return (
    <HeadWrap onMouseLeave={ModalOut}>
      <Head >
        <HeadInner >
          <div style={{ display: "flex" }}>
            <HeaderIcon
              className="jello-horizontal"
              onClick={() => history.push("/main")}
              style={{ cursor: "pointer", marginRight: "1.5rem" }}
            />

            <div style={{ display: "flex", margin: "0 0.1rem" }}>
              <HeaderMenu
                onMouseOver={() => setShowModal('dict')}
                className="jello-horizontal"
                pathname={location.pathname === "/dictionary"}
                onClick={() => { history.push("/dictionary") }}
              >
                사전장
              </HeaderMenu>
            </div>
            <div style={{ display: "flex", margin: "0 0.1rem" }}>
              <HeaderMenu
                onMouseOver={() => setShowModal('ques')}
                className="jello-horizontal"
                pathname={location.pathname === "/trouble"}
                onClick={() => { history.push("/trouble") }}
              >
                질문장
              </HeaderMenu>
            </div>
            <div style={{ display: "flex", margin: "0 0.1rem" }}>
              <HeaderMenu
                onMouseOver={() => setShowModal('game')}
                className="jello-horizontal"
                pathname={location.pathname === "/gamemain"}
                onClick={() => { history.push("/gamemain") }}
              >
                게임장
              </HeaderMenu>
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
              <GoSearch onClick={Searching} style={{ margin: "0 0 0 -1.5rem", color: "#FAFAFA" }} />
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

              {/* <TroubleAddBtn
                className="jello-horizontal"
                onClick={() => history.push("/trouble/add")}
              >
                고민 상담하기
              </TroubleAddBtn> */}
              <MyInfo className="jello-horizontal"
                onMouseOver={() => setShowModal('profile')}>
                <Character char={mypageInfo.profileImages} />
                <MyNickname onClick={() => history.push("/mypage/scrap")}>
                  {mypageInfo.nickname}
                  <div style={{ margin: "0.2rem 0 0 0.5rem" }}>
                    <DropdownBtn />
                  </div>
                </MyNickname>
              </MyInfo>
            </RightGroup>
          )}
        </HeadInner>
      </Head>

      {showModal ?
        <ModalContainer ref={ModRef} className="slide-in-top slide-out-top">
          {showModal === 'dict' ?
            <DictHead>
              <p
                // onClick={() => history.push('/dictionary')}
                // pathname={location.pathname === '/dictionary'}
                >신조어 사전 둘러보기</p>
              <p>신조어 단어 추가하기</p>
            </DictHead>
            : null}
          {showModal === 'ques' ?
            <TrouHead>
              <p>고민상담 둘러보기</p>
              <p>고민상담 추가하기</p>
            </TrouHead>
            : null}
          {showModal === 'profile' ?
            <ProfileHead>
              <p>마이페이지</p>
              <p>제작자 소개</p>
            </ProfileHead>
            : null}
        </ModalContainer>
        : null}
    </HeadWrap>
  );
};

export default Header;

const HeadWrap = styled.div`
  
  .slide-in-top {
    animation: slide-in-top 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }

  @keyframes slide-in-top {
    0% {
      transform: translateY(-1000px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

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
  
`;

const HeadInner = styled.div`
  max-width: 80rem;
  height: 74px;
  margin: auto;
  z-index: 90;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WordAddBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 1rem;
  gap: 0.625rem;
  ${bold15}
  margin-right: 1rem;
  color: #eeeeee;
  background: #333333;
  border: 0.1rem solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;

cursor: pointer;
`;

const TroubleAddBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 1rem;
  gap: 0.625rem;
  ${bold15}
  margin-right: 1rem;
  color: var(--yellow);
  background: #333333;
  border: 0.1rem solid rgba(255, 196, 56, 0.3);
  border-radius: 2rem;

  cursor: pointer;
`;

const HeaderMenu = styled.p`
  margin-right: 1.5rem;
  ${med19}
  line-height: 1.75rem;
  display: flex;
  align-items: center;
  text-align: center;
  /* margin-right: 30px; */
 color: ${(props) => (props.pathname ? "var(--yellow)" : "white")} !important;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 107px;
  left: 0px;
  top: 74px;
  z-index: 80;

  background: #444444;
  border-radius: 0px 0px 15px 15px;

  .slide-out-top {
    animation: slide-out-top 0.8s ease-in-out both;
  }
  
  @keyframes slide-out-top {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-1000px);
      opacity: 0;
    }
  }

  color: ${(props) => (props.pathname ? "#FFC438" : "#FFFFFF")}
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 24rem;
  height: 2.25rem;
  color: var(--white);
  background: #494949;
  border-radius: 0.125rem;
  padding: 0px 1rem;
  /* margin: 23px 0 15px 0; */

  ::placeholder {
    ${med14}
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
  padding: 0 0.5rem;
  margin-left: 1rem;
  width: 7rem;
  height: 2rem;

  background: #333333;
  border: 0.1rem solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;

  ${bold16}
  display: flex;
  align-items: center;
  text-align: right;

  color: #eeeeee;

  flex: none;
  order: 0;
  flex-grow: 0;

  cursor: pointer;
`;
const MyInfo = styled.div`
  margin-right: 1.5rem;
  height: 2rem;

  cursor: pointer;
`;
const MyNickname = styled.div`
  ${med14}
  margin: 0.5rem 0.5rem 0 2.5rem;
  display: flex;
  align-items: center;
  color: #ffffff;
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
  ${med14}
  align-items: center;

  color: #ffffff;
`;

const DictHead = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  width: 140px;
  height: 58px;
  left: 212px;
  top: 98px;
  gap: 12px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  display: flex;
  align-items: center;

  /* White_#ffffff */

  color: #FFFFFF;
`

const TrouHead = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  width: 122px;
  height: 58px;
  left: 293px;
  top: 98px;
  gap: 12px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  display: flex;
  align-items: center;

  color: #FFFFFF;
`

const ProfileHead = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  width: 78px;
  height: 58px;
  left: 1288px;
  top: 98px;
  gap: 12px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  display: flex;
  align-items: center;

  color: #FFFFFF;
`