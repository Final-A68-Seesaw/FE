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
              <div>
              <ErrorXInput
              type = "email"
              name = "username"
              label = "이메일"
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
              error = {errors?.username?.message}
              />
                <Button
                  shape="inputReset"
                  type="button"
                  onClick={() => reset({ ...getValues(), username: "" })}
                />

              </div>
              <div>
                <ErrorXInput
                  type="password"
                  name="pwd"
                  label="비밀번호"
                  register={register({
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
                  placeholder="********"
                  error={errors?.pwd?.message}
                />
                <Button
                  shape="inputReset"
                  type="button"
                  onClick={() => reset({ ...getValues(), pwd: "" })}
                />
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
