import React, { useState } from "react";
import { useForm } from "react-hook-form";

//redux
import { __addDict } from "../redux/modules/dictionary";
import { useDispatch, useSelector } from "react-redux";
import { __dictTitle } from "../redux/modules/dictionary";

//element & components
import Header from "../components/Header";
import { bold12, med14, med20, bold30 } from "../themes/textStyle";
import { ErrorXInput, SFormError } from "../elements/Input";
import Button from "../elements/Button";
import { BasicTextarea } from "../elements/Textarea";
import { Select } from "../elements/Select";
import FileUpload2 from "../components/FileUpload2";

//style
import styled from "styled-components";
import Book from "../asset/Dictionary_add_imo.svg";
import Footer from "../components/Footer";
import TextIcon from "../asset/DictAddIcon.svg";

const DictAdd = (props) => {
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
  const dataList = useSelector((state) => state.dictionary.detailData);


  //연도 select category
  const year = new Date().getFullYear();
  const years = Array.from(new Array(60), (val, index) => year - index);

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

  const imageList = useSelector((state) => state.dictionary.files);

  const onSubmit = (data) => {
    let postDto = {
      title: data.title,
      contents: data.contents,
      videoUrl: data.videoUrl,
      tagNames: tagList,
      generation: data.generation,
      files: imageList,
    };

    dispatch(__addDict(postDto));
  };

  return (
    <>
      <Header />
      <Container>
        <BookContianer>
          <Book />
        </BookContianer>
        <TextContainer>
          해당 신조어와 관련된 <b>새로운 내용</b>을 추가해주세요
        </TextContainer>
      
        <GenerationBox>{dataList && dataList.generation} </GenerationBox>
  
        <TitleBox>{dataList && dataList.title}</TitleBox>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          {/* 첨부파일 */}
          <FileUpload2 />

          <hr style={{ margin: "1rem 0 1rem 0", color: "var(--grayed)" }} />

          <Select
            name="generation"
            register={register({
              required: true,
              validate: (value) => value !== "none",
            })}
            label="신조어 유행 시작 연도"
            error={errors?.generation?.type}
            width= "24rem"
          >
            {years.map((year, index) => {
              return (
                <option key={`year${index}`} value={year}>
                  {year}
                </option>
              );
            })}
          </Select>

          <ErrorXInput
            type="text"
            name="videoUrl"
            label="동영상 링크 첨부"
            register={register}
            placeholder="URL을 입력해주세요"
          />
        </form>
        <div>
          <Labelbox> 태그 </Labelbox>
          <WholeBox>
            <TagBox>
              {tagList.map((tagItem, index) => {
                return (
                  <TagItem key={index}>
                    <Text>#{tagItem}</Text>
                    <TagXButton onClick={deleteTagItem}>X</TagXButton>
                  </TagItem>
                );
              })}

              <TagInput
                type="text"
                placeholder="Enter 키를 사용해 #태그를 입력해주세요!"
                tabIndex={2}
                onChange={(e) => setTagItem(e.target.value)}
                value={tagItem}
                onKeyPress={onKeyPress}
              />
            </TagBox>
          </WholeBox>
        </div>
     
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{display: "flex", justifyContent:"center"}}>
          <Button shape="confirmRed-B" type="submit" >
            등록하기
          </Button>
          </div>
        </form>
      </Container>
      <Footer/>
    </>
  );
};

export default DictAdd;

const Container = styled.div`
  margin: auto;
  max-width: 46rem;
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
  color:var(--black24);
`;

const Labelbox = styled.div`
display: flex;
justify-content: space-between;
  ${med14}
  margin-top: 8px;
  margin-bottom: 8px;
`;
const GenerationBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2rem;
  background-color: var(--black);
  border-radius: 40px;
  color: white;
  ${bold12}
  margin-top: 5rem;
  margin-bottom: 0.5rem;
`;
const TitleBox = styled.div`
  ${bold30}
  margin-bottom: 0.5rem;
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
  min-width: 250px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`;
