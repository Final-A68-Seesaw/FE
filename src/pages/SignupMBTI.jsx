import React, { useState } from "react";
import { userApi } from "../api/userApi";
import { history } from "../redux/configStore";
import { useForm } from "react-hook-form";
import user, { userActions } from "../redux/modules/user";

//element
import Button from "../elements/Button";
import { med14, med18 } from "../themes/textStyle";

//style
import styled from "styled-components";
import { StepBar } from "../components/StepBar";
import Hi from "../asset/Signup_Mbti_imo.svg";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../asset/Seeso_logo.svg";
import { enableES5 } from "immer";

const SignupMBTI = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.usersign);
  console.log(userData)
  const [Mbti, setMbti] = useState({
    energy: null,
    insight: null,
    judgement: null,
    lifePattern: null,
    id: userData.id,
  });

  const { register, handleSubmit, 
    formState: { errors },
   } = useForm();


  //라디오버튼

  const EandIoption = [
    { value: "E", label: "밖에 무조건 나간다" },
    { value: "I", label: "그냥 집에 있는다" },
  ];
  const SandNoption = [
    { value: "S", label: "요리 할 때 정량계측한다" },
    { value: "N", label: "요리는 감으로 해야 제맛이다" },
  ];
  const FandToption = [
    { value: "F", label: "슬픔은 나누면 반이된다" },
    { value: "T", label: "슬픔은 나누면 슬픈 사람이 둘이된다" },
  ];
  const JandPoption = [
    { value: "J", label: "항상 방을 깨끗이 유지한다" },
    { value: "P", label: "몰아서 한꺼번에 한다" },
  ];

  const changeRadio = (e) => {
    if(userData.code)
    setMbti({ ...Mbti, [e.target.name]: e.target.value, id: userData.id });
   else
    setMbti({ ...Mbti, [e.target.name]: e.target.value })
  };
//데이터전송
const onSubmit = async () => {
  try {
    const user = await userApi.mbti(Mbti);
    dispatch(
      userActions.userSave({ ...userData, ...Mbti, kakaoId: userData.id, mbtiRes: user.data})
    );
    history.push("/signup/making/character");
  } catch (e) {
    console.log(e);
    if (e.message === "Request failed with status code 400") {
      alert("잘못된 접근입니다. 회원가입을 처음부터 다시 시도해주세요.");
      history.push("/login")
      return;
    }
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Logo style={{ margin: "2rem 0 0 2rem" }} />
      <Container>
        <StepBar shape="step2" />

        <Hi />

        <TextContainer>
          <b>씨소 플레이그라운드</b>에 처음 오신 회원님을 환영합니다!
        </TextContainer>

        <OutlineContaierBar>
          나만의 캐릭터 생성을 위한 간단한 몇가지 질문에 답해주세요.
        </OutlineContaierBar>

        <OutlineContainer>
          <QuestionText>
            <QuestionLabel />
            <QuestionNum>Q1</QuestionNum>
            주말이 왔어요, 심심한 당신은 어떤 선택을 하나요?
          </QuestionText>
          <div>
            {EandIoption.map((a, i) => {
              return (
                <label key={i}>
                  <FormCheckLeft
                    {...register("energy")}
                    ref = {register({
                      required:{value: true, message:"⚠ 선택해주세요!"}
                    })}
                    type="radio"
                    name="energy"
                    onChange={changeRadio}
                    value={[a.value]}
                  />
                  <FormCheckText>{a.label}</FormCheckText>
                </label>
              );
            })}
          </div>
          <SFormError>{errors?.energy?.message}</SFormError>
          <Line />

          <QuestionText>
            <QuestionLabel />
            <QuestionNum>Q2</QuestionNum>
            오늘 저녁식사를 대접해야하네요! 당신의 요리 방식은?
          </QuestionText>

          <div>
            {SandNoption.map((a, i) => {
              return (
                <label key={i}>
                  <FormCheckLeft
                    {...register("insight")}
                    ref = {register({
                      required:{value: true, message:"⚠ 선택해주세요!"}
                    })}
                    type="radio"
                    name="insight"
                    onChange={changeRadio}
                    value={[a.value]}
                  />
                  <FormCheckText>{a.label}</FormCheckText>
                </label>
              );
            })}
          </div>
          <SFormError>{errors?.insight?.message}</SFormError>

          <Line />

          <QuestionText>
            <QuestionLabel />
            <QuestionNum>Q3</QuestionNum>
            당신은 안좋은 일이 생긴다면 슬픔을 지인들과 나누나요?
          </QuestionText>
          <div>
            {FandToption.map((a, i) => {
              return (
                <label key={i}>
                  <FormCheckLeft
                    {...register("judgement")}
                    ref = {register({
                      required:{value: true, message:"⚠ 선택해주세요!"}
                    })}
                    type="radio"
                    name="judgement"
                    onChange={changeRadio}
                    value={[a.value]}
                  />
                  <FormCheckText>{a.label}</FormCheckText>
                </label>
              );
            })}
          </div>
          <SFormError>{errors?.judgement?.message}</SFormError>
          <Line />

          <QuestionText>
            <QuestionLabel />
            <QuestionNum>Q4</QuestionNum>
            너무 바쁜 당신, 방의 정리정돈 상태는 어떤가요?
          </QuestionText>
          <div>
            {JandPoption.map((a, i) => {
              return (
                <label key={i}>
                  <FormCheckLeft
                    {...register("lifePattern")}
                    ref = {register({
                      required:{value: true, message:"⚠ 선택해주세요!"}
                    })}
                    type="radio"
                    name="lifePattern"
                    onChange={changeRadio}
                    value={[a.value]}
                  />
                  <FormCheckText>{a.label}</FormCheckText>
                </label>
              );
            })}
          </div>
          <SFormError>{errors?.lifePattern?.message}</SFormError>
        </OutlineContainer>
        <MbtiConfirm width="24rem" type="submit">
          다음 단계
        </MbtiConfirm>
      </Container>
    </form>
  );
};

const Container = styled.div`
  text-align: center;
  max-width: 100%;
`;

const TextContainer = styled.div`
  text-align: center;
  margin: 0.1rem;
  margin-bottom: 3rem;
  ${med18}
  color:var(--black24);
`;

const OutlineContaierBar = styled.section`
  text-align: center;
  line-height: 4rem;
  margin: auto;
  width: 41rem;
  height: 4rem;
  color: var(--white);
  font-weight: bold;
  background: var(--black24);
  box-shadow: 0px 4px 8px -4px rgba(22, 34, 51, 0.08),
    0px 16px 24px rgba(22, 34, 51, 0.08);
  border-radius: 28px 28px 0px 0px;
`;

const OutlineContainer = styled.div`
  margin: auto;
  width: 41rem;
  height: 57%;
  padding-bottom: 0.5rem;
  background: var(--white);
  box-shadow: 0px 4px 8px -4px rgba(22, 34, 51, 0.08),
    0px 16px 24px rgba(22, 34, 51, 0.08);
  border-radius: 0px 0px 28px 28px;
`;

const QuestionText = styled.div`
  position: relative;

  display: flex;
  color: var(--gray99);
  font-weight: 500;
  margin: 2rem 5rem 0 5rem;
`;

const FormCheckText = styled.span`
  margin: 0.8rem 0.3rem 0.5rem 0.3rem;
  width: 40%;
  height: 4rem;
  line-height: 4rem;
  background-color: var(--grayed);
  border: 3px solid transparent;
  border-radius: 0.75rem;
  justify-content: center;
  display: inline-block;
  align-items: center;
  cursor: pointer;
  color: var(--gray99);
  font-weight: 500;
`;

const FormCheckLeft = styled.input`
  &:checked {
    display: inline-block;
    background: none;
    padding: 0px 10px;
    text-align: center;
    height: 33px;
    line-height: 33px;
    font-weight: 500;
    display: none;
    border: 3px solid transparent;
  }
  &:checked + ${FormCheckText} {
    background: var(--white);
    color: var(--black24);
    font-weight: bolder;
    border: 3px solid var(--black24);
    box-shadow: 0px 8px 16px -4px rgba(22, 34, 51, 0.08);
  }
  display: none;
`;

const QuestionLabel = styled.div`
  position: absolute;
  left: -8.27rem;
  top: -1rem;
  display: flex;
  width: 3.19rem;
  height: 3.31rem;
  background-color: var(--red);
  border-radius: 0.5rem 0 0 0.5rem;

  box-shadow: 0rem 1rem 1.5rem rgba(22, 34, 51, 0.08);
`;
const QuestionNum = styled.div`
  color: var(--white);
  position: absolute;
  left: -7.2rem;
  display: flex;
  font-weight: bolder;
`;

const Line = styled.div`
  position: relative;
  width: 100%;
  height: 0.3rem;
  background: #f5f5f5;
`;

const MbtiConfirm = styled(Button)``;
const SFormError = styled.div`
  margin-bottom: 1rem;
  color: var(--red);
  ${med14}
`;

export default SignupMBTI;
