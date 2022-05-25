import React, { useEffect, useState } from "react";
import styled from "styled-components";

const LoaderWrap = styled.div`
 align-items: center;
 justify-content: center;
 flex: 1;
`;
const Image = styled.span`

`;
const animationImages = [
  require('../asset/Loader/로딩화면06.png'),
  require('../asset/Loader/로딩화면07.png'),
  require('../asset/Loader/로딩화면08.png'),
  require('../asset/Loader/로딩화면09.png'),
  require('../asset/Loader/로딩화면10.png'),
  require('../asset/Loader/로딩화면11.png'),
  require('../asset/Loader/로딩화면12.png'),
  require('../asset/Loader/로딩화면13.png'),
  require('../asset/Loader/로딩화면14.png'),
  require('../asset/Loader/로딩화면15.png'),
  require('../asset/Loader/로딩화면16.png'),
  require('../asset/Loader/로딩화면17.png'),
]
const Loader = () => {
  const [imageNumber,setImageNumer] = useState(0)
  useEffect(()=>{
    let count = 0;
    let countInterval = setInterval(()=>{
      setImageNumer((count++) %15);
    },1000/20)
  return () =>(
    clearInterval(countInterval)
  )
  },[]);
  return (
    <>
    <LoaderWrap>
    <Image source = {animationImages[imageNumber]} key={imageNumber}/>
    </LoaderWrap>
    </>
  );
};

export default Loader;
