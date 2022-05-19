import React, { useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Button from '../elements/Button'
import { InputText } from '../elements/Input'
import { bold41 } from '../themes/textStyle'
import GameBg from '../asset/GameBg.svg'
import GameBgPng from '../asset/GameBg.png'
import GameInput1 from '../asset/GameInputBg1.svg'
import GameInput2 from '../asset/GameInputBg2.svg'
import CWword from '../components/CWword'

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

    const [selQuiz, setSelQuiz] = useState()
    const [writeAnswer, setWriteAnswer] = useState('')

    const [testData, setTestData] = useState([
        {
            num: 1,
            word: '피카츄',
            desc: '전기쥐',
            line: 'right',
            row: 3,
            col: 3,
            pass: false,
        },
        {
            num: 2,
            word: '라이츄파이리',
            desc: '전기쥐진화+스타트불',
            line: 'down',
            row: 5,
            col: 1,
            pass: false,
        },
        {
            num: 3,
            word: '이상해씨',
            desc: '스타트풀',
            line: 'right',
            row: 5,
            col: 2,
            pass: false,
        },
    ])

    const SelWord = (data) => {
        if (data.pass)
            return
        console.log(data);
        setSelQuiz(data)
        setWriteAnswer('')
    }


    // console.log(selQuiz);
    // console.log(writeAnswer);


    const SettingData = (data, ikey) => {

        if (!data) {
            let gameMap = []

            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    gameMap.push(<Cell key={i * 10 + j} />)
                }
            }

            return <CellContainer>{gameMap}</CellContainer>
        }

        // return <CellContainer key={ikey}><CWword data={data} datakey={selQuiz?.num} onClick={() => SelWord(data)} /></CellContainer>
    }

    const onkeydown = (e) => {
        if (e.key === 'Enter')
            CheckAnswer()
    }

    const CheckAnswer = () => {
        if (!selQuiz)
            return

        if (selQuiz.word === writeAnswer) {
            console.log('ok')
            let test = (testData.findIndex((v, i) => selQuiz.num === v.num))
            testData[test].pass = true
        }
        else {
            console.log('no')
        }

        setWriteAnswer('')
    }

    return (
        <div>
            <Header />

            <GameContainer>
                <img src={GameBgPng} style={{ position: 'absolute', width: '-webkit-fill-available', minHeight: '755px', height: '100vh', overflow: 'hidden', top: '0px' }} />
                {/* <GameBack ><GameBg style={{ position: 'absolute', width: '-webkit-fill-available', minHeight: '626px', height: '-webkit-fill-available', top: '0px' }} /></GameBack> */}

                {SettingData()}
                {testData?.map((v, i) => {
                    return SettingData(v, i)
                })}

                <QuestContainer>
                    <QuestDiv>

                        <GameInput1 style={{ position: 'absolute', right: '0px' }} />
                        {/* <GameInput2 style={{ position: 'absolute', right: '0px', bottom: '0px', zIndex: '3' }} /> */}

                        <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', width: '594px', minHeight: '755px', height: '100vh', right: '0px', background: '#111111' }}>
                            <div style={{ display: 'flex', width: '494px', height: '23px', margin: '127px auto 0 auto', justifyContent: 'space-between' }}>
                                <Questlabel>단어 설명</Questlabel>
                                <QuestCnt>남은단어</QuestCnt>
                            </div>
                            <Questdesc>{selQuiz ? selQuiz.desc : `맞출 칸을 선택해 주세요`}</Questdesc>
                            <AnswerDiv>
                                {/* <AnswerCell
                                id={AnswerLength++}
                                ref={(ref)=> aref = ref}
                                maxLength={1}
                                onChange={AnswerPut}
                            /> */}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <AnswerInput
                                        value={writeAnswer}
                                        onChange={(e) => setWriteAnswer(e.target.value)}
                                        onKeyDown={(e) => onkeydown(e)}
                                    />
                                    <AnswerWrong>다시한번 생각해보세요!</AnswerWrong>
                                </div>
                            </AnswerDiv>

                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '70px', alignItems: 'center', zIndex: '4' }}>
                                <CheckBtn margin='0' onClick={CheckAnswer}>확인</CheckBtn>
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

const BlankCelldiv = styled.div`
    display: flex;
    gap: 8.61px;

    ${(props) => props.row ? `width: ${60.26 * props.row}px` : null}
    ${(props) => props.col ? `height: ${60.26 * 10 * props.col}px` : null}
`

const RowCelldiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8.61px;
`

const ColCelldiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8.61px;
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

const BCell = styled.div`
    width: 51.65px;
    height: 51.65px;
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
    height: 60px;
    padding: 0 10px;

    border: 1.5px solid #FFFFFF;
    border-radius: 5px;
    background: #111111;

    /* 35pt_Bold */
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 51px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #FFFFFF;
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

    cursor: pointer;
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

    cursor: pointer;
`