import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { userApi } from "../api/userApi";
import { history } from "../redux/configStore";
import { userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";


//ele
import Button from "../elements/Button";
import { ErrorXInput } from "../elements/Input";
import { Select } from "../elements/Select";

//style
import styled from "styled-components";
import { StepBar } from "../components/StepBar";
import Logo  from '../asset/Seeso_logo.svg'

const Signup = () => {

  const dispatch = useDispatch()
  
  const {
    reset,
    register,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  
//비밀번호 확인
  const pwd = useRef();
  pwd.current = watch("pwd");

//select option
const GenerationOptions = [
  {value: "none", label: "선택하세요"},
  {value: "x세대", label: "X세대(1965년생~1979년생)"},
  {value: "y세대", label: "Y세대(1980년생~1994년생)"},
  {value: "z세대", label: "Z세대(1995년생~2005년생)"},
  {value: "알파세대", label: "알파세대(2006년생~)"}
]

  //데이터 전송
  const onSubmit = async (data) => {
    try {
      const user = await userApi.signup({
        username: data.username,
        pwd: data.pwd,
        pwdCheck: data.pwdCheck,
      });

      dispatch(userActions.userSave({
        username: data.username,
        pwd: data.pwd,
        generation: data.generation,
      }))


      history.push("/signup/making");
    } catch (e) {
      if (e.message === "Request failed with status code 400") {
        alert("중복된 아이디입니다");
        return;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
       <Logo style = {{margin : "2rem 0 0 2rem"}}/>
      <Container>
      <StepBar shape="step1" />

      <div >
        <ErrorXInput
          type="email"
          name="username"
          label="이메일"
          register={register({
            required: {
              value: true,
              message: "⚠ 이메일을 입력해주세요",
            },
            pattern: {
              value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
              message: "⚠ 이메일 형식에 맞게 입력해주세요",
            },
          })}
          placeholder="example@email.com"
          error={errors?.username?.message}
        />
        {/* <Button
          shape="inputReset"
          type="button"
          onClick={() => reset({ ...getValues(), username: "" })}
        /> */}
      </div>

          <Select
          name="generation"
          register={register({
            required: true,
            validate: (value) => value !== "none",
          })}
          label = "나의 세대는?"
          error={errors?.generation?.type}
          >
            {GenerationOptions.map((item, index)=> (
              <option key = {index} value = {item.value}>{item.label}</option>
            ))}
          </Select>
      <div>
        <ErrorXInput
          type="password"
          name="pwd"
          label="비밀번호"
          register={register({
            required: {
              value: true,
              message: "⚠ 패스워드를 입력해주세요",
            },
            minLength: {
              value: 8,
              message: "⚠ 패스워드를 정확하게 입력해주세요",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
              message:
                "⚠ 하나 이상의 숫자, 영어 대문자, 소문자, 특수문자 조합으로 8자리 이상 20자리 이하로 입력해주세요!",
            },
          })}
          placeholder="********"
          maxLength={"20"}
          error={errors?.pwd?.message}
        />
        {/* <Button
          shape="inputReset"
          type="button"
          onClick={() => reset({ ...getValues(), pwd: "" })}
        /> */}
      </div>

      <div>
        <ErrorXInput
          type="password"
          name="pwdCheck"
          label="비밀번호 확인"
          register={register({
            required: {
              value: true,
              message: "⚠ 패스워드를 다시 한번 입력해주세요.",
            },
            validate: (value) =>
              value === pwd.current || "⚠ 패스워드가 일치하지 않습니다.",
          })}
          placeholder="********"
          maxLength={"20"}
          error={errors?.pwdCheck?.message}
        />
        {/* <Button
          shape="inputReset"
          type="button"
          onClick={() => reset({ ...getValues(), pwdCheck: "" })}
        /> */}
      </div>
      <FirstSignupBtn shpae="confirmRed-B" type="submit">
        다음 단계
      </FirstSignupBtn>
      </Container>
    </form>
  );
};

const Container = styled.div`
width:24rem;
margin: auto;
`

const FirstSignupBtn = styled(Button)`
  margin: 1rem;
  width: 24rem;
`;

export default Signup;
