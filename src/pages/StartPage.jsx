import React from "react";
import styled from "styled-components";

import Starting from "../asset/Starting.svg";
import { history } from "../redux/configStore";
import MetaTag from "./MetaTag";

const StartPage = () => {
  return (
    <>
      <MetaTag
        imgsrc={
          "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FVXUEC%2FbtrDi354mZE%2FLwRhmHgrWnhU4xkfGM1ir0%2Fimg.png"
        }
        url={"https://play-seeso.com/"}
        title={"SEESO"}
        description={"신조어도 배우고, 고민 해결책을 세대별로 얻어보세요!"}
      />
      <div style={{ background: "#8E41FF", width: "100vw", height: "100vh" }}>
        <TitleText>우리들의 플레이그라운드</TitleText>
        <SubTitle>
          세대별 신조어도 배우고 내 고민 해결책을 세대별로 얻어보세요!
        </SubTitle>
        <StartBtn onClick={() => history.push("/login")}>놀러 가기</StartBtn>
        <Starting style={{ minWidth: "100vw", maxHeight: "99vh" }} />
      </div>
    </>
  );
};

export default StartPage;

const TitleText = styled.p`
  position: absolute;
  width: 380px;
  height: 142px;
  left: 106px;
  top: 247px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 56.1022px;
  line-height: 71px;
  /* or 126% */

  display: flex;
  align-items: center;

  color: #ffffff;
`;

const SubTitle = styled.p`
  position: absolute;
  width: 439px;
  height: 20px;
  left: 106px;
  top: 412.11px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  /* identical to box height, or 118% */

  display: flex;
  align-items: center;

  color: #ffffff;
`;

const StartBtn = styled.div`
  position: absolute;
  width: 180px;
  height: 52px;
  left: 106px;
  top: 496.72px;

  border-radius: 200px;

  background: rgba(255, 255, 255, 0.2);
  border: 1px solid #ffffff;
  border-radius: 200px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 16.5px;
  line-height: 24px;
  /* identical to box height */

  display: flex;
  align-items: center;
  justify-content: center;

  /* White_#ffffff */

  color: #ffffff;

  cursor: pointer;
`;
