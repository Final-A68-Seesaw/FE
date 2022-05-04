import React, {useState} from 'react'
import { userApi } from '../api/userApi';
import { history } from '../redux/configStore'

//style
import styled from 'styled-components'
import { StepBar } from '../components/StepBar'
import Pen  from '../asset/SIGNUP_CHARACTER.svg'
import Button from '../elements/Button';

//character
import CharBg from '../asset/Char_bg.svg'
import CharCap from '../asset/Char_cap.svg'
import CharGlasses from '../asset/Char_glasses.svg'

//Hook
import { useForm} from "react-hook-form"


const SignupCharacter = () => {

    const {
        register, handleSubmit, control,
        formState: { errors } }
        = useForm();

    const onSubmit = async (data) => {
        console.log(data);
         try{
             const user = await userApi.signupFinal(data);
             console.log(user);
             history.replace("/main");
           }catch (e) {
               console.log(e);
               if(e.message === "Request failed with status code 400") {
                   alert("mbti를 모두 체크해주세요.");
                   return;
               }
           }
     
       }; 

    return (
     <form 
        onSubmit={handleSubmit(onSubmit)}>

        <Container>
        
         <StepBar shape = "step3"/>  

         <Pen/>
         <TextContainer>
            회원님의 성격이 담긴 <b>나만의 캐릭터 카드</b>를 완성시켜주세요!
         </TextContainer>
        <OutlineContainer>
           <CharBg margintop="0"/>
            
        <div>
        <label>닉네임</label>
        <input
            name="nickname"
            placeholder="닉네임을 입력해주세요."
            ref={register({
                required: true,
                maxLength: 8,
                minLength:2
            })}/>

            {errors.nickname && errors.nickname.type === "required"
            && <p>닉네임을 입력해주세요.</p>}
            {errors.nickname && errors.nickname.type === "maxLength"
            && <p>닉네임은 최대 8글자 까지 가능합니다.</p>}
            {errors.nickname && errors.nickname.type === "minLength"
            && <p>닉네임은 최소 2글자 이상 입력해주세요.</p>}
        </div>
 
            </OutlineContainer>
            <MbtiConfirm type="submit"> 가입완료 </MbtiConfirm>
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
  font-weight: 400;
  margin-bottom: 3rem;
  color:#242424;
`;
const OutlineContainer = styled.div`
  margin: auto;
  width: 50%;
  height: 57%;
`;

const MbtiConfirm = styled(Button)`
 
`

export default SignupCharacter