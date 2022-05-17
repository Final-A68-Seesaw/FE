import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

//redux
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import { __loadMypage } from "../redux/modules/mypage";

//component & element
import Header from "../components/Header";
import Character from "../components/Character";
import Footer from "../components/Footer";
import Button from "../elements/Button";

//style
import styled from "styled-components";
import { bold22, bold15 } from "../themes/textStyle";

const Mypage = () => {
  const {
    reset,
    register,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.mypage.list);
  console.log(dataList && dataList);

  const onSubmit = (data) => {
    dispatch(__login(data));
  };

  //마이페이지 데이터 로드
  useEffect(() => {
    dispatch(__loadMypage());
  }, []);
  return (
    <>
      <Header />
      <Container>
        <UserInfos>
          <Character char={dataList && dataList.profileImages} size="8.5rem" />
          <UserInfo>
            <UserNick>{dataList && dataList.nickname}</UserNick>
            <UserEmail>{dataList && dataList.username}</UserEmail>
          </UserInfo>
        </UserInfos>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ButtonsBox>
            <div>
              <Button shape="mypage-Black-B">프로필 수정</Button>
              {/* onClick = {history.push("/")} */}
            </div>
            <div>
              <Button
                shape="mypage-White-B"
                onClick={() => dispatch(__logout())}
              >
                로그아웃
              </Button>
            </div>
          </ButtonsBox>
        </form>
        <MyMenu>
          <MyScrap>스크랩</MyScrap>
          <MyWord>내 등재 단어</MyWord>
          <MyWriteList>내 작성 글</MyWriteList>
        </MyMenu>
        <HrLine />
      </Container>
      <Footer />
    </>
  );
};

export default Mypage;

const Container = styled.div`
  margin: auto;
  max-width: 60rem;
  padding-top: 9rem;
`;
const UserInfos = styled.div`
  justify-content: center;
  display: flex;
`;
const UserInfo = styled.div`
  margin-left: 0.3rem;
  text-align: center;
`;
const UserNick = styled.div`
  ${bold22}
  margin-top: 10rem;
`;
const UserEmail = styled.div`
  ${bold15}
`;
const ButtonsBox = styled.div`
  margin: auto;
`;
const MyMenu = styled.div``;
const MyScrap = styled.div``;
const MyWord = styled.div``;
const MyWriteList = styled.div``;
const HrLine = styled.hr`
  margin-top: 1rem;
  margin-bottom: 4rem;
`;
