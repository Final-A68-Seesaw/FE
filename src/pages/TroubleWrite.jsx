import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { TroubleApi } from '../api/troubleApi'
// import FileInput from '../components/FileInput'

import { useForm } from "react-hook-form";
import { ErrorXInput, SFormError } from "../elements/Input";
import { BasicTextarea } from "../elements/Textarea";
import { SelectText } from "../elements/Select";

import Header from '../components/Header'
import Button from '../elements/Button'
import { actionCreators as TroubleActions } from '../redux/modules/touble'

import DropzoneImg from '../asset/Dictionary_add_dropzone.svg'
import Text from '../elements/Text';
import { useParams } from 'react-router-dom';

const TroubleWrite = () => {

  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch()
  const params = useParams()

  const [TrFiles, setTrFiles] = useState([])
  const [imgUrlList, setImgUrlList] = useState([])

  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [whoGen, setWhoGen] = useState()
  const [toGen, setToGen] = useState()
  const [tags, setTags] = useState([])
  const [errMsg, setErrMsg] = useState({ title: true, content: true, whoGen: true, toGen: true })

  // const onSubmit = (data) => {

  //   console.log(data);
  // };

  useEffect(() => {
    if (title === '') errMsg.title = false
    if (content === '') errMsg.content = false
    if (whoGen === '') errMsg.whoGen = false
    if (toGen === '') errMsg.toGen = false

  }, [])

  const ImageFile = (e) => {
    const FileList = e.target.files
    const UrlList = []

    setTrFiles([...TrFiles, ...FileList])

    for (let i = 0; i < FileList.length; i++) {
      UrlList.push(URL.createObjectURL(FileList[i]))
    }

    setImgUrlList([...imgUrlList, ...UrlList])
  }

  const TrouWrite = () => {

    if (errMsg.title && errMsg.content && errMsg.whoGen && errMsg.toGen) {

      let troubleDto = {
        title: title,
        contents: content,
        question: whoGen,
        answer: toGen,
        tagName: tags,
        files: TrFiles,
      }

      dispatch(TroubleActions.addTrouDB(troubleDto))
    }
  }

  const delFile = (id) => {
    setImgUrlList(imgUrlList.filter((v, i) => i !== id))
  }

  const delTag = (id) => {
    setTags(tags.filter((v, i) => i !== id))
  }

  const SelectBox = (inText, setvalue) => {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {inText}
      <SelectText onChange={(e) => setvalue(e.target.value)} style={{ margin: '10px', width: '300px' }}>
        <option >선택하세요</option>
        <option value="x세대">X세대(1965년생~1979년생)</option>
        <option value="y세대">Y세대(1980년생~1994년생)</option>
        <option value="z세대">Z세대(1995년생~2005년생)</option>
        <option value="알파세대">알파세대(2006년생~)</option>
      </SelectText>
    </div>
  }

  const tagKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value !== '') {
      setTags([...tags, e.target.value]);
      e.target.value = ''
    }
  };

  //인풋 글자수 count
  const [inputCount, setInputCount] = useState("0");
  const onInputChange = (e) => {
    setInputCount(e.target.value.length);
    setTitle(e.target.value)
  };

  return (
    <div>
      <Header />
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}

      <div style={{ padding: '74px 0', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', margin: 'auto', maxWidth: '46rem' }}>
        <TitleInput>타이틀
          <ErrorXInput
            maxLength={50}
            placeholder='어떤 고민이 있으신가요?'
            onChange={(e) => { setTitle(e.target.value) }}
            margin='0 20px'
          />
          <p>{title?.length}/50</p>
        </TitleInput>
        {errMsg.title ? null : <p style={{ color: 'red', margin: 'auto' }}>⚠ 제목을 입력해주세요.</p>}

        {/* <TitleInput>
            <ErrorXInput
              type="text"
              name="title"
              label="타이틀"
              register={register({
                required: {
                  value: true,
                  message: "⚠ 고민을 입력해주세요.",
                },
              })}
              placeholder="고민을 입력해주세요"
              maxLength="50"
              width="37.5rem"
              margin='16px 0 0 0'
              onChange={onInputChange}
            />
            <Button
              shape="inputReset"
              type="button"
              onClick={() => reset({ ...getValues(), title: "" })}
            />
            <InputCountBox>{inputCount}/50</InputCountBox>
          </TitleInput>
          <SFormError>{errors.title?.message}</SFormError> */}

        <div><BasicTextarea placeholder='고민내용을 자유롭게 적어주세요.' onChange={(e) => { setContent(e.target.value) }} /></div>
        {errMsg.content ? null : <p style={{ color: 'red', margin: 'auto' }}>⚠ 고민내용을 입력해주세요.</p>}

        {/* <BasicTextarea
            ref={register({
              required: {
                value: true,
                message: "⚠ 내용을 입력해주세요.",
              },
            })}
            name="contents"
            type="text"
            placeholder="고민을 적어주세요."
            hasError={Boolean(errors.contents?.message)}
          />
          <SFormError>{errors.contents?.message}</SFormError> */}


        <Seldiv>
          {SelectBox('질문자', setWhoGen)}
          {SelectBox('답변자', setToGen)}
        </Seldiv>

        <div style={{ display: 'flex' }}>
          {errMsg.whoGen ? null : <p style={{ color: 'red', margin: 'auto' }}>⚠ 질문자를 선택해주세요.</p>}
          {errMsg.toGen ? null : <p style={{ color: 'red', margin: 'auto' }}>⚠ 답변자를 선택해주세요.</p>}
        </div>

        <TagBox>
          {tags.map((v, i) => {
            return <TagItem key={i} style={{ display: 'flex' }}>
              <Text>{v}</Text> <div style={{ margin: '0 10px' }} onClick={() => delTag(i)}>x</div>
            </TagItem>
          })}

          <TagInput placeholder='태그(선택)' onKeyDown={tagKeyDown} />
        </TagBox>


        {/* <WholeBox>
            <TagBox>
              {tags.map((v, index) => {
                return (
                  <TagItem key={index}>
                    <Text>{v}</Text>
                    <TagXButton onClick={() => { }}>X</TagXButton>
                  </TagItem>
                );
              })}

              <TagInput
                type="text"
                placeholder="#태그를 입력해주세요"
                tabIndex={2}
                onChange={(e) => console.log(e.target.value)}
                // value={v}
                onKeyDown={onKeyDown}
              />
            </TagBox>
          </WholeBox> */}

        {imgUrlList.length !== 0 && imgUrlList ? <div>
          <PreviewBox style={{ justifyContent: 'flex-start' }}>
            <Previews>
              {imgUrlList.map((v, i) => {
                return <div key={i} style={{ margin: '10px' }}>
                  <Preview src={v} onClick={() => delFile(i)} />
                </div>
              })}
            </Previews>
          </PreviewBox>
          <hr style={{ width: '100%' }} />
        </div> : null}

        <PreviewBox>
          <DropzoneImg style={{ position: 'absolute', maxWidth: '500px' }} />

          <FileInput
            type='file'
            accept='image/png, image/jpg, image/jpeg, image/pdf'
            multiple
            onChange={ImageFile}
          />
        </PreviewBox>

        <Button margin='30px auto 100px auto' onClick={TrouWrite}>등록</Button>
      </div>
      {/* </form> */}
    </div>
  )
}

export default TroubleWrite



const Seldiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const Tagdiv = styled.div`
  /* margin: 50px 0 0 0; */
`

const FileInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 0px;
  z-index: 1;

  ::-webkit-file-upload-button {
    display: none;
  }
`

const PreviewBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 11rem;
  background-color: var(--grayed);
  border-radius: 3px;
  //가로스크롤
  overflow: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3.75px;
    background-color: var(--grayc0);

    &:hover {
      background-color: #adb5bd;
    }
  }
  &::-webkit-scrollbar-track {
    background: var(--grayed);
  }
  
`

const Previews = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 8px;
`

const Preview = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 7px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 4px;
  cursor: pointer;
`

const SelectGen = styled.select`
  
`

const TitleInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;


const InputCountBox = styled.div`
  display: flex;
`;

const WholeBox = styled.div`
  display: flex;
  margin: 10px;
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  padding: 0 10px;
  margin: 10px 0;
  border: 1px solid var(--graydf);
  border-radius: 3px;
  width: 44.5rem;
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
`;