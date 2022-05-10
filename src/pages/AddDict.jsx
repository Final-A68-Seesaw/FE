import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";

//element & components
import { med16 } from "../themes/textStyle";
import { ErrorXInput, SFormError } from "../elements/Input";
import Button from "../elements/Button";
import { BasicTextarea } from "../elements/Textarea";
import FileInput from "../components/FileInput";

//style
import styled from "styled-components";
import Header from "../components/Header";
import Book from "../asset/Dictionary_add_imo.svg";

const AddDict = (props) => {
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  //인풋 글자수 count
  const [inputCount, setInputCount] = useState("0");
  const onInputChange = (e) => {
    setInputCount(e.target.value.length);
  };

  //file upload
  const onDrop = (files) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    console.log(files);
  };

  //태그
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setTagItem("");
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
  };

  //데이터전송
  const onSubmit = (data) => {
    const { tagname } = getValues();
    submitData({ tagname });
    console.log(data);
    // dispatch(__login(data));
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <BookContianer>
            <Book />
          </BookContianer>
          <TextContainer>
            회원님이 알고 있는 <b>새로운 신조어</b>를 등재해주세요
          </TextContainer>

          <WhatisNew>
            어떤 것이 신조어인가요?
            <hr />
            신조어는 새로 만든 낱말을 의미하며 신조어 또는 신어는 새로 만들거나
            생겨난 말 또는 새로 귀화한 외래어를 가리킵니다. ‘신조어 사전’에서는
            현재 새로 만들어진 말 뿐만 아니라 과거 유행했던 신조어를 모두
            포함합니다.
          </WhatisNew>

          <TitleInput>
            <ErrorXInput
              type="text"
              name="title"
              label="등재할 신조어"
              register={register({
                required: {
                  value: true,
                  message: "⚠ 단어를 입력해주세요.",
                },
              })}
              placeholder="단어를 입력해주세요"
              maxLength="50"
              width="37.5rem"
              onChange={onInputChange}
              error={errors?.title?.message}
            />
            <Button
              shape="inputReset"
              type="button"
              onClick={() => reset({ ...getValues(), title: "" })}
            />
            <Button shape="smallBlack-B" type="submit">
              중복확인
            </Button>
          </TitleInput>
          <InputCountBox>{inputCount}/50</InputCountBox>
          <label></label>
          <BasicTextarea
            ref={register({
              required: {
                value: true,
                message: "⚠ 내용을 입력해주세요.",
              },
            })}
            name="contents"
            type="text"
            placeholder="단어를 설명해줄 수 있는 내용을 적어주세요.

                *등록시 유의할 점
                - 형식은 자유롭게 작성하되, 누구나 알아볼 수 있도록 정리해주세요.
                - 사전에 등록되는 것인 만큼 신중하게 내용을 작성해주세요.
                - 최대한 정확한 내용을 담도록 노력해주세요."
            hasError={Boolean(errors?.contents?.message)}
          />
          <SFormError>{errors?.contents?.message}</SFormError>
          {/* <FileInput
            accept="image/png, image/jpg, image/jpeg, image/pdf"
            multiple={true}
            onDrop={onDrop}
            mode="append"
            type="file"
            name="mainImage"
          /> */}
          <div>
            <WholeBox>
              <TagBox>
                {tagList.map((tagItem, index) => {
                  return (
                    <TagItem key={index}>
                      <Text>{tagItem}</Text>
                      <TagXButton onClick={deleteTagItem}>X</TagXButton>
                    </TagItem>
                  );
                })}

                <TagInput
                  type="text"
                  placeholder="#태그를 입력해주세요"
                  tabIndex={2}
                  onChange={(e) => setTagItem(e.target.value)}
                  value={tagItem}
                  onKeyPress={onKeyPress}
                />
              </TagBox>
            </WholeBox>
          </div>
          <Button shape="confirmRed-B" type="submit" value="등록하기">
            등록하기
          </Button>
        </Container>
      </form>
    </>
  );
};

export default AddDict;

const Container = styled.div`
  margin: auto;
  max-width: 46rem;
`;

const BookContianer = styled.div`
  text-align: center;
  margin-top: 3.8rem;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-top: 1.3em;
  margin-bottom: 2.5rem;
  ${med16}
  color:var(--black24);
`;

const WhatisNew = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;
  margin: auto;

  background-color: #f5f7ff;
  border-radius: 0.47rem;
`;

const TitleInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputCountBox = styled.div`
  display: flex;
`;

const FileUpload = styled.div`
  max-width: 700px;
  margin: 2rem auto;
`;

const WholeBox = styled.div`
  display: flex;
 
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  padding: 0 10px;
  border: 1px solid var(--graydf);
  border-radius: 3px;
  width: 46rem;
  height: 3rem;
  &:focus-within {
    border: 2px solid black;
  }
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

const TagInput = styled.input`
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`;