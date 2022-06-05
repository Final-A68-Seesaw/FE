import React, { useEffect, useState } from "react";
import styled from "styled-components";
import imageCompression from "browser-image-compression";

import { useDispatch, useSelector } from "react-redux";
import { __loadDictDetail } from "../redux/modules/dictionary";
import { actionCreators as ImageActions } from "../redux/modules/image";

import DropzoneImg from "../asset/Dictionary_add_dropzone.svg";
import { useParams } from "react-router-dom";

const FileUpload2 = (props) => {
  const dispatch = useDispatch();

  const dbimages = useSelector((state) => state.image.imagelist)
  
  const params = useParams()

  const [Files, setFiles] = useState([]);
  const [oversize, setOversize] = useState(false)
  const [overlength, setOverlength] = useState(false)
  const [imgUrlList, setImgUrlList] = useState([])

  useEffect(() => {
    if (props.file)
      dispatch(__loadDictDetail(params.cardTitleId, 1));

    return () => dispatch(ImageActions.clrimg())
  }, [])

  const ImageFile = async (e) => {
    const FileList = e.target.files;
    const UrlList = [];
    const FilesLength = FileList.length + imgUrlList.length + dbimages.length

    if (imgUrlList.length + dbimages.length > 10) {
      return
    }

    let options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 320,
    }

    let compressFiles = []

    for (let i = 0; i < e.target.files.length; i++) {
      let compFile = await imageCompression(e.target.files, options)
      console.log(compFile);

      compressFiles.push(compFile)
    }

    console.log(compressFiles);

    if (FilesLength > 10) {
      setOverlength(true)
    }

    const fileLength = FilesLength > 10 ? 10 - imgUrlList.length - dbimages.length : FileList.length

    for (let i = 0; i < fileLength; i++) {
      if (FileList[i].size > 10 * 1024 * 1024) {
        setOversize(true)
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
      <>
        <OversizeMsg>
          <p>파일 첨부</p>
          <div style={{ display: 'flex', color: '#999999' }}>
            <p style={{ margin: '0 5px' }}>파일 제한</p>
            <p style={{ color: overlength ? 'red' : '#999999' }}>({imgUrlList.length + dbimages.length}/10)</p>
            <p style={{ margin: '0 5px' }}>/</p>
            <p style={{ color: oversize ? 'red' : '#999999' }}>10MB</p>
          </div>
        </OversizeMsg>
        {dbimages.length === 0 && imgUrlList.length === 0 ? null : <PreviewBox style={{ justifyContent: "flex-start" }}>
          <Previews>
            {dbimages.map((v, i) => {
              return (
                <div key={i} style={{ margin: "10px" }}>
                  <Preview src={v} onClick={() => delFile(i)} />
                </div>
              );
            })}

            {imgUrlList.map((v, i) => {
              return (
                <div key={i} style={{ margin: "10px" }}>
                  <Preview src={v} onClick={() => delFile(i)} />
                </div>
              );
            })}
          </Previews>
        </PreviewBox>}
        <hr style={{ width: "100%" }} />
      </>

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

const OversizeMsg = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  /* 14pt_Medium */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  color: #666666;
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
