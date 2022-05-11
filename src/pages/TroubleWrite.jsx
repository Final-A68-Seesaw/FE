import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { TroubleApi } from '../api/troubleApi'
import FileInput from '../components/FileInput'

import Header from '../components/Header'
import Button from '../elements/Button'
import { actionCreators as TroubleActions } from '../redux/modules/touble'

const TroubleWrite = () => {

  const dispatch = useDispatch()

  const [TrFiles, setTrFiles] = useState([])
  const [imgUrlList, setImgUrlList] = useState([])

  const oneFile = []
  // const imgUrlList = []

  // console.log('ya : ', oneFile, imgUrlList)

  useEffect(() => {
    // TroubleApi.ttp('asdf').then((res) => console.log(res))
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

    let troubleDto = {
      title: '제목인가',
      contents: '내용인가',
      question: 'Z세대가 물어봅니다',
      answer: 'X세대가 대답해주세요',
      tagName: ['#짱구'],
      files: oneFile,
    }

    dispatch(TroubleActions.addTrouDB(troubleDto))
  }

  const delFile = (id) => {
    console.log(id)
    const t = imgUrlList.map((v, i) => {
      // if( i == id)
    })

    console.log(t)
  }

  return (
    <div>
      <Header />
      <Button onClick={TrouWrite}></Button>

      <div style={{ display: 'flex', alignItems: 'center', width: '300px', height: '300px', backgroundColor: '#ddd' }}>
        {/* <FileInput
          type='file'
          accept='image/png, image/jpg, image/jpeg, image/pdf'
          multiple
          onChange={ImageFile}
        /> */}
        <FileInput />
      </div>


      {imgUrlList.map((v, i) => {
        console.log('pre', v)
        return <div key={i}>
          <Previews src={v} onClick={() => delFile(i)} />
        </div>
      })}
      {/* <FileInput/> */}
    </div>
  )
}

export default TroubleWrite

// const FileInput = styled.input`
//   width: 300px;
//   height: 300px;
//   font-size: 0px;
//   ::-webkit-file-upload-button {
//     display: none;
//   }
// `

const Previews = styled.img`
  width: 100px;

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`