import React, {useRef} from 'react'
import { useForm } from "react-hook-form";
import { userApi } from '../api/userApi';
import { history } from '../redux/configStore';

import { StepBar } from '../components/StepBar';
import { setStorage } from '../shared/cookie';

const Signup = () => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
      } = useForm();
      
      const pwd = useRef();
      pwd.current = watch("pwd");


      const onSubmit = async (data) => {
        
        try{
            const user = await userApi.signup({'username': data.username, 'pwd': data.pwd, 'pwdCheck': data.pwdCheck});

            setStorage('username', data.username)
            setStorage('generation', data.generation)
            setStorage('pwd', data.pwd)

            history.push("/signup/making");
        }catch (e) {
            if(e.message === "Request failed with status code 400") {
                alert("중복된 아이디입니다.");
                return;
            }
        }
        
      }; 
    
    return (
        <form 
        onSubmit={handleSubmit(onSubmit)}
        >

        <StepBar shape = "step1"/>

        <label>이메일</label>

        <input
            name="username" type="email" 
            placeholder="이메일을 입력해주세요."
            ref={register({
                required: true,
                pattern:/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i
             })} />

             {errors.email &&<p>이메일 형식을 올바르게 입력해주세요.</p>}


        <label>나의 세대는?</label>
        <select
            name="generation"
            ref={register({
                required: true,
                validate: (value) =>
                value !== "none"
            })}>
            <option value="none">선택하세요</option>
            <option value="x세대">X세대(1965년생~1979년생)</option>
            <option value="y세대">Y세대(1980년생~1994년생)</option>
            <option value="z세대">Z세대(1995년생~2005년생)</option>
            <option value="알파세대">알파세대(2006년생~)</option>
        </select>
                {errors.generation && errors.generation.type === "validate"
                && <p>세대를 선택해주세요.</p>}


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
                
                {errors.pwd && errors.pwd.type === "pattern"
                && <p>하나 이상의 숫자, 영어 대문자, 소문자, 특수문자 조합으로 8자리 이상 20자리 이하로 입력해주세요!</p>}
                {errors.pwd && errors.pwd.type === "required"
                && <p>패스워드를 입력해주세요.</p>}
                {errors.pwd && errors.pwd.type === "maxLength"
                && <p>패스워드를 최대 20글자 까지 가능합니다.</p>}
                {errors.pwd && errors.pwd.type === "minLength"
                && <p>패스워드를 최소 8글자 이상 입력해주세요.</p>}
            


            <label>비밀번호 확인</label>
            <input
                name="pwdCheck" type="password"
                placeholder="비밀번호를 확인해주세요."
                ref={register({
                    required: true,
                    validate: (value) =>
                    value === pwd.current
                    })}/>

                {errors.pwdCheck && errors.pwdCheck.type === "required"   
                && <p>패스워드를 다시 한번 입력해주세요.</p>}
                {errors.pwdCheck && errors.pwdCheck.type === "validate"
                && <p>패스워드가 일치하지 않습니다.</p>}

                    
            {/* <input 
                name="agree" type="checkbox" 
                ref={register} /> 
            <label>가입을 동의합니다.</label> */}
            <button
            type="submit"
            >다음 단계</button>
        </form>
    )
}

export default Signup