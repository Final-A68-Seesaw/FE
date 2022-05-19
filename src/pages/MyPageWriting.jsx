import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import { __loadMypageWriting } from "../redux/modules/mypage";

//component & element
import Header from "../components/Header";
import MyPageTop from "../components/MyPageTop";
import Footer from "../components/Footer";
import TroubleCard from "../components/TroubleCard";

//style
import styled from "styled-components";

const MyPageWriting = () => {

  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.mypage.writing);
  console.log(dataList && dataList);

  //마이페이지 scrap 데이터 로드
  useEffect(() => {
    dispatch(__loadMypageWriting());
  }, []);

  return (
    <>
      <Header />
      <Container>
       <MyPageTop/>
       <CardWholeBox>
          {dataList && dataList.map((v, i) => {
            return (
              <TroubleCard key={i} data={v} />
            )
          })}
        </CardWholeBox>
      </Container>
      <Footer />
    </>
  );
};

export default MyPageWriting;

const Container = styled.div`
  margin: auto;
  max-width: 60rem;
`;
const CardWholeBox = styled.div`
display: flex;
flex-wrap: wrap;
max-width: 60rem;
margin-top: 2rem;
`

