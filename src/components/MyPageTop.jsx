import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

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
      <Container>
        <UserInfos>
          <Character char={dataList && dataList.profileImages} size="9rem" />
          <UserInfo>
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
            onClick={() => {
              history.replace("/mypage/scrap");
            }}
          >
            스크랩
          </MyScrap>
          <MyWord
            onClick={() => {
              history.replace("/mypage/myword");
            }}
          >
            내 등재 단어
          </MyWord>
          <MyWriting
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
  margin-left: 0.5rem;
`;

const UserInfo = styled.div`
  text-align: center;
`;
const UserNick = styled.div`
  ${bold22}
  margin-top: 10rem;
  margin-bottom: 0.5rem;
`;
const UserEmail = styled.div`
  ${bold15}
  margin-bottom: 1rem;
`;
const ButtonsBox = styled.div`
  margin: auto;
  width: 13rem;
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
  margin-bottom: 1rem;
  text-align: center;
  border-bottom-width: 3px;
  cursor: pointer;
`;
const MyWord = styled.div`
  width: 9rem;
  margin-bottom: 1rem;
  text-align: center;
  cursor: pointer;
`;
const MyWriting = styled.div`
  width: 9rem;
  margin-bottom: 1rem;
  text-align: center;
  cursor: pointer;
`;
const HrLine = styled.hr`
  margin-bottom: 2rem;
  margin-top: 0;
`;
