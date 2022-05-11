import React from 'react'
import styled from 'styled-components'

const FileInput = (props) => {

  const { _onClick, margin, width, height } = props

  const styles = {
    margin,
    width,
    height,
  }

  return (
    <FileDropbox>
      <InputFile
        type='file'
        accept='image/png, image/jpg, image/jpeg, image/pdf'
        multiple
        onClick={_onClick}
      />
    </FileDropbox>
  )
}

export default FileInput

const InputFile = styled.input`
  width: ${(props) => props.width ? props.width : '100%'};
  height: ${(props) => props.height ? props.height : '100%'};

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