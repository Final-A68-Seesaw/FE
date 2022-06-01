import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  __addDict,
  __loadDictDetail,
  __updateDictDetail,
  __dictTitle,
} from "../redux/modules/dictionary";

//element & components
import Header from "../components/Header";
import { bold12, med14, med20, bold30 } from "../themes/textStyle";
import { ErrorXInput, SFormError } from "../elements/Input";
import Button from "../elements/Button";
import { BasicTextarea } from "../elements/Textarea";
import { Select } from "../elements/Select";
import FileUpload2 from "../components/FileUpload2";
import Footer from "../components/Footer";

//style
import styled from "styled-components";
import Book from "../asset/Dictionary_add_imo.svg";

const DictDetailEdit = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const params = useParams();
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.dictionary.detailData);
  const newPostImages = useSelector((state) => state.image);

  //디테일 데이터 로드
  useEffect(() => {
    dispatch(__loadDictDetail(params.cardTitleId, 1));
  }, []);

  useEffect(() => {
    if (dataList) setTagList(dataList.tagNames);
  }, [dataList]);

  //단어 사용 세대
  const GenerationOptions = [
    { value: "none", label: "선택하세요" },
    { value: "X세대", label: "X세대(1965년 ~ 1979년)" },
    { value: "Y세대", label: "Y세대(1980년 ~ 1994년)" },
    { value: "Z세대", label: "Z세대(1995년 ~ 2005년)" },
    { value: "알파세대", label: "알파세대(2006년~)" },
  ];

  //태그
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  const [gen, setGen] = useState();

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    const tag = tagItem.replace(/^\s+|\s+$/g, '')

    if (!tagList.find((v) => v === tag) && tagList.length < 10) {
      let updatedTagList = [...tagList];
      updatedTagList.push(tag);
      setTagList(updatedTagList);
    }
    setTagItem("");
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => `#${tagItem}` !== deleteTagItem
    );
    setTagList(filteredTagList);
  };

  //데이터전송

  const onSubmit = (data) => {
    let postDto = {
      title: dataList.title,
      contents: data.contents,
      videoUrl: data.videoUrl,
      tagNames: tagList,
      generation: data.generation,
      filesUrl: dataList.postImages,
      files: newPostImages,
    };

    dispatch(__updateDictDetail(postDto, params.cardTitleId));
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
            defaultValue={dataList && dataList.contents}
            ref={register({
              required: {
                value: true,
                message: "⚠ 내용을 입력해주세요.",
              },
            })}
            name="contents"
            type="text"
            hasError={Boolean(errors?.contents?.message)}
          />
          <SFormError>{errors?.contents?.message}</SFormError>

          {/* 첨부파일 */}
          <FileUpload2 file={dataList?.postImages} />

          <hr style={{ margin: "1rem 0 1rem 0", color: "var(--grayed)" }} />

          <Select
            name="generation"
            value={gen ? gen : dataList?.generation}
            onChange={(e) => setGen(e.target.value)}
            register={register({
              required: true,
              validate: (value) => value !== "none",
            })}
            label="단어 사용 세대"
            width="24rem"
            error={errors?.generation?.type}
          >
            {GenerationOptions.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </Select>

          <ErrorXInput
            type="text"
            name="videoUrl"
            label="동영상 링크 첨부"
            defaultValue={dataList && dataList.videoUrl}
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button shape="confirmRed-B" type="submit">
              수정완료
            </Button>
          </div>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default DictDetailEdit;

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
  margin-top: 3rem;
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
