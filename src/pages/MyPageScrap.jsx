import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import { __loadMypageScrap } from "../redux/modules/mypage";

//component & element
import Header from "../components/Header";
import MyPageTop from "../components/MyPageTop";
import Footer from "../components/Footer";

//style
import styled from "styled-components";
import { bold15 } from "../themes/textStyle";

const MyPageScrap = () => {

  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.mypage.scrap);
  console.log(dataList && dataList);

  //마이페이지 scrap 데이터 로드
  useEffect(() => {
    dispatch(__loadMypageScrap());
  }, []);

  return (
    <>
      <Header />
      <Container>
       <MyPageTop/>
      
      </Container>
      <Footer />
    </>
  );
};

export default MyPageScrap;

const Container = styled.div`
  margin: auto;
  max-width: 60rem;
`;


