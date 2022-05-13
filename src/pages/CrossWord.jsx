import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Button from '../elements/Button'
import { InputText } from '../elements/Input'
import { bold41 } from '../themes/textStyle'

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


    const data = {
        across: [
            {
                num: 1,
                word: '피카츄',
                row: 0,
                col: 0,
            }
        ],
    }

    return (
        <div>
            <Header />

            <GameContainer>
                <CellContainer>
                    {Array(100).fill(0).map((v, i) => {
                        if (i % 6 == 0)
                            return <QCell key={i} />
                        return <Cell key={i} />
                    })}
                </CellContainer>

                <QuestContainer>
                    <QuestDiv>
                        <Questlabel>단어 설명</Questlabel>
                        <Questdesc>맞출 칸을 선택해 주세요</Questdesc>
                        <AnswerDiv>
                            {/* <AnswerCell
                                id={AnswerLength++}
                                ref={(ref)=> aref = ref}
                                maxLength={1}
                                onChange={AnswerPut}
                            /> */}
                            <AnswerInput />
                        </AnswerDiv>
                        <Button>확인</Button>
                        <GameOver>그만</GameOver>
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

const CellContainer = styled.div`
    width: 700px;
    min-width: 700px;
    height: 700px;
    margin: 10px;
    margin: 40px;
    display: flex;
    flex-wrap: wrap;
`

const Cell = styled.div`
    width: 60px;
    height: 60px;
    margin: 5px;

    box-shadow: -5px 0 5px black;

    background: #C0C4C9;
    border-radius: 5px;
    transform: matrix(0, -1, -1, 0, 0, 0);
`

const QCell = styled.div`
    width: 60px;
    height: 60px;
    margin: 5px;

    box-shadow: -5px 0 5px black;

    background: #5f6264;
    border-radius: 5px;
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
`

const AnswerDiv = styled.div`
    display: flex;
    width: 100px;
    height: 100px;
    background-color: green;
`

const AnswerInput = styled.input`
    ${bold41}
    width: 200px;
`

const QuestDiv = styled.div`
    width: 100px;
    height: 100px;
    background-color: red;
`

const Questlabel = styled.div`
    width: 100px;
    height: 100px;
    background-color: blue;
`

const Questdesc = styled.div`
    width: 100px;
    height: 100px;
    background-color: yellow;
`

const GameOver = styled.button`
    border: 0px;
    background-color: rgba(0,0,0,0);
`