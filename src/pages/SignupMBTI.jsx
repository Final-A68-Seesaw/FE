import React, { useState } from 'react'
import { userApi } from '../api/userApi';
import { history } from '../redux/configStore'

//style
import styled from 'styled-components'
import { StepBar } from '../components/StepBar'
import Hi from '../asset/MBTI_HI.svg'

//Hook
import { useForm } from "react-hook-form"
import { getCookie, setCookie, signUpCookie } from '../shared/cookie';


const SignupMBTI = () => {

  const [Mbti, setMbti] = useState({ energy: null, insight: null, judgement: null, lifePattern: null });

  const {
    register, handleSubmit, control,
    formState: { errors } }
    = useForm();

  const onSubmit = async () => {
    console.log(Mbti);
    
    try {
      const user = await userApi.mbti(Mbti);

      setCookie('energy', Mbti.energy)
      setCookie('insight', Mbti.insight)
      setCookie('judgement', Mbti.judgement)
      setCookie('lifePattern', Mbti.lifePattern)
      setCookie('mbtiRes', user.data)

      console.log(user);
      history.push("/signup/making/character");
    } catch (e) {
      console.log(e);
      if (e.message === "Request failed with status code 400") {
        // alert("mbti를 모두 체크해주세요.");
        return;
      }
    }

  };

  const changeRadio = e => {
    setMbti({ ...Mbti, [e.target.name]: e.target.value })
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <Container>

        <StepBar shape="step2" />

        <Hi />
        <TextContainer>
          씨소 플레이그라운드에 처음 오신 회원님을 환영합니다!
        </TextContainer>

        <OutlineContaierBar>
          나만의 캐릭터 생성을 위한 간단한 몇가지 질문에 답해주세요.
        </OutlineContaierBar>

        <OutlineContainer>

          <SelectionContainer>
            <div>
              <label>
                <FormCheckLeft
                  {...register("energy")}
                  type="radio"
                  name="energy"
                  onChange={changeRadio}
                  value="E"
                />
                <FormCheckText >밖에 무조건 나간다.</FormCheckText>
              </label>
              <label>
                <FormCheckLeft
                  {...register("energy")}
                  type="radio"
                  name="energy"
                  onChange={changeRadio}
                  value="I"
                />
                <FormCheckText >집에 그냥 있는다.</FormCheckText>
              </label>
            </div>
          </SelectionContainer>

          <SelectionContainer>
            <div>
              <label>
                <FormCheckLeft
                  type="radio"
                  name="insight"
                  onChange={changeRadio}
                  value="S"
                />
                <FormCheckText>밖에 무조건 나간다.</FormCheckText>
              </label>
              <label>
                <FormCheckLeft
                  type="radio"
                  name="insight"
                  onChange={changeRadio}
                  value="N"
                />
                <FormCheckText >집에 그냥 있는다.</FormCheckText>
              </label>
            </div>
          </SelectionContainer>

          <SelectionContainer>
            <div>
              <label>
                <FormCheckLeft
                  type="radio"
                  name="judgement"
                  onChange={changeRadio}
                  value={"F"}
                />
                <FormCheckText >밖에 무조건 나간다.</FormCheckText>
              </label>
              <label>
                <FormCheckLeft
                  type="radio"
                  name="judgement"
                  onChange={changeRadio}
                  value={"T"}
                />
                <FormCheckText>집에 그냥 있는다.</FormCheckText>
              </label>
            </div>
          </SelectionContainer>

          <SelectionContainer>
            <div>
              <label>
                <FormCheckLeft
                  type="radio"
                  name="lifePattern"
                  onChange={changeRadio}
                  value="J"
                />
                <FormCheckText >밖에 무조건 나간다.</FormCheckText>
              </label>
              <label>
                <FormCheckLeft
                  type="radio"
                  name="lifePattern"
                  onChange={changeRadio}
                  value="P"
                />
                <FormCheckText>집에 그냥 있는다.</FormCheckText>
              </label>
            </div>
          </SelectionContainer>

        </OutlineContainer>

        <Confirm type="submit" value="다음 단계" />
      </Container>

    </form>
  )
}
const Confirm = styled.input`
  margin: 2.5rem;
  display: inline-block;
  width: 23%;
  height: 4rem;
  background-color: #C1C1C1;
  border-color: transparent;
  border-radius: 0.75rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
`
const Container = styled.div`
   text-align: center;
   width: 100%;
`;

const TextContainer = styled.div`
  text-align: center;
  margin: 1rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

const OutlineContainer = styled.div`
  margin: auto;
  width: 90%;
  height: 57%;
  background: #FFFFFF;
  box-shadow: 0px 4px 8px -4px rgba(22, 34, 51, 0.08), 0px 16px 24px rgba(22, 34, 51, 0.08);
  border-radius: 0px 0px 28px 28px;
`;

const OutlineContaierBar = styled.section`
  text-align: center;
  line-height: 4rem;
  margin: auto;
  width: 50%;
  height: 4rem;
  color: white;
  font-weight: bold;
  background: #242424;
  box-shadow: 0px 4px 8px -4px rgba(22, 34, 51, 0.08), 0px 16px 24px rgba(22, 34, 51, 0.08);
  border-radius: 28px 28px 0px 0px ;
`

const SelectionContainer = styled.div`
  width: 90%;
  margin: 2rem;
`

const FormCheckText = styled.span`
  margin: 1rem 0.5rem;
  width: 45%;
  height: 4rem;
  line-height: 4rem;
  background-color: #edeff2;
  border-color: transparent;
  border-radius: 0.75rem;
  justify-content: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #999999;
  font-weight: 500;
`;

const FormCheckLeft = styled.input`
  &:checked {
    display: inline-block;
    background: none;
    padding: 0px 10px;
    text-align: center;
    height: 35px;
    line-height: 33px;
    font-weight: 500;
    display: none;
  }
  &:checked + ${FormCheckText} {
    background: #e4794d;
    color: #fff;
  }
  display: none;
`;


export default SignupMBTI