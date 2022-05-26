import React, { useEffect, useState } from "react";
import { userApi } from "../api/userApi";
import { useForm } from "react-hook-form";

//redux
import { useSelector } from "react-redux";
import { history } from "../redux/configStore";

//ele
import Button from "../elements/Button";
import { ErrorXInput } from "../elements/Input";
import { Select } from "../elements/Select";

//style
import styled from "styled-components";
import { StepBar } from "../components/StepBar";
import Pen from "../asset/Signup_Character_imo.svg";
import Logo from "../asset/Seeso_logo.svg";
import { bold18, med14, med18 } from "../themes/textStyle";
import { cookies } from "../shared/cookie";

const SignupCharacter = () => {
  //react-hook-form
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  //~캐릭터 카드~
  const [charId, setCharId] = useState([null, null, null]);
  const [charSelect, setCharSelect] = useState([]);
  const [charPrev, setCharPrev] = useState([null, null, null]);
  const [gen, setGen] = useState('')

  //map의 기준점이 될 이미지 URL LIST
  const selectFaceList = charSelect.faceUrl;
  const selectAccList = charSelect.accessoryUrl;
  const selectBgList = charSelect.backgroundUrl;

  //이미지 선택시 charId로 값이 들어감
  const changeRadio = (e) => {
    const values = e.target.value.split(",");
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
  //select option
  const GenerationOptions = [
    { value: "none", label: "선택하세요" },
    { value: "X세대", label: "X세대(1965년생~1979년생)" },
    { value: "Y세대", label: "Y세대(1980년생~1994년생)" },
    { value: "Z세대", label: "Z세대(1995년생~2005년생)" },
    { value: "알파세대", label: "알파세대(2006년생~)" },
  ];

  //Api get
  useEffect(() => {
    userApi.signupCharacter().then((res) => {
      setCharSelect(res.data);
      setCharId([
        res.data.faceUrl[0].charId,
        res.data.accessoryUrl[0].charId,
        res.data.backgroundUrl[0].charId,
      ]);
      setCharPrev([
        res.data.faceUrl[0].profileImage,
        res.data.accessoryUrl[0].profileImage,
        res.data.backgroundUrl[0].profileImage,
      ]);
    });
  }, []);
  const userData = useSelector((state) => state.user.usersign);
  //데이터전송
  const onSubmit = async (data) => {
    let signDic = {
      username: userData.username,
      id: userData.id,
      generation: userData.generation,
      energy: userData.energy,
      insight: userData.insight,
      judgement: userData.judgement,
      lifePattern: userData.lifePattern,
      nickname: data.nickname,
      charId: [charId[0], charId[1], charId[2]],
    };

    let signKakao = {
      kakaoId: userData.kakaoId,
      username: userData.username,
      generation: data.generation,
      energy: userData.energy,
      insight: userData.insight,
      judgement: userData.judgement,
      lifePattern: userData.lifePattern,
      nickname: data.nickname,
      charId: [charId[0], charId[1], charId[2]],
    }

    try {  
      if(userData.generation !== null)
      {const user = await userApi.signupFinal(signDic);
        history.replace("/login");
        alert("회원가입이 완료됐습니다!");
      }
      else{
        const kakao = await userApi.kakaoCharacter(signKakao)
        console.log(kakao)
        const Token = kakao.headers.authorization.split(";Bearer ");
        const accessToken = Token[0].split(" ")[1];
        const refreshToken = Token[1];
  
        cookies.set("accessToken", accessToken, {
          path: "/",
          maxAge: 86400, // 1일
        });
        cookies.set("refreshToken", refreshToken, {
          path: "/",
          maxAge: 604800, // 7일
        });
        history.replace("/main")      
      }
    } catch (e) {
      console.log(e);
      if (e.message === "Request failed with status code 400") {
        alert("중복된 닉네임입니다.");
        return;
      }
      if (e.message === "Request failed with status code 500") {
        alert("잘못된 접근입니다. 회원가입을 처음부터 다시 시도해주세요.");
        history.replace("/login");
        return;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Logo style={{ margin: "2rem 0 0 2rem" }} />
      <Container>
        <StepBar shape="step3" />

        <Pen />
        <TextContainer>
          회원님의 성격이 담긴 <b>나만의 캐릭터 카드</b>를 완성시켜주세요!
        </TextContainer>

        <OutlineContainer>
          <LeftBox>
            <PrevWorkStage>
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  justifyContent: "center",
                  top: "100px",
                }}
              >
                <img
                  src={charPrev[0]}
                  style={{ width: "22rem", position: "absolute", zIndex: "3" }}
                />
                <img
                  src={charPrev[1]}
                  style={{ width: "22rem", position: "absolute", zIndex: "2" }}
                />
                <img
                  src={charPrev[2]}
                  style={{ width: "22rem", position: "absolute", zIndex: "1" }}
                />
              </div>
            </PrevWorkStage>

            <UserNameTag>
              <PreviewNick>{prevNick}님은 </PreviewNick>
              <Previewmbti>
                {userData.mbtiRes} {userData.generation || gen}
              </Previewmbti>
            </UserNameTag>
          </LeftBox>
          <RightBox>
            {userData.generation === null ? (
              <>
              <LabelBox>나의 세대는?</LabelBox>
              <Select
              width = "22rem"
                name="generation"
                onChange={(e)=>setGen(e.target.value)}
                register={register({
                  required: true,
                  validate: (value) => value !== "none",
                })}
                error={errors?.generation?.type}
              >
                {GenerationOptions.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
              </>
            ) : null}

            <LabelBox>닉네임</LabelBox>
            <ErrorXInput
              type="text"
              name="nickname"
              register={register({
                required: {
                  value: true,
                  message: "⚠ 닉네임을 입력해주세요.",
                },
                maxLength: {
                  value: 8,
                  message: "⚠ 최대 8글자 까지 가능합니다.",
                },
                minLength: {
                  value: 2,
                  message: "⚠ 닉네임은 최소 2글자 이상 입력해주세요.",
                },
              })}
              placeholder="닉네임을 입력해주세요."
              maxLength="9"
              error={errors?.nickname?.message}
              onChange={onInputChange}
            />
            {/* <Button shape="inputReset" onClick={onReset} type="button" /> */}

            <div>
              <LabelBox>표정</LabelBox>
              {selectFaceList &&
                selectFaceList.map((a, idx) => {
                  return (
                    <label key={idx}>
                      <SelectCharBox
                        {...register("faceUrl")}
                        type="radio"
                        name="faceUrl"
                        onChange={changeRadio}
                        value={[a.profileImage, a.charId]}
                      />
                      <SelectCharSource>
                        <CharContain>
                          <img
                            src={a.profileImage}
                            style={{
                              width: "4rem",
                              height: "4rem",
                              borderRadius: "0.75rem",
                            }}
                          />
                        </CharContain>
                      </SelectCharSource>
                    </label>
                  );
                })}
            </div>
            <div>
              <LabelBox>악세사리</LabelBox>
              {selectAccList &&
                selectAccList.map((a, idx) => {
                  return (
                    <label key={idx}>
                      <SelectCharBox
                        {...register("accessoryUrl")}
                        type="radio"
                        name="accessoryUrl"
                        onChange={changeRadio}
                        value={[a.profileImage, a.charId]}
                      />
                      <SelectCharSource>
                        <CharContain>
                          <img
                            src={a.profileImage}
                            style={{
                              width: "4rem",
                              height: "4rem",
                              borderRadius: "0.75rem",
                            }}
                          />
                        </CharContain>
                      </SelectCharSource>
                    </label>
                  );
                })}
            </div>
            <div>
              <LabelBox>배경</LabelBox>
              {selectBgList &&
                selectBgList.map((a, idx) => {
                  return (
                    <label key={idx}>
                      <SelectCharBox
                        {...register("backgroundUrl")}
                        type="radio"
                        label="배경"
                        name="backgroundUrl"
                        onChange={changeRadio}
                        value={[a.profileImage, a.charId]}
                      />
                      <SelectCharSource>
                        <CharContain>
                          <img
                            src={a.profileImage}
                            style={{
                              width: "4rem",
                              height: "4rem",
                              borderRadius: "1rem",
                            }}
                          />
                        </CharContain>
                      </SelectCharSource>
                    </label>
                  );
                })}
            </div>
          </RightBox>
        </OutlineContainer>
        <FinalConfirm width="24rem" type="submit">
          가입완료
        </FinalConfirm>
      </Container>
    </form>
  );
};

const Container = styled.div`
  margin: auto;
  max-width: 44rem;
  text-align: center;
`;

const TextContainer = styled.div`
  text-align: center;
  margin: 0.1rem;
  ${med18}
  color: #242424;
`;
const OutlineContainer = styled.div`
  margin-top: 2.5rem;
  height: 57%;
  justify-content: space-between;
  display: flex;
`;
const PrevWorkStage = styled.div``;

const FinalConfirm = styled(Button)`
  width: 24rem;
`;

const LabelBox = styled.div`
  ${med14}
  text-align: left;
`;
const RightBox = styled.div`
  width: 21rem;
`;
const LeftBox = styled.div``;
const UserNameTag = styled.div`
  border: 3px solid #ea8c00;
  height: 2.5rem;
  width: 20rem;
  border-radius: 12px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08),
    0px 8px 16px -4px rgba(22, 34, 51, 0.08);
  color: #ea8c00;
  padding: 1rem 0;
`;
const PreviewNick = styled.div`
  ${bold18}
`;

const Previewmbti = styled.div`
  ${med18}
`;
const CharContain = styled.div`
  width: 4rem;
  height: 4rem;
`;
const SelectCharSource = styled.span`
  margin: 0.8rem 0.3rem 2.3rem 0.3rem;
  width: 4rem;
  height: 4rem;
  line-height: 4rem;
  background-color: var(--grayed);
  border: 3px solid transparent;
  border-radius: 0.75rem;

  display: inline-block;
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
    border: 3px solid transparent;
  }
  &:checked + ${SelectCharSource} {
    border: 3px solid var(--yellow);
  }
  display: none;
`;
export default SignupCharacter;
