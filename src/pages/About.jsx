import React from 'react'
import styled from 'styled-components'

import Starting from '../asset/Starting.svg'
import { history } from '../redux/configStore'

const About = () => {
    return (
        <div style={{ background: '#8E41FF', width: '100vw', height: '100vh' }}>
            <TitleText>Seeso 플레이 그라운드 개발자</TitleText>
            <SubTitle></SubTitle>
            <Starting style={{ minWidth: '100vw', maxHeight: '99vh' }} />
        </div>
    )
}

export default About

const TitleText = styled.p`
    position: absolute;
    /* width: 362px; */
    height: 142px;
    left: 106px;
    top: 247px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 56.1022px;
    line-height: 71px;
    /* or 126% */

    display: flex;
    align-items: center;

    color: #FFFFFF;

`

const SubTitle = styled.p`
    position: absolute;
    width: 439px;
    height: 20px;
    left: 106px;
    top: 412.11px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 20px;
    /* identical to box height, or 118% */

    display: flex;
    align-items: center;

    color: #FFFFFF;
`

const StartBtn = styled.div`
    position: absolute;
    width: 180px;
    height: 52px;
    left: 106px;
    top: 496.72px;

    border-radius: 200px;

    background: rgba(255, 255, 255, 0.2);
    border: 1px solid #FFFFFF;
    border-radius: 200px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16.5px;
    line-height: 24px;
    /* identical to box height */

    display: flex;
    align-items: center;
    justify-content: center;

    /* White_#ffffff */

    color: #FFFFFF;

    cursor: pointer;
`