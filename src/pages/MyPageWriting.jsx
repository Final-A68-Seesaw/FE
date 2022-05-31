import React, { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { __loadMypageWriting } from "../redux/modules/mypage";

//component & element
import Header from "../components/Header";
import MyPageTop from "../components/MyPageTop";
import Footer from "../components/Footer";
import TroubleCard from "../components/TroubleCard";
import { med19 } from "../themes/textStyle";

//style
import styled from "styled-components";
import Result0 from "../asset/Result0.svg";

const MyPageWriting = () => {
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.mypage.writing);

  //마이페이지 scrap 데이터 로드
  useEffect(() => {
    dispatch(__loadMypageWriting());
  }, []);

  return (
    <>
      <Header />
      <Container>
        <MyPageTop />

        {dataList.length === 0 ? (
          <NoResultBox>
            <Result0 style={{ width: "15%", height: "15%" }} />

            <NoResultMsg>
              아직 작성한 고민이 없습니다. 고민을 나눠보세요!
            </NoResultMsg>
          </NoResultBox>
        ) : (
          <CardWholeBox>
            {dataList &&
              dataList.map((v, i) => {
                return <TroubleCard key={i} data={v} />;
              })}
          </CardWholeBox>
        )}
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
`;
const NoResultMsg = styled.p`
  width: 15rem;
  margin-top: 2rem;

  ${med19}
  display: flex;
  align-items: center;
  text-align: center;

  color: #222222;
`;
const NoResultBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 7rem auto 0 auto;
`;
