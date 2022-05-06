import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { __login } from "../redux/modules/user";
import { history } from "../redux/configStore";

//ele
import Button from "../elements/Button";
import { InputText, SFormError } from "../elements/Input";

//style
import styled from "styled-components";
import KakaoBtn from "../components/KakaoBtn";
import { FaTimesCircle } from "react-icons/Fa";

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
        <RightContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <LoginContainer>
              <label>이메일</label>
              <div>
                <InputText
                  ref={register({
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
                  name="username"
                  type="text"
                  placeholder="example@email.com"
                  hasError={Boolean(errors?.username?.message)}
                />
                <button
                  type="button"
                  onClick={() => {
                    reset({
                      ...getValues(),
                      username: "",
                    });
                  }}
                  style={{ backgroundColor: "transparent", border: "0px" }}
                >
                  {/* marginTop: '1rem', marginLeft: '-2.5rem' */}
                  <FaTimesCircle
                    style={{
                      width: "1rem",
                      height: "1rem",
                      color: "var(--graydf)",
                    }}
                  />
                </button>
                <SFormError>{errors?.username?.message}</SFormError>
              </div>

              <label>비밀번호</label>
              <div>
                <InputText
                  ref={register({
                    required: {
                      value: true,
                      message: "⚠ 패스워드를 입력해주세요.",
                    },
                    minLength: {
                      value: 8,
                      message: "⚠ 패스워드를 정확하게 입력해주세요.",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                      message:
                        "⚠ 하나 이상의 숫자, 영어 대문자, 소문자, 특수문자 조합으로 8자리 이상 20자리 이하로 입력해주세요!",
                    },
                  })}
                  name="pwd"
                  type="password"
                  placeholder="********"
                  maxLength={"20"}
                  hasError={Boolean(errors?.pwd?.message)}
                />
                <button
                  type="button"
                  onClick={() => {
                    reset({
                      ...getValues(),
                      pwd: "",
                    });
                  }}
                  style={{ backgroundColor: "transparent", border: "0px" }}
                >
                  {/* marginTop: '1rem', marginLeft: '-2.5rem' */}
                  <FaTimesCircle
                    style={{
                      width: "1rem",
                      height: "1rem",
                      color: "var(--graydf)",
                    }}
                  />
                </button>
                <SFormError>{errors?.pwd?.message}</SFormError>
              </div>
            </LoginContainer>

            <LoginBtn shape="confirmRed-B" type="submit">
              로그인하기
            </LoginBtn>

            <LoginBtn
              shape="confirmRed-B"
              onClick={() => {
                history.push("/signup");
              }}
            >
              회원가입하기
            </LoginBtn>
          </form>

          <KakaoBtn />
        </RightContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 1920px;
  width: 100%;
`;

const RightContainer = styled.div`
  margin: auto;
  max-width: 40%;
  text-align: center;
`;

const LoginBtn = styled(Button)`
  margin: 1rem;
  width: 50%;
`;

const LoginContainer = styled.div`
  padding: 3rem;
`;

export default Login;
