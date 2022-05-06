import React, { useState } from 'react'
import { userApi } from '../api/userApi';
import { history } from '../redux/configStore'

//style
import styled from 'styled-components'
import { StepBar } from '../components/StepBar'
import Hi  from '../asset/MBTI_HI.svg'

//element
import Button from '../elements/Button';
import { med18 } from '../themes/textStyle';

//Hook
import { useForm } from "react-hook-form"
import { getCookie, setCookie, signUpCookie } from '../shared/cookie';


const SignupMBTI = () => {

  const [Mbti, setMbti] = useState({ energy: null, insight: null, judgement: null, lifePattern: null });

  const {
    register, handleSubmit }
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
        onSubmit={handleSubmit(onSubmit)}>

        <Container>
          
          <StepBar shape = "step2"/>
          
          <Hi/>
        
          <TextContainer>
            <b>씨소 플레이그라운드</b>에 처음 오신 회원님을 환영합니다!
          </TextContainer>

            <OutlineContaierBar>
                나만의 캐릭터 생성을 위한 간단한 몇가지 질문에 답해주세요.
            </OutlineContaierBar>  
              
            <OutlineContainer>

              
                  <QuestionText>
                  <QuestionLabel/>
                    <QuestionNum>Q1</QuestionNum>
                    주말이 왔어요, 심심한 당신은 어떤 선택을 하나요?
                  </QuestionText> 
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
                      <FormCheckText >집에 그냥 있는다</FormCheckText>
                    </label>
                  </div>

                  <Line/>
                  
                  <QuestionText>
                  <QuestionLabel/>
                  <QuestionNum>Q2</QuestionNum>
                    주말이 왔어요, 심심한 당신은 어떤 선택을 하나요?
                  </QuestionText> 

                  <div>
                    <label>
                      <FormCheckLeft
                        type="radio"
                        name="insight"
                        onChange={changeRadio}
                        value="S"
                      />
                      <FormCheckText>밖에 무조건 나간다</FormCheckText>
                    </label>
                    <label>
                      <FormCheckLeft
                        type="radio"
                        name="insight"
                        onChange={changeRadio}
                        value="N"
                      />
                      <FormCheckText >집에 그냥 있는다</FormCheckText>
                    </label>
                  </div>
                
                  <Line/>

                  <QuestionText>
                  <QuestionLabel/>
                  <QuestionNum>Q3</QuestionNum>
                    주말이 왔어요, 심심한 당신은 어떤 선택을 하나요?
                  </QuestionText> 

                  <div>
                    <label>
                      <FormCheckLeft
                        type="radio"
                        name="judgement"
                        onChange={changeRadio}
                        value={"F"}
                      />
                      <FormCheckText >밖에 무조건 나간다</FormCheckText>
                    </label>
                    <label>
                      <FormCheckLeft
                        type="radio"
                        name="judgement"
                        onChange={changeRadio}
                        value={"T"}
                      />
                      <FormCheckText>집에 그냥 있는다</FormCheckText>
                    </label>
                  </div>
                
                  <Line/>

                  <QuestionText>
                    
                    <QuestionLabel/>
                    <QuestionNum>Q4</QuestionNum>

                      주말이 왔어요, 심심한 당신은 어떤 선택을 하나요?
                  </QuestionText> 

                  <div>
                    <label>
                      <FormCheckLeft
                        type="radio"
                        name="lifePattern"
                        onChange={changeRadio}
                        value="J"
                      />
                      <FormCheckText >밖에 무조건 나간다</FormCheckText>
                    </label>
                    <label>
                      <FormCheckLeft
                        type="radio"
                        name="lifePattern"
                        onChange={changeRadio}
                        value="P"
                      />
                      <FormCheckText>집에 그냥 있는다</FormCheckText>
                    </label>
                  </div>
        
            </OutlineContainer>
          <MbtiConfirm type="submit"> 다음 단계 </MbtiConfirm>
          </Container>
        
        </form>
    )
}

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
  width: 50%;
  height: 4rem;
  color: var(--white);
  font-weight: bold;
  background: var(--black24);
  box-shadow: 0px 4px 8px -4px rgba(22, 34, 51, 0.08), 0px 16px 24px rgba(22, 34, 51, 0.08);
  border-radius: 28px 28px 0px 0px ;
`;

const OutlineContainer = styled.div`
  margin: auto;
  width: 50%;
  height: 57%;
  background: var(--white);
  box-shadow: 0px 4px 8px -4px rgba(22, 34, 51, 0.08), 0px 16px 24px rgba(22, 34, 51, 0.08);
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
  margin: 1rem 0.5rem 2.5rem 0.5rem;
  width: 40%;
  height: 4rem;
  line-height: 4rem;
  background-color: var(--grayed);
  border-color: transparent;
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
`
const QuestionNum = styled.div`
  color: var(--white);
  position: absolute;
  left: -7.2rem;
  display: flex;
  font-weight: bolder;
`

const Line = styled.div`
  position: relative;
  width: 100%;
  height: 0.3rem;
  background: #F5F5F5;
`

const MbtiConfirm = styled(Button)`
  
`

export default SignupMBTI