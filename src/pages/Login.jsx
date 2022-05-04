import React, {useRef} from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { __login } from "../redux/modules/user";

import styled from 'styled-components';
import Button from '../elements/Button';
import KakaoBtn from '../components/KakaoBtn';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
      
      const dispatch = useDispatch();

      const onSubmit = (data) => {
        dispatch(__login(data));
      }; 
     
      
    return (
      <>
        <form 
        onSubmit={handleSubmit(onSubmit)}
        >

        <label>이메일</label>

        <input
            name="username" type="email" 
            placeholder="이메일을 입력해주세요."
            ref={register({
                required: true,
                pattern:/^\S+@\S+$/i
             })} />

             {errors.email &&<p>이메일을 정확하게 입력해주세요.</p>}

        
        <label>비밀번호</label>
        <input
            name="pwd" type="password"
            placeholder="비밀번호를 입력해주세요."
            ref={register({
                required: true,
                maxLength: 20,
                minLength: 8,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
            })}/>

            {errors.pwd && errors.pwd.type === "required"
            && <p>패스워드를 입력해주세요.</p>}
            {errors.pwd && errors.pwd.type === "maxLength"
            && <p>패스워드를 정확하게 입력해주세요.</p>}
            {errors.pwd && errors.pwd.type === "minLength"
            && <p>패스워드를 정확하게 입력해주세요.</p>}
            {errors.pwd && errors.pwd.type === "pattern"
            && <p>하나 이상의 숫자, 영어 대문자, 소문자, 특수문자 조합으로 8자리 이상 20자리 이하로 입력해주세요!</p>}
        

            <LoginBtn  shape="confirmRed-B" type="submit">로그인하기</LoginBtn>
      </form>
      
      <KakaoBtn/>
      </>
    )
}

const LoginBtn = styled(Button)`
  margin-top: 60px;
`;

export default Login