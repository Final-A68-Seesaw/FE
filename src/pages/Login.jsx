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

  return (
    <>
      <Container>
        <div style={{ Width:'200px', minHeight: '100vh' }}>
          <Img style={{minWidth:'100%', height:'99.9vh'}}/>
        </div>
        <RightContainer>
          <Logo style={{ display: "right" }} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <LoginContainer>
              <TextBox>로그인</TextBox>
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

            <LoginBtn
              shape="confirmRed-B"
              type="submit"
              margin="0"
              width="24rem"
            >
              로그인하기
            </LoginBtn>

            <LoginBtn
              shape="confirmRed-B"
              onClick={() => {
                history.push("/signup");
              }}
              margin="0"
              width="24rem"
            >
              회원가입하기
            </LoginBtn>
          </form>

          {/* <KakaoBtn />/ */}
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
  text-align: left;
  align-items: left;
`;

const LoginBtn = styled(Button)`
  margin: 1rem;
`;

const LoginContainer = styled.div`
  padding: 1rem 0 2rem 0;
`;
const TextBox = styled.div`
  ${bold30}
  margin: 0 0 2rem 0;
  text-align: left;
`;
const LabelBox = styled.div`
  ${med14}
  text-align: left;
`;

export default Login;
