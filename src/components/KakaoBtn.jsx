import React from 'react'
import KakaoImage from "../asset/KakaoImage.svg";
import { KAKAO_AUTH_URL } from '../auth/kakao_AUTH_URL';


const KakaoBtn = () => {

  return (
    <div>
        <a href={KAKAO_AUTH_URL}>
      <KakaoImage margin="auto"  />
      </a>
    </div>
  )
}

export default KakaoBtn
