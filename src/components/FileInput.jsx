import React from 'react'
import styled from 'styled-components'

const FileInput = (props) => {

  const { _onChange, margin, width, height } = props

  const styles = {
    margin,
    width,
    height,
  }

  return (
    <FileDropbox>
      <InputFile
        {...styles}
        type='file'
        accept='image/png, image/jpg, image/jpeg, image/pdf'
        multiple
        onChange={_onChange}
      />
    </FileDropbox>
  )
}

export default FileInput

const InputFile = styled.input`
  width: ${(props) => props.width ? props.width : '100%'};
  height: ${(props) => props.height ? props.height : '100%'};

   font-size: 0px;
   ::-webkit-file-upload-button {
     display: none;
   }
`

const FileDropbox = styled.div`
  border: transparent;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: var(--grayed);
  border-radius: 3px;
`;