import React, { useEffect, useState } from "react";
import { userApi } from "../api/userApi";
import { history } from "../redux/configStore";

//Hook
import { useForm } from "react-hook-form"
import { clearStorage, getStorage } from '../shared/cookie';

//ele
import Button from "../elements/Button";
import { InputText, SFormError } from "../elements/Input";

//style
import styled from "styled-components";
import { StepBar } from "../components/StepBar";
import Pen from "../asset/SIGNUP_CHARACTER.svg";
import { FaTimesCircle } from "react-icons/Fa";


const SignupCharacter = () => {
  //react-hook-form
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  //prevent default 기능, submit후 console확인 시 value 효용 상황 확인 가능
  const onSubmitinValid = (data) => {
    console.log("data", data);
  };

  //~캐릭터 카드~
  const [charId, setCharId] = useState([null, null, null]);
  const [charSelect, setCharSelect] = useState([]);
  const [charPrev, setCharPrev] = useState([null, null, null]);

  //map의 기준점이 될 이미지 URL LIST
  const selectFaceList = charSelect.faceUrl;
  const selectAccList = charSelect.accessoryUrl;
  const selectBgList = charSelect.backgroundUrl;

  //이미지 선택시 charId로 값이 들어감
  const changeRadio = (e) => {
    const values = e.target.value.split(",")
    
    switch (e.target.name) {
      case "faceUrl":
         
        setCharId([values[1], charId[1], charId[2]]);
        setCharPrev([values[0], charPrev[1], charPrev[2]]);
        break;

      case "accessoryUrl":
        setCharId([charId[0], values[1], charId[2]]);
        setCharPrev([charPrev[0], values[0], charPrev[2]]);
        break;

      case "backgroundUrl":
        setCharId([charId[0], charId[1], values[1]]);
        setCharPrev([charPrev[0], charPrev[1], values[0]]);
        break;
    }
  };

  //Api get
  useEffect(() => {
    userApi.signupCharacter().then((res) => {
      setCharSelect(res.data);
    });
  }, []);

  //닉네임 카드에 미리보기
  const [prevNick, setPrevNick] = useState("");

  const onInputChange = (e) => {
    setPrevNick(e.target.value);
  };

  //인풋의 엑스버튼 클릭시 인풋과 닉네임 미리보기 내용 함께 리셋
  const onReset = () => {
    setPrevNick("");
    reset({
      ...getValues(),
      nickname: "",
    });
  };

  //데이터전송
  const onSubmit = async (data) => {
    console.log('data',data.nickname);

    let signDic = ({...getStorage(), nickname: data.nickname, categories: ['기본이미지', '머리1', '모자1', '표정1']})
    
    // userApi.getCharacter().then((res)=>console.log('res:', res.data))

    console.log(signDic)
     try{
         const user = await userApi.signupFinal(signDic);
         console.log(user);
         clearStorage()
         history.replace("/login");
       }catch (e) {
           console.log(e);
           if(e.message === "Request failed with status code 400") {
               console.log('400 Error ~ !')
               return;
           }
       }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitinValid, onSubmit)}>
      <Container>
        <StepBar shape="step3" />

        <Pen />
        <TextContainer>
          회원님의 성격이 담긴 <b>나만의 캐릭터 카드</b>를 완성시켜주세요!
        </TextContainer>

        <OutlineContainer>
        <PrevContainer>
            <PrevWorkStage>
        <img src={charPrev[0]} style={{width: "30%", position:'absolute', zIndex: '3'}}/>
        <img src={charPrev[1]} style={{width: "30%", position:'absolute', zIndex: '2'}}/>
        <img src={charPrev[2]} style={{width: "30%", position:'absolute', zIndex: '1'}} />
            </PrevWorkStage>
        </PrevContainer>
         
          {prevNick}

          <label>닉네임</label>
          <InputText
            ref={register({
              required: { value: true, message: "⚠ 닉네임을 입력해주세요." },
              maxLength: { value: 8, message: "⚠ 최대 8글자 까지 가능합니다." },
              minLength: {
                value: 2,
                message: "⚠ 닉네임은 최소 2글자 이상 입력해주세요.",
              },
            })}
            name="nickname"
            maxLength="9"
            type="text"
            placeholder="닉네임을 입력해주세요."
            hasError={Boolean(errors?.nickname?.message)}
            onChange={onInputChange}
          />
          <button
            type="button"
            onClick={onReset}
            style={{ backgroundColor: "transparent", border: "0px" }}
          >
            {/* marginTop: '1rem', marginLeft: '-2.5rem' */}
            <FaTimesCircle
              style={{ width: "1rem", height: "1rem", color: "var(--graydf)" }}
            />
          </button>
          <SFormError>{errors?.nickname?.message}</SFormError>
        </OutlineContainer>

        {selectFaceList &&
          selectFaceList.map((a, idx) => {
            return (
              <label key={idx}>
                <SelectCharBox
                  type="radio"
                  name="faceUrl"
                  onChange={changeRadio}
                  value={[a.url, a.charId]}
                />
                <SelectCharSource>
                  <CharContain>
                    <img src={a.url} />
                  </CharContain>
                </SelectCharSource>
              </label>
            );
          })}

        {selectAccList &&
          selectAccList.map((a, idx) => {
            return (
              <label key={idx}>
                <SelectCharBox
                  type="radio"
                  name="accessoryUrl"
                  onChange={changeRadio}
                  value={[a.url, a.charId]}
                />
                <SelectCharSource>
                  <CharContain>
                    <img src={a.url} />
                  </CharContain>
                </SelectCharSource>
              </label>
            );
          })}

        {selectBgList &&
          selectBgList.map((a, idx) => {
            return (
              <label key={idx}>
                <SelectCharBox
                  type="radio"
                  name="backgroundUrl"
                  onChange={changeRadio}
                  value={[a.url, a.charId]}
                />
                <SelectCharSource>
                  <CharContain>
                    <img src={a.url} />
                  </CharContain>
                </SelectCharSource>
              </label>
            );
          })}

        <FinalConfirm type="submit" disabled={!isValid}>
          가입완료
        </FinalConfirm>
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
  font-weight: 400;
  margin-bottom: 3rem;
  color: #242424;
`;
const OutlineContainer = styled.div`
  margin: auto;
  width: 50%;
  height: 57%;
`;

const PrevContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const PrevWorkStage = styled.div`
    margin-top: 100px;
    width: 50rem;
    overflow-y: auto;
`

const FinalConfirm = styled(Button)``;
const CharContain = styled.div`
  width: 5rem;
`;
const SelectCharSource = styled.span`
  margin: 1rem 0.5rem 2.5rem 0.5rem;
  width: 5rem;
  height: 7.7rem;
  line-height: 5rem;
  background-color: var(--grayed);
  border-color: transparent;
  border-radius: 0.75rem;

  display: inline-block;
  /* justify-content: center;
  align-items: center; */
  cursor: pointer;
`;
const SelectCharBox = styled.input`
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
  &:checked + ${SelectCharSource} {
    color: var(--black24);
    font-weight: bolder;
    border: 3px solid var(--red);
    box-shadow: 0px 8px 16px -4px rgba(22, 34, 51, 0.08);
  }
  display: none;
`;
export default SignupCharacter;
