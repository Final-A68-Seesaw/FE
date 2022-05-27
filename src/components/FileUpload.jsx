import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as TroubleActions } from "../redux/modules/touble";
import { actionCreators as ImageActions } from "../redux/modules/image";
import { setTrou } from "../redux/modules/touble";

//style
import styled from "styled-components";
import DropzoneImg from "../asset/Dictionary_add_dropzone.svg";

const FileUpload = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  const [Files, setFiles] = useState([]);
  const [imgUrlList, setImgUrlList] = useState(props.file ? props.file : []);

  useEffect(() => {
    if (props.file)
      dispatch(TroubleActions.getTrouDetailDB(params.id, 1));

    return () => dispatch(ImageActions.clrimg());
  }, []);

  const ImageFile = (e) => {
    const FileList = e.target.files;
    const UrlList = [];

    setFiles([...Files, ...FileList]);

    for (let i = 0; i < FileList.length; i++) {
      UrlList.push(URL.createObjectURL(FileList[i]));
    }

    setImgUrlList([...imgUrlList, ...UrlList]);
    dispatch(ImageActions.addimg(...FileList));
  };
  const delFile = (id) => {
    setImgUrlList(imgUrlList.filter((v, i) => i !== id));
    dispatch(ImageActions.delimg(id));
  };

  return (
    <div>
      {imgUrlList.length !== 0 && imgUrlList ? (
        <>
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
