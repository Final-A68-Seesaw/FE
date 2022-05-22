import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import isLogin from "../auth/isLogin";

//redux
import { history } from "../redux/configStore";
import { __logout } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";

//element & component
import Character from "./Character";
import { bold15, bold16, med14, med19 } from "../themes/textStyle";

//style
import styled, {css} from "styled-components";
import HeaderIcon from "../asset/HeaderIcon.svg";
import { GoSearch } from "react-icons/go";
import DropdownBtn from "../asset/HeaderDropdownBtn.svg";

const Header = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.user.userinfo);
  const [scrolly, setScrolly] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [headInput, setHeadInput] = useState("");

  onscroll = (e) => {
    setScrolly(scrollY);
  };

  // const openModal = () => {
  //     setShowModal(!showModal);
  // }

  //검색 기능
  const HeadSearch = (e) => {
    if (e.key === "Enter") {
      history.push(`/searchresult/${headInput}`);
      setHeadInput("");
    }
  };

  useEffect(() => {
    dispatch(userActions.loadUser());
  }, []);

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
            style={{ cursor: "pointer", marginRight: "1.5rem"}}
          />
          {/* <div style={{ margin: '0 30px', cursor: 'pointer' }} onClick={openModal}>오잉</div> */}

            <div style={{ display: "flex", margin: "0 0.1rem" }}>
              <HeaderMenu
                className="jello-horizontal"
                pathname = {location.pathname === "/dictionary"}
                onClick={() => {history.replace("/dictionary");}}
              >
                사전장
              </HeaderMenu>
            </div>
            <div style={{ display: "flex", margin: "0 0.1rem" }}>
            <HeaderMenu
                className="jello-horizontal"
                pathname = {location.pathname === "/trouble"}
                onClick={() => {history.replace("/trouble");}}
              >
                질문장
              </HeaderMenu>
            </div>
            <div style={{ display: "flex", margin: "0 0.1rem" }}>
              <HeaderMenu
                className="jello-horizontal"
                pathname = {location.pathname === "/gamemain"}
                onClick={() => {history.replace("/gamemain");}}
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
            <GoSearch style={{ margin: "0 0 0 -1.5rem", color: "#FAFAFA" }} />
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
            <MyInfo className="jello-horizontal">
              <Character char={userinfo.profileImages} />
              <MyNickname onClick={() => history.push("/mypage/scrap")}>
                {userinfo.nickname}
                <div style={{ margin: "0.2rem 0 0 0.5rem" }}>
                  <DropdownBtn />
                </div>
              </MyNickname>
            </MyInfo>
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
 color: ${(props)=>(props.pathname ? "var(--yellow)" : "white")} !important;
  cursor: pointer;
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
