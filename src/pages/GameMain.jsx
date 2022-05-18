import React from 'react'
import styled from 'styled-components'

import Header from '../components/Header'
import Gamemain from '../asset/GameMain.svg'
import Button from '../elements/Button'
import { history } from '../redux/configStore'

const GameMain = () => {
    return (
        <div>
            <Header />

            <Gamemain style={{ maxWidth: '100vw' }} />
            <div style={{ display: 'flex', justifyContent: 'center', margin: '-88px auto' }}>
                <GameBtn onClick={() => history.push('/game')}>시작하기</GameBtn>
            </div>
        </div>
    )
}

export default GameMain

const GameBtn = styled.div`
    width: 300px;
    height: 52px;
    margin: auto;

    background: #8E41FF;
    border-radius: 56.9524px;

    /* 18pt_Bold */

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #FFFFFF;

    cursor: pointer;
`