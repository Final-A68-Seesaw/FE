import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { userApi } from "../api/userApi";
import { history } from "../redux/configStore";

import { setStorage } from "../shared/cookie";

//ele
import Button from "../elements/Button";
import { ErrorXInput, SFormError } from "../elements/Input";

//style
import styled from "styled-components";
import { StepBar } from "../components/StepBar";
import { SelectText } from "../elements/Select";

const Signup = () => {
  const {
    reset,
    register,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const pwd = useRef();
  pwd.current = watch("pwd");

  //데이터 전송
  const onSubmit = async (data) => {
    try {
      const user = await userApi.signup({
        username: data.username,
        pwd: data.pwd,
        pwdCheck: data.pwdCheck,
      });

      setStorage("username", data.username);
      setStorage("generation", data.generation);
      setStorage("pwd", data.pwd);

      history.push("/signup/making");
    } catch (e) {
      if (e.message === "Request failed with status code 400") {
        alert("중복된 아이디입니다.");
        return;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepBar shape="step1" />

      <div>
        <ErrorXInput
          type="email"
          name="username"
          label="이메일"
          register={register({
            required: {
              value: true,
              message: "⚠ 이메일을 입력해주세요.",
            },
            pattern: {
              value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
              message: "⚠ 이메일 형식에 맞게 입력해주세요..",
            },
          })}
          placeholder="example@email.com"
          error={errors?.username?.message}
        />
        <Button
          shape="inputReset"
          type="button"
          onClick={() => reset({ ...getValues(), username: "" })}
        />
      </div>

      <label>나의 세대는?</label>
      <div>
        <SelectText
          name="generation"
          ref={register({
            required: true,
            validate: (value) => value !== "none",
          })}
          hasError={Boolean(errors?.generation)}
        >
          <option value="none">선택하세요</option>
          <option value="x세대">X세대(1965년생~1979년생)</option>
          <option value="y세대">Y세대(1980년생~1994년생)</option>
          <option value="z세대">Z세대(1995년생~2005년생)</option>
          <option value="알파세대">알파세대(2006년생~)</option>
        </SelectText>
        <SFormError>
          {errors.generation && errors.generation.type === "validate" && (
            <p>⚠ 세대를 선택해주세요.</p>
          )}
        </SFormError>
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
          maxLength={"20"}
          error={errors?.pwd?.message}
        />
        <Button
          shape="inputReset"
          type="button"
          onClick={() => reset({ ...getValues(), pwd: "" })}
        />
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
        <Button
          shape="inputReset"
          type="button"
          onClick={() => reset({ ...getValues(), pwdCheck: "" })}
        />
      </div>
      <FirstSignupBtn shpae="confirmRed-B" type="submit">
        다음 단계
      </FirstSignupBtn>
    </form>
  );
};

const FirstSignupBtn = styled(Button)`
  margin: 1rem;
  width: 50%;
`;

export default Signup;
