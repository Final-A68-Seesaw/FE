import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";

//redux
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as TroubleActions } from "../redux/modules/touble";
import { actionCreators as ImageActions } from "../redux/modules/image";

//style
import styled from "styled-components";
import DropzoneImg from "../asset/Dictionary_add_dropzone.svg";

const FileUpload = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  //서버에서 받아온 이미지
  const dbimages = useSelector((state) => state.image.imagelist)

  const [Files, setFiles] = useState([]);
  const [oversize, setOversize] = useState(false)
  const [overlength, setOverlength] = useState(false)
  //현재 추가중인 이미지파일
  const [imgUrlList, setImgUrlList] = useState([])

  useEffect(() => {
    if (props.file)
      dispatch(TroubleActions.getTrouDetailDB(params.id, 1));

    return () => dispatch(ImageActions.clrimg());
  }, []);

  const ImageFile = async (e) => {
    //방금 추가한 이미지파일
    const FileList = e.target.files;
    const UrlList = [];
    const FilesLength = FileList.length + imgUrlList.length + dbimages.length

    let compressFiles = []

    if (imgUrlList.length + dbimages.length > 10) {
      return
    }

    //이미지 리사이징 옵션
    let options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 223,
      useWebWorker: true,
    }

    for (let i = 0; i < e.target.files.length; i++) {
      let fileName = e.target.files[i].name
      let fileType = e.target.files[i].type

      //gif파일은 리사이징 제외
      if(fileType === 'image/gif') {
        compressFiles.push(e.target.files[i])
        continue
      }

      //이미지 리사이징
      let compFile = await imageCompression(e.target.files[i], options)
      let toFile = new File([compFile], fileName, { type: fileType })
      compressFiles.push(toFile)
    }

    if (FilesLength > 10) {
      setOverlength(true)
    }

    const fileLength = FilesLength > 10 ? 10 - imgUrlList.length - dbimages.length : FileList.length

    for (let i = 0; i < fileLength; i++) {
      if (FileList[i].size > 10 * 1024 * 1024) {
        setOversize(true)
        return
      }
      UrlList.push(URL.createObjectURL(compressFiles[i]));
    }

    setOversize(false)
    setFiles([...Files, ...compressFiles]);

    setImgUrlList([...imgUrlList, ...UrlList]);
    dispatch(ImageActions.addimg({ FileList: compressFiles }));
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
            <p style={{ color: overlength ? 'red' : '#999999' }}>({imgUrlList.length + dbimages?.length}/10)</p>
            <p style={{ margin: '0 5px' }}>/</p>
            <p style={{ color: oversize ? 'red' : '#999999' }}>10MB</p>
          </div>
        </OversizeMsg>
        {dbimages?.length === 0 && imgUrlList.length === 0 ? null : 
        <PreviewBox style={{ justifyContent: "flex-start" }}>
          <Previews>
            {dbimages?.map((v, i) => {
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

export default FileUpload;

const FileInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 0px;
  z-index: 1;

  ::-webkit-file-upload-button {
    display: none;
  }
`;

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