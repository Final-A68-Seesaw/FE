import React from 'react'
import kakaoImage from "../asset/kakaoImage.png";
import { KAKAO_AUTH_URL } from '../auth/kakao_AUTH_URL';


const KakaoBtn = () => {

  return (
    <div>
        <a href={KAKAO_AUTH_URL}>
      <img src={kakaoImage} width="200" margin="auto" />
      </a>
    </div>
  )
}

export default KakaoBtn
