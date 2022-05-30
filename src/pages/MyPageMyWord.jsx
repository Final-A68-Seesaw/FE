import React, { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { __loadMypageMyWord } from "../redux/modules/mypage";

//component & element
import Header from "../components/Header";
import MyPageTop from "../components/MyPageTop";
import Footer from "../components/Footer";
import DictionaryCard from "../components/DictionaryCard";
import { med19 } from "../themes/textStyle"

//style
import styled from "styled-components";
import Result0 from "../asset/Result0.svg";

const MyPageMyWord = () => {
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.mypage.scrap);

  //마이페이지 scrap 데이터 로드
  useEffect(() => {
    dispatch(__loadMypageMyWord());
  }, []);

  return (
    <>
      <Header />
      <Container>
        <MyPageTop />

        {dataList.length === 0 ? (
          <NoResultBox>
            <Result0 />
            <NoResultMsg>
              아직 등재한 단어가 없습니다. <br/>
              자주 사용하는 신조어를 등재해주세요!
            </NoResultMsg>
          </NoResultBox>
        ): (
          <CardWholeBox>
            {dataList &&
              dataList.map((v, i) => { 
                return <DictionaryCard key={i} data={v} />;
              })}
          </CardWholeBox>
        ) }
      </Container>
      <Footer />
    </>
  );
};

export default MyPageMyWord;

const Container = styled.div`
  margin: auto;
  max-width: 60rem;
`;
const CardWholeBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 60rem;
`;
const NoResultMsg = styled.p`
    width: 19rem;
    margin-top: 2rem;

    ${med19}
    display: flex;
    align-items: center;
    text-align: center;

    color: #222222;
`
const NoResultBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 7rem auto 0 auto;
`