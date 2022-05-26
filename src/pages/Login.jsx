import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { __login } from "../redux/modules/user";
import { history } from "../redux/configStore";

//ele
import Button from "../elements/Button";
import { ErrorXInput } from "../elements/Input";

//style
import styled from "styled-components";
import KakaoBtn from "../components/KakaoBtn";
import { med14, bold30 } from "../themes/textStyle";
import Logo from "../asset/Seeso_logo.svg";
import Img from "../asset/LoginIMG.svg";

import { KAKAO_AUTH_URL } from "../auth/kakao_AUTH_URL";

const Login = () => {
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(__login(data));
  };

  console.log(process.env.SERVER_URL);

  return (
    <>
      <Container>
        <div style={{ Width: "200px", minHeight: "100vh" }}>
          <Img style={{ minWidth: "100%", height: "99.9vh" }} />
        </div>
        <RightContainer>
          <LogoBox>
            <Logo />
          </LogoBox>

          <TextBox>로그인</TextBox>

          <form onSubmit={handleSubmit(onSubmit)}>
            <LoginContainer>
              <div>
                <LabelBox>이메일</LabelBox>

                <ErrorXInput
                  type="email"
                  name="username"
                  register={register({
                    required: {
                      value: true,
                      message: "⚠ 이메일을 입력해주세요.",
                    },
                    pattern: {
                      value:
                        /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                      message: "⚠ 이메일 형식에 맞게 입력해주세요..",
                    },
                  })}
                  placeholder="example@email.com"
                  error={errors?.username?.message}
                  width="24rem"
                />
                {/* <Button
                  shape="inputReset"
                  type="button"
                  onClick={() => reset({ ...getValues(), username: "" })}
                /> */}
              </div>
              <div>
                <LabelBox>비밀번호</LabelBox>
                <ErrorXInput
                  type="password"
                  name="pwd"
                  register={register({
                    required: {
                      value: true,
                      message: "⚠ 패스워드를 입력해주세요.",
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,20}$/,
                      message:
                        "⚠ 비밀번호는 숫자, 영문 조합으로 6자리 이상 20자리 이하입니다!",
                    },
                  })}
                  placeholder="********"
                  error={errors?.pwd?.message}
                  width="24rem"
                />
                {/* <Button
                  shape="inputReset"
                  type="button"
                  onClick={() => reset({ ...getValues(), pwd: "" })}
                /> */}
              </div>
            </LoginContainer>
            <ButtonBox>
              <Button shape="login-B" type="submit" width="24rem" margin="auto">
                로그인하기
              </Button>
            </ButtonBox>
            <ButtonBox>
              <Button
                shape="login-B"
                onClick={() => {
                  history.push("/signup");
                }}
                width="24rem"
                margin="auto"
              >
                회원가입하기
              </Button>
            </ButtonBox>
          </form>
          <hr />
          <KakaoBox>
            <KakaoBtn style={{ marginTop: "3rem" }} href={KAKAO_AUTH_URL} />
          </KakaoBox>
        </RightContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  /* margin: auto; */
  display: flex;
  justify-content: space-between;
  /* max-width: 1440px; */
`;

const RightContainer = styled.div`
  margin: auto;
  max-width: 26rem;
`;
const LogoBox = styled.div`
  text-align: left;
  align-items: left;
  margin-bottom: 1rem;
`;
const ButtonBox = styled.div`
  width: 26rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 1.5rem 0;
`;
const KakaoBox = styled.div`
  width: 26rem;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;
const LoginContainer = styled.div`
  padding: 0.5rem 0 1rem 0;
`;
const TextBox = styled.div`
  ${bold30}
  padding: 0 0 1rem 0;
  text-align: left;
`;
const LabelBox = styled.div`
  ${med14}
  text-align: left;
`;

export default Login;
