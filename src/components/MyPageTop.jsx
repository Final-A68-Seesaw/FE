import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import { __loadMypage } from "../redux/modules/mypage";
import { __logout } from "../redux/modules/user";

//component & element
import Character from "../components/Character";
import Button from "../elements/Button";

//style
import styled from "styled-components";
import { bold18, bold22, bold15 } from "../themes/textStyle";

const MyPageTop = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const location = useLocation();
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.mypage.list);

  const onSubmit = (data) => {
    dispatch(__login(data));
  };

  //마이페이지 데이터 로드
  useEffect(() => {
    dispatch(__loadMypage());
  }, []);

  return (
    <>
      <Container>
        <UserInfos>
        <UserInfo>
          <BigCharBox>
            <Character char={dataList && dataList.profileImages} size="9rem" />
            </BigCharBox>
         
            <UserNick>{dataList && dataList.nickname}</UserNick>
            <UserEmail>{dataList && dataList.username}</UserEmail>
          </UserInfo>
          </UserInfos>


        <form onSubmit={handleSubmit(onSubmit)}>
          <ButtonsBox>
            <div>
              <Button
                shape="mypage-Black-B"
                onClick={() => {
                  history.push("/mypage/edit");
                }}
              >
                프로필 수정
              </Button>
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
          <MyScrap
            pathname={location.pathname === "/mypage/scrap"}
            onClick={() => {
              history.replace("/mypage/scrap");
            }}
          >
            스크랩
          </MyScrap>
          <MyWord
            pathname={location.pathname === "/mypage/myword"}
            onClick={() => {
              history.replace("/mypage/myword");
            }}
          >
            내 등재 단어
          </MyWord>
          <MyWriting
            pathname={location.pathname === "/mypage/writing"}
            onClick={() => {
              history.replace("/mypage/writing");
            }}
          >
            내 작성 글
          </MyWriting>
        </MyMenu>
        <HrLine />
      </Container>
    </>
  );
};

export default MyPageTop;

const Container = styled.div`
  margin: auto;
  max-width: 60rem;
  padding-top: 9rem;
`;
const UserInfos = styled.div`
  justify-content: center;
  display: flex;
  margin: auto;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const UserNick = styled.div`
  ${bold22}
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
const UserEmail = styled.div`
  ${bold15}
  margin-bottom: 1rem;
`;
const ButtonsBox = styled.div`
  margin: auto;
  width: 13.5rem;
`;
const MyMenu = styled.div`
  ${bold18}
  width: 27rem;
  padding-top: 3rem;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;
const MyScrap = styled.div`
  width: 9rem;
  padding-bottom: 1rem;
  text-align: center;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.pathname ? "3px solid black" : ""} !important;
`;
const MyWord = styled.div`
  width: 9rem;
  padding-bottom: 1rem;
  text-align: center;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.pathname ? "3px solid black" : ""} !important;
`;
const MyWriting = styled.div`
  width: 9rem;
  padding-bottom: 1rem;
  text-align: center;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.pathname ? "3px solid black" : ""} !important;
`;
const HrLine = styled.hr`
  margin-bottom: 2rem;
  margin-top: 0;
`;
const BigCharBox = styled.div`
  display: flex;
  width: 9rem;
  height: 9rem;
`;
