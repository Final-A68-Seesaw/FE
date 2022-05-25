import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import isLogin from "../auth/isLogin";
import { throttle } from "lodash";

//redux
import { history } from "../redux/configStore";
import { __logout } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";

//element & component
import Character from "./Character";
import { bold15, bold16, med14, med16, med19 } from "../themes/textStyle";

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

  const ModRef = useRef();

  // onscroll = (e) => {
  //   setScrolly(scrollY);
  // };

  // const openModal = () => {
  //     setShowModal(!showModal);
  // }

  //검색 기능
  const HeadSearch = (e) => {
    if (e.key === "Enter") {
      Searching();
    }
  };

  const Searching = () => {
    if (headInput === "") alert("검색할 단어를 입력해주세요 !");
    else history.push(`/searchresult/${headInput}`);

    setHeadInput("");
  };

  const ModalOut = () => {
    setTimeout(() => {
      setShowModal(false);
    }, 800);

    ModRef.current.style.animation = "slide-out-top 0.8s ease-in-out both";
  };

  useEffect(() => {
    dispatch(__loadMypage());
  }, []);

  return (
    <HeadWrap>
      <Head>
        <HeadInner onMouseOver={() => setShowModal(true)}>
          <div style={{ display: "flex" }}>
            <HeaderIcon
              className="jello-horizontal"
              onClick={() => history.push("/main")}
              style={{ cursor: "pointer", marginRight: "1.5rem" }}
            />

            <div style={{ display: "flex", margin: "0 0.1rem" }}>
              <HeaderMenu>
                사전장
                {showModal ? (
                  <ModalContainer
                    ref={ModRef}
                    className="slide-in-top slide-out-top"
                    onMouseLeave={ModalOut}
                  >
                    <DictMenu
                      pathname={location.pathname === "/dictionary"}
                      onClick={() => {
                        history.push("/dictionary");
                      }}
                    >
                      신조어 사전 둘러보기
                    </DictMenu>
                    <DictMenu
                      pathname={location.pathname === "/dictionary/add"}
                      onClick={() => {
                        history.push("/dictionary/add");
                      }}
                    >
                      신조어 단어 추가하기
                    </DictMenu>
                  </ModalContainer>
                ) : null}
              </HeaderMenu>
            </div>

            <div style={{ display: "flex", margin: "0 0.1rem" }}>
              <HeaderMenu>
                질문장
                {showModal ? (
                  <ModalContainer
                    ref={ModRef}
                    className="slide-in-top slide-out-top"
                    onMouseLeave={ModalOut}
                  >
                    <TroubleMenu
                      pathname={location.pathname === "/trouble"}
                      onClick={() => {
                        history.push("/trouble");
                      }}
                    >
                      고민상담 둘러보기
                    </TroubleMenu>
                    <TroubleMenu
                      pathname={location.pathname === "/trouble/add"}
                      onClick={() => {
                        history.push("/trouble/add");
                      }}
                    >
                      고민상담 추가하기
                    </TroubleMenu>
                  </ModalContainer>
                ) : null}
              </HeaderMenu>
            </div>

            <div style={{ display: "flex", margin: "0 0.1rem" }}>
              <GameMenu
                pathname={location.pathname === "/gamemain"}
                onClick={() => {
                  history.push("/gamemain");
                }}
              >
                게임장
              </GameMenu>
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
              <GoSearch
                onClick={Searching}
                style={{ margin: "0 0 0 -1.5rem", color: "#FAFAFA" }}
              />
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
          ) : null}
          
          <RightGroup>
              <WordAddBtn
                className="jello-horizontal"
                onClick={() => {}}
              >
                피드백 참여하기
              </WordAddBtn>
              
            <HeaderMenu>
            <MyInfo >
              <ProfileDiv>
            <Character char={mypageInfo.profileImages} />
            </ProfileDiv>
                <MyNickname >
                  {mypageInfo.nickname}
                  <div style={{ margin: "0.2rem 0 0 0.5rem" }}>
                    <DropdownBtn />
                  </div>
                </MyNickname>
              </MyInfo>
              {showModal ? (
                <ModalContainer
                  ref={ModRef}
                  className="slide-in-top slide-out-top"
                  onMouseLeave={ModalOut}
                >
                  <MypageMenu
                    pathname={location.pathname === "/mypage/scrap"}
                    onClick={() => history.push("/mypage/scrap")}
                  >
                    마이페이지
                  </MypageMenu>
                  <MypageMenu
                    pathname={location.pathname === "/about"}
                    onClick={() => {
                      history.push("/about");
                    }}
                  >
                    제작자 소개
                  </MypageMenu>
                </ModalContainer>
              ) : null}
            </HeaderMenu>
            </RightGroup>
        </HeadInner>
      </Head>
    </HeadWrap>
  );
};

export default Header;

const HeadWrap = styled.div`
  .slide-in-top {
    animation: slide-in-top 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
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
`;

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

const GameMenu = styled.div`
  margin-right: 1.5rem;
  ${med19}
  line-height: 1.75rem;
  display: flex;
  align-items: center;
  text-align: center;
  color: white !important;
  color: ${(props) => (props.pathname ? "var(--yellow)" : "white")};

  /* margin-right: 30px; */
  cursor: pointer;
`
const HeaderMenu = styled.div`
  margin-right: 1.5rem;
  ${med19}
  line-height: 1.75rem;
  display: flex;
  align-items: center;
  text-align: center;
  color: white !important;

  /* margin-right: 30px; */
  cursor: pointer;
`;

const ModalContainer = styled.div`
  position: fixed;
  width: 80rem;
  height: 107px;
  left: ${(props) => (props.left ? "props.left" : "200px")} !important;
  top: 72px;
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
  height: 2rem;
display: flex;
  cursor: pointer;
`;
const MyNickname = styled.div`
  ${med16}
  margin: 0 0.5rem 0 0rem;
  display: flex;
  align-items: center;
  color: #ffffff;
`;
const RightGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DictMenu = styled.div`
  ${bold16}
  margin: 0.5rem 0 0 8rem;
  text-align: left;
  color: ${(props) => (props.pathname ? "var(--yellow)" : "white")};
`;
const TroubleMenu = styled.div`
 ${bold16}
  margin: 0.5rem 0 0 12rem;
  text-align: left;
  color: ${(props) => (props.pathname ? "var(--yellow)" : "white")};
`
const MypageMenu = styled.div`
 ${bold16}
  margin: 0.5rem 2rem 0 0;
  text-align: right;
  color: ${(props) => (props.pathname ? "var(--yellow)" : "white")};

`
const ProfileDiv = styled.div`
  display: flex;
  width: 2.5rem;
  height: 2rem;
`;


