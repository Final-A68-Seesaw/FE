import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Button from '../elements/Button'
import { InputText } from '../elements/Input'
import { bold41 } from '../themes/textStyle'
import GameBg from '../asset/GameBg.svg'
import GameBgPng from '../asset/GameBg.png'
import GameInput1 from '../asset/GameInputBg1.svg'
import GameInput2 from '../asset/GameInputBg2.svg'

const CrossWord = () => {

    let AnswerLength = 0
    let an = '0'
    let aref = []

    const AnswerPut = (e) => {

        // console.log(aref)

        // let getAnswer = e.target.value

        // if (getAnswer.length >= 2) {
        //     e.target.value = getAnswer.slice(0, 1)

        //     if (an < AnswerLength - 1) {
        //         an++
        //         document.getElementById(an.toString()).focus()
        //     }
        // }

        // if (e.target.value.length >= 2) {
        //     if (an < AnswerLength - 1) {
        //         an++
        //         document.getElementById(an.toString()).focus()
        //     }
        // }

        // return
        // // console.log(aref)
        // console.log(e.target.id)
        // // e.current.focus()
        // an++
        // console.log(an.toString())
        // // console.log(Answercell)
        // console.log(document.getElementById(e.target.id))
        // document.getElementById(an.toString()).focus()
    }


    const data = [
        {
            num: 1,
            word: '피카츄',
            line: 'down',
            row: 0,
            col: 0,
        },
        {
            num: 2,
            word: '라이츄',
            line: 'down',
            row: 6,
            col: 2,
        },
    ]

    const SettingData = (data) => {
        
    }

    return (
        <div>
            <Header />

            <GameContainer>
                <img src={GameBgPng} style={{ position: 'absolute', width: '-webkit-fill-available', height: '-webkit-fill-available', top: '0px' }} />
                {/* <GameBack ><GameBg style={{ position: 'absolute', width: '-webkit-fill-available', height: '-webkit-fill-available', top: '0px' }} /></GameBack> */}
                {/* <CellContainer>
                    {Array(100).fill().map((v, i) => {
                        return <Cell key={i} />
                    })}
                </CellContainer> */}
                <CellContainer>
                    {SettingData(data)}
                </CellContainer>

                <QuestContainer>
                    <QuestDiv>

                        <GameInput1 style={{ position: 'absolute', right: '0px' }} />
                        <GameInput2 style={{ position: 'absolute', right: '0px', bottom: '0px', zIndex: '3' }} />

                        <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', width: '594px', height: '100vh', right: '0px', background: '#111111' }}>
                            <div style={{ display: 'flex', width: '494px', height: '23px', margin: '127px auto 0 auto', justifyContent: 'space-between' }}>
                                <Questlabel>단어 설명</Questlabel>
                                <QuestCnt>남은단어</QuestCnt>
                            </div>
                            <Questdesc>맞출 칸을 선택해 주세요</Questdesc>
                            <AnswerDiv>
                                {/* <AnswerCell
                                id={AnswerLength++}
                                ref={(ref)=> aref = ref}
                                maxLength={1}
                                onChange={AnswerPut}
                            /> */}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <AnswerInput />
                                    <AnswerWrong>다시한번 생각해보세요!</AnswerWrong>
                                </div>
                            </AnswerDiv>

                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '70px', alignItems: 'center', zIndex: '4' }}>
                                <CheckBtn margin='0'>확인</CheckBtn>
                                <GameOver><u>포기할래요</u></GameOver>
                            </div>

                        </div>
                    </QuestDiv>
                </QuestContainer>
            </GameContainer>
        </div>
    )
}

export default CrossWord

const GameContainer = styled.div`
    display: flex;
`

const GameBack = styled.div`
    /* position: absolute;
    width: auto;
    height: 754px; */
`

const CellContainer = styled.div`
    position: absolute;
    min-width: 624px;
    width: 624px;
    height: 534.6px;
    gap: 8.61px;
    margin: 127px 126px 0 126px;

    display: flex;
    flex-wrap: wrap;
`

const Cell = styled.div`
    width: 51.65px;
    height: 51.65px;

    border: 1.5px solid #FFFFFF;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 4.30434px;
    transform: matrix(0, -1, -1, 0, 0, 0);
`

const QCell = styled.div`
    width: 51.65px;
    height: 51.65px;

    background: #FFFFFF;
    border: 1.5px solid #FFFFFF;
    border-radius: 4.30434px;
    transform: matrix(0, -1, -1, 0, 0, 0);
`

const SelCell = styled.div`
    box-sizing: border-box;

    width: 51.65px;
    height: 51.65px;

    background: #8E41FF;
    border: 1.5px solid #FFFFFF;
    border-radius: 4.30434px;
    transform: matrix(0, -1, -1, 0, 0, 0);
`

const AnswerCell = styled.input`
    ${bold41}
    width: 60px;
    height: 60px;
    margin: 5px;

    border: 1px solid black;
    text-align: center;

    background: #C0C4C9;
    border-radius: 5px;
    
    color: transparent;
    text-shadow: 0 0 0 #222;

    &:focus {
        outline: none;
    }
`

const QuestContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const AnswerDiv = styled.div`
    display: flex;
    margin: 0 auto;
`

const AnswerInput = styled.input`
    ${bold41}
    width: 270px;
    height: 92px;

    border: 1.5px solid #FFFFFF;
    border-radius: 5px;
`

const AnswerWrong = styled.div`
    
    height: 20px;
    margin: 12px auto 0 auto;
    z-index: 4;

    /* 14pt_Medium */

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    text-align: center;

    /* primary_red_#FF4E4E */

    color: #FF4E4E;
`

const QuestDiv = styled.div`

`

const Questlabel = styled.div`
    
    width: 63px;
    height: 23px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;
`

const QuestCnt = styled.div`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    display: flex;
    align-items: center;
    text-align: right;

    /* Secondary_yellow_#FFC438 */

    color: #FFC438;
`

const Questdesc = styled.div`
    box-sizing: border-box;

    width: 494px;
    min-height: 228px;
    margin: 14px auto 48px auto;
    display: flex;
    padding: 30px 26px;

    background: #333333;
    border: 1px solid #555555;
    backdrop-filter: blur(15px);

    border-radius: 5px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 35px;
    letter-spacing: -0.05em;

    color: #FFFFFF;
`

const CheckBtn = styled.div`
    width: 212px;
    height: 52px;

    background: #444444;
    border-radius: 56.9524px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    color: #AAAAAA;
`

const GameOver = styled.p`
    margin: 16px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #C0C4C9;
`