import React from 'react'
import styled from 'styled-components'

import { history } from '../redux/configStore'
import AboutCard from '../components/AboutCard'
import Header from '../components/Header'

// import Starting from '../asset/Starting.svg'
import CHM from '../asset/TeamSeeso/Seeso_Char_CHM.svg'
import PJY from '../asset/TeamSeeso/Seeso_Char_PJY.svg'
import PMS from '../asset/TeamSeeso/Seeso_Char_PMS.svg'
import CEH from '../asset/TeamSeeso/Seeso_Char_CEH.svg'
import KYR from '../asset/TeamSeeso/Seeso_Char_KYR.svg'
import SJM from '../asset/TeamSeeso/Seeso_Char_SJM.svg'
import YJW from '../asset/TeamSeeso/Seeso_Char_YJW.svg'
import AboutFootImg from '../asset/AboutFooter.svg'

const About = () => {

    const Developers = [
        {
            top: 300,
            pos: 'r',
            name: '최현민',
            work: '팀장, 백엔드',
            tag: '#ENFJ #앤드류 #프로틴은초코맛',
            say: 'Time is moving on',
            email: 'E-Mail : hyeonminchoi5@gmail.com',
            profile: 'https://github.com/hmhmchm'
        },
        {
            top: 600,
            pos: 'l',
            name: '박지연',
            work: '백엔드',
            tag: '#내가 아는 나는 #INFP #제리 #유부초밥',
            say: '포기하지 않으면 불가능이란 없다!',
            email: 'E-Mail : wwwsomty@gmail.com',
            profile: 'https://github.com/journeypark93'
        },
        {
            top: 900,
            pos: 'r',
            name: '박만수',
            work: '백엔드',
            tag: '#ISFJ #Passion #TOM #촌놈 #서울상경기',
            say: 'No error No gain',
            email: 'E-Mail : qkrakstn02@gmail.com',
            profile: 'https://github.com/parkmansu'
        },
        {
            top: 1200,
            pos: 'l',
            name: '천은호',
            work: '프론트엔드',
            tag: '#INFJ #게임 #이불밖은 위험해',
            say: '안돼는데 돼게 할 수 있나?',
            email: 'E-Mail : saintrabby@gmail.com',
            profile: 'https://github.com/saintrabby'
        },
        {
            top: 1500,
            pos: 'r',
            name: '김예림',
            work: '프론트엔드',
            tag: '#ENFP #패션디자이너 #문예경 #이젠 #개발자',
            say: '그럼에도 불구하고 우리는 사랑을 해야한다',
            email: 'E-Mail : kyr3080@gmail.com',
            profile: 'https://yerim1104.tistory.com/'
        },
        {
            top: 1800,
            pos: 'l',
            name: '송지민',
            work: '디자이너',
            tag: '#ISFJ #야작러 #쉼',
            say: '밤샘 작업 멈춰!',
            email: 'E-Mail : jimin808080@naver.com',
            profile: 'Profile : URL'
        },
        {
            top: 2100,
            pos: 'r',
            name: '양지원',
            work: '디자이너',
            tag: '#ENFP #디자인 #열정',
            say: 'Action is the foundational key to all success. -Pablo Picasso-',
            email: 'E-Mail : uang0506@gmail.com',
            profile: 'Profile : URL'
        },
    ]

    return (
        <>
            <Header />
            <div style={{ background: '#8E41FF', width: '100%', height: '900px' }}>
                <TitleText>우리들의 플레이그라운드</TitleText>
                <SubTitle>
                    <SubIcon>seeso</SubIcon>
                    <SubText>제작자들을 소개합니다</SubText>
                </SubTitle>
                <AboutCard char={CHM} data={Developers[0]} tcolor='#FFFFFF' />
                <AboutCard char={PJY} data={Developers[1]} tcolor='#FFFFFF' />
                <AboutCard char={PMS} data={Developers[2]} tcolor='#8E41FF' />
                <AboutCard char={CEH} data={Developers[3]} tcolor='#8E41FF' />
                <AboutCard char={KYR} data={Developers[4]} tcolor='#8E41FF' />
                <AboutCard char={SJM} data={Developers[5]} tcolor='#8E41FF' />
                <AboutCard char={YJW} data={Developers[6]} tcolor='#8E41FF' />
                {/* <Design2Div>
            <Design2 />
            </Design2Div> */}
                {/* <Starting style={{ minWidth: '100vw', maxHeight: '99vh' }} /> */}
            </div>
            <AboutFooter>
                <AboutFootImg style={{ width: '439px', marginTop: '70px' }} />
            </AboutFooter>
        </>
    )
}

export default About

const TitleText = styled.p`
    position: absolute;
    width: 362px;
    height: 142px;
    left: 181px;
    top: 206px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 56.1022px;
    line-height: 71px;
    /* or 126% */
    word-break: keep-all;

    display: flex;
    align-items: center;

    color: #FFFFFF;

`

const SubTitle = styled.div`
    position: absolute;
    width: 309.81px;
    height: 31.07px;

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

const SubIcon = styled.div`
    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    padding: 5.78609px 9.64349px;

    position: absolute;
    width: 78.81px;
    height: 31.07px;
    left: 181px;
    top: 368px;

    border: 1.68091px solid #FFFFFF;
    border-radius: 64.2899px;

    font-family: 'Helvetica75';
    font-style: normal;
    font-weight: 700;
    font-size: 21.9928px;
    line-height: 12px;
    text-align: center;

    color: #FFFFFF;
`

const SubText = styled.p`
    position: absolute;
    width: 223px;
    height: 27px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 22.8603px;
    line-height: 27px;
    left: 267.8px;
    top: 370.24px;
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

const Design2Div = styled.div`
    position: absolute;
    width: 755px;
    height: 320.01px;
    left: 630px;
    top: 1942px;

`

const AboutFooter = styled.div`
    display: flex;
    justify-content: center;
    z-index: -1;
    
    position: absolute;
    width: 100%;
    height: 577px;
    top: 2210px;

    background: #F7F7F7;
`