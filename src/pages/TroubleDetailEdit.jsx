import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  actionCreators as TroubleActions,
  __updateTrouDetail,
} from "../redux/modules/touble";

//element & component
import { med12, med15, med14, med20 } from "../themes/textStyle";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ErrorXInput, SFormError } from "../elements/Input";
import { Select } from "../elements/Select";
import Button from "../elements/Button";
import FileUpload from "../components/FileUpload";
import { BasicTextarea } from "../elements/Textarea";

//style
import styled from "styled-components";
import Book from "../asset/Dictionary_add_imo.svg";
import FileUpload2 from "../components/FileUpload2";

const TroubleAdd = () => {
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const params = useParams();
  const dataList = useSelector((state) => state.trouble.detail);
  const newPostImages = useSelector((state) => state.image);

  //디테일 데이터 로드
  useEffect(() => {
    dispatch(TroubleActions.getTrouDetailDB(params.id, 1));
  }, []);

  useEffect(() => {
    if (dataList) setTagList(dataList.tagNames);
  }, [dataList]);

  //select option
  const GenerationOptions = [
    { value: "none", label: "답변 세대 선택" },
    { value: "X세대", label: "X세대가 대답해주세요" },
    { value: "Y세대", label: "Y세대가 대답해주세요" },
    { value: "Z세대", label: "Z세대가 대답해주세요" },
    { value: "알파세대", label: "알파세대가 대답해주세요" },
  ];

  //select detail 정보 load
  const [ans, setAns] = useState();

  //인풋 글자수 count
  const [inputCount, setInputCount] = useState("0");
  const [title, setTitle] = useState("");
  const onInputChange = (e) => {
    setInputCount(e.target.value.length);
    setTitle(e.target.value);
  };

  //태그
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);

  //엔터키 프레스시 태그 추가됨
  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };

  //엔터키 프레스 후 태그의 내용이 중복되면 얼럿이 뜨고 없으면 추가된 후 태그 인풋이 리셋됨
  const submitTagItem = () => {
    const tag = tagItem.replace(/^\s+|\s+$/g, '')

    if (!tagList.find((v) => v === tag) && tagList.length < 10) {
      let updatedTagList = [...tagList];
      updatedTagList.push(tag);
      setTagList(updatedTagList);
    }
    setTagItem("");
  };

  //태그 삭제시
  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => `#${tagItem}` !== deleteTagItem
    );
    setTagList(filteredTagList);
  };

  //데이터전송
  const onSubmit = (data) => {
    let troubleDto = {
      title: data.title,
      contents: data.contents,
      tagNames: tagList,
      answer: data.answer,
      question: dataList&&dataList.question,
      filesUrl: dataList.troubleImages,
      files: newPostImages,
    };
    dispatch(__updateTrouDetail(troubleDto, params.id));
  };

  console.log(dataList);
  

  return (
    <>
      <Header />
      <Container>
        <BookContianer>
          <Book />
        </BookContianer>
        <TextContainer>회원님의 해결이 필요한 고민을 적어주세요</TextContainer>

        <form onSubmit={handleSubmit(onSubmit)}>
          <QuestionBox>
            <QuestionFromBox>
              <LabelBox>질문 세대</LabelBox>
              <QuestionFrom>
                {dataList && dataList.question}가 물어봅니다
              </QuestionFrom>
            </QuestionFromBox>
            <QuestionToBox>
              <LabelBox>답변 세대</LabelBox>
              <Select
                name="answer"
                value={ans ? ans : dataList?.answer}
                onChange={(e) => setAns(e.target.value)}
                register={register({
                  required: true,
                  validate: (value) => value !== "none",
                })}
                error={errors?.answer?.type}
                width="22.5rem"
              >
                {GenerationOptions.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </QuestionToBox>
          </QuestionBox>

          <TroubleBox>
            <TroubleTitle>
              <TitleLabelBox>
                <LabelBox>고민글 제목</LabelBox>
                <InputCountBox>{inputCount} /50</InputCountBox>
              </TitleLabelBox>
              <ErrorXInput
                type="text"
                name="title"
                defaultValue={dataList && dataList.title}
                register={register({
                  required: {
                    value: true,
                    message: "⚠ 제목을 입력해주세요.",
                  },
                })}
                placeholder="제목을 입력해주세요"
                maxLength="50"
                width="45rem"
                onChange={onInputChange}
                error={errors?.title?.message}
              />
              {/* <Button
              shape="inputReset"
              type="button"
              onClick={() => reset({ ...getValues(), title: "" })}
            /> */}
            </TroubleTitle>
            <TroubleTextArea>
              <BasicTextarea
                ref={register({
                  required: {
                    value: true,
                    message: "⚠ 내용을 입력해주세요",
                  },
                })}
                defaultValue={dataList && dataList.contents}
                name="contents"
                type="text"
                placeholder="고민을 설명해줄 수 있는 내용을 적어주세요"
                hasError={Boolean(errors?.contents?.message)}
                width="96%"
              />
              <SFormError>{errors?.contents?.message}</SFormError>
            </TroubleTextArea>

            {/* 첨부파일 */}
            <FileUpload file={dataList?.troubleImages} />
          </TroubleBox>
        </form>
        <TagWholeBox>
          <LabelBox>
            <TagLabel> 태그 </TagLabel>{" "}
            <TagLabel>{tagList.length} /10</TagLabel>
          </LabelBox>
          <WholeBox>
            {tagList.length === 0 ? null : (
              <div>
                <TagBox>
                  {tagList.map((tagItem, index) => {
                    return (
                      <TagItem key={index}>
                        <Text>#{tagItem}</Text>
                        <TagXButton onClick={deleteTagItem}>X</TagXButton>
                      </TagItem>
                    );
                  })}
                </TagBox>
                <HrLine />
              </div>
            )}

            {tagList.length >= 10 ? (
              <TagMaxText>태그는 10개까지 입력 가능합니다!</TagMaxText>
            ) : (
              <TagInput
                type="text"
                placeholder="Enter 키를 사용해 #태그를 입력해주세요!"
                tabIndex={2}
                onChange={(e) => setTagItem(e.target.value)}
                value={tagItem}
                onKeyPress={onKeyPress}
              />
            )}
          </WholeBox>
        </TagWholeBox>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ConfirmBox>
            <ConfirmLabel>
              글 작성시 본인에게 책임이 부여될 수 있음을 인지하고 동의합니다
            </ConfirmLabel>
            <Button shape="confirmRed-B" type="submit" margin="1rem 0 2.5rem 0">
              등록하기
            </Button>
          </ConfirmBox>
        </form>
      </Container>

      <Footer />
    </>
  );
};

export default TroubleAdd;

const Container = styled.div`
  margin: auto;
  max-width: 47rem;
  padding-top: 4rem;
`;
const BookContianer = styled.div`
  text-align: center;
  margin-top: 3.8rem;
`;
const TextContainer = styled.div`
  text-align: center;
  margin-top: 1.3em;
  margin-bottom: 2.5rem;
  ${med20}
  color: var(--black24);
`;
const QuestionBox = styled.div`
  justify-content: space-between;
  display: flex;
  margin-bottom: 1.5rem;
`;
const LabelBox = styled.div`
  justify-content: space-between;
  display: flex;

  ${med15}
  color: var(--gray66);
`;
const QuestionFromBox = styled.div`
  ${med15}
`;
const QuestionFrom = styled.div`
  margin-top: 8px;
  width: 21.2rem;
  border-radius: 0.3rem;
  color: var(--black24);
  border: 1px solid var(--graydf);
  padding: 1rem 1rem;
`;
const QuestionToBox = styled.div`
  margin-left: 1rem;
`;
const TroubleBox = styled.div``;
const TroubleTitle = styled.div``;
const TitleLabelBox = styled.div`
  justify-content: space-between;
  display: flex;
`;
const InputCountBox = styled.div`
  ${med14}
  text-align: right;
  color: var(--gray99);
`;
const TroubleTextArea = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;
const TagWholeBox = styled.div`
  margin: 2rem 0 2rem 0;
`;
const TagLabel = styled.div`
  display: flex;
  justify-content: space-between;
  ${med14}
  margin-top: 8px;
  margin-bottom: 8px;
`;
const HrLine = styled.hr`
  margin: 0.4rem 0.7rem 0 0.7rem;
  border: 0.3px solid var(--graydf);
`;

const WholeBox = styled.div`
  border: 1px solid var(--graydf);
  border-radius: 0.3rem;
  width: 47rem;
  &:focus-within {
    border: 2px solid black;
  }
`;
const TagBox = styled.div`
  background-color: transparent;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 3rem;
  padding: 0 10px;
`;
const TagItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding: 7px;
  background-color: transparent;
  border-radius: 22px;
  border: 1.5px solid var(--purple);
  color: var(--purple);
  font-size: 13px;
`;
const Text = styled.span``;

const TagXButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  background-color: transparent;
  border: transparent;
  color: var(--purple);
  cursor: pointer;
`;

const TagMaxText = styled.div`
  color: var(--grayc1);
  ${med14}
  padding: 0.9rem;
`;
const TagInput = styled.input`
  display: inline-flex;
  min-width: 250px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
  padding: 0.9rem;
  &::placeholder {
    color: var(--grayc1);
    ${med14}
  }
`;
const ConfirmBox = styled.div`
  margin-top: 4rem;
  text-align: center;
  justify-content: center;
`;
const ConfirmLabel = styled.div`
  ${med12}
  color: var(--gray99);
`;
