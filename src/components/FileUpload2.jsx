import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { setDict, __loadDictDetail } from "../redux/modules/dictionary";
import { actionCreators as ImageActions } from "../redux/modules/image";

import DropzoneImg from "../asset/Dictionary_add_dropzone.svg";
import { useParams } from "react-router-dom";

const FileUpload2 = (props) => {
  const dispatch = useDispatch();

  // console.log(props.file);

  const dbimages = useSelector((state) => state.image)
  console.log('db', dbimages);
  const detailData = useSelector((state) => state.dictionary.detailData)
  // console.log('detail', detailData?.postImages)
  const params = useParams()
  // console.log(params);

  // console.log(dbimages);

  const [Files, setFiles] = useState([]);
  const [oversize, setOversize] = useState(false)
  const [imgUrlList, setImgUrlList] = useState(props.file ? props.file : []);

  useEffect(() => {
    // console.log('list' ,imgUrlList);
    // dispatch(ImageActions.getimg())
    if (props.file)
      dispatch(__loadDictDetail(params.cardTitleId, 1));

    setOversize(false)

    return () => dispatch(ImageActions.clrimg())
  }, [])

  const ImageFile = (e) => {
    const FileList = e.target.files;
    const UrlList = [];

    for (let i = 0; i < FileList.length; i++) {
      if (FileList[i].size > 10 * 1024 * 1024) {
        setOversize(true)
        console.log(oversize);
        return
      }
      UrlList.push(URL.createObjectURL(FileList[i]));
    }

    setOversize(false)
    setFiles([...Files, ...FileList]);

    setImgUrlList([...imgUrlList, ...UrlList]);
    dispatch(ImageActions.addimg({ FileList }));
  };

  const delFile = (id) => {
    setImgUrlList(imgUrlList.filter((v, i) => i !== id));
    dispatch(ImageActions.delimg(id))
  };

  return (
    <div>
      {imgUrlList.length !== 0 && imgUrlList ? (
        <>
          <OversizeMsg>파일은 10MB이하로 올려주세요 !</OversizeMsg>
          <PreviewBox style={{ justifyContent: "flex-start" }}>
            <Previews>
              {imgUrlList.map((v, i) => {
                return (
                  <div key={i} style={{ margin: "10px" }}>
                    <Preview src={v} onClick={() => delFile(i)} />
                  </div>
                );
              })}
            </Previews>
          </PreviewBox>
          <hr style={{ width: "100%" }} />
        </>
      ) : null}

      <PreviewBox>
        <DropzoneImg style={{ position: "absolute", maxWidth: "500px" }} />

        <FileInput
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/pdf"
          multiple
          onChange={ImageFile}
        />
      </PreviewBox>
    </div>
  );
};

export default FileUpload2;

const FileInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 0px;
  z-index: 1;

  ::-webkit-file-upload-button {
    display: none;
  }
`;

const OversizeMsg = styled.p`
  width: 310px;
  height: 32px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
`

const PreviewBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 11.5rem;
  background-color: var(--grayed);
  border-radius: 3px;
  //가로스크롤
  overflow-x: auto;
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
`;

const Previews = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
`;

const Preview = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 7px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0.25rem;
  cursor: pointer;
`;

const Deletebtn = styled.div`
  color: #fff;
  font-size: 3px;
  text-align: center;
  line-height: 13px;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: #000;
  position: absolute;
  right: -5px;
  top: -5px;
`;
