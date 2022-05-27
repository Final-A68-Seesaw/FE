import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

import Starting from "../asset/Starting.svg";
import { history } from "../redux/configStore";

const StartPage = () => {
  return (
    <>
     <Helmet>
       <title>SEESO</title>
      <meta name="description" content="신조어도 배우고, 고민의 해결책을 세대별로 얻어보세요!"  data-react-helmet="true"/>
      <meta property="og:image" content="../asset/SEOLogo.png"/>
      <meta property="og:url" content="https://play-seeso.com/"/>
     </Helmet>
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
