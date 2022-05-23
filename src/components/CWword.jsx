import React from 'react'
import styled from 'styled-components';

const CWword = (props) => {

    const searchlen = props.data.y * 10 + props.data.x

    const selecting = props.data.id === props.datakey

    return (
        <BlankDiv key={props.datakey}>
            {Array(searchlen).fill().map((v, i) => {
                return <BCell key={i} />
            })}

            {!props.data.oriental
                ? <ColCelldiv onClick={props?.onClick} pass={props.data.pass || props.IsOver} sel={selecting}>
                    {Array(props.data.wordCount).fill().map((v, i) => {
                        if (props.data.pass)
                            return <PassCell key={i}>{props.data.word.slice(i, i + 1)}</PassCell>
                        else if (props.IsOver)
                            return <GiveUp key={i}>{props.data.word.slice(i, i + 1)}</GiveUp>
                        else if (selecting)
                            return <SelCell key={i} />
                        else
                            return <QCell key={i} />
                    })}
                </ColCelldiv>
                : <RowCelldiv onClick={props?.onClick} pass={props.data.pass || props.IsOver} sel={selecting}>
                    {Array(props.data.wordCount).fill().map((v, i) => {
                        if (props.data.pass)
                            return <PassCell key={i}>{props.data.word.slice(i, i + 1)}</PassCell>
                        else if (props.IsOver)
                            return <GiveUp key={i}>{props.data.word.slice(i, i + 1)}</GiveUp>
                        else if (selecting)
                            return <SelCell key={i} />
                        else
                            return <QCell key={i} />
                    })}
                </RowCelldiv>
            }
        </BlankDiv>
    )
}

export default CWword

const RowCelldiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8.61px;
    z-index: 5;
    
    ${(props) => props.pass ? `z-index: 15` : `cursor: pointer`};
    ${(props) => props.sel ? `z-index: 10` : null};
`

const ColCelldiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8.61px;
    z-index: 5;

    ${(props) => props.pass ? `z-index: 15` : `cursor: pointer`};
    ${(props) => props.sel ? `z-index: 10` : null};
`

const BlankDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    min-width: 624px;
    width: 624px;
    height: 0px;
    gap: 8.61px;
`

const BCell = styled.div`
    width: 54.65px;
    height: 54.65px;
`

const QCell = styled.div`
    width: 51.65px;
    height: 51.65px;

    background: #FFFFFF;
    border: 1.5px solid #FFFFFF;
    border-radius: 4.30434px;
`

const SelCell = styled.div`
    width: 51.65px;
    height: 51.65px;

    background: #8E41FF;
    border: 1.5px solid #FFFFFF;
    border-radius: 4.30434px;
`

const PassCell = styled.div`
    width: 51.65px;
    height: 51.65px;
    z-index: 15;
    
    display: flex;
    align-items: center;
    justify-content: center;

    background: #FFB400;
    border: 1.5px solid #FFFFFF;
    border-radius: 4.30434px;

    /* 35pt_Bold */
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 51px;

    color: #FFFFFF;
`

const GiveUp = styled.div`
    width: 51.65px;
    height: 51.65px;
    z-index: 20;
    
    display: flex;
    align-items: center;
    justify-content: center;

    background: #FFFFFF;
    border: 1.5px solid #FFFFFF;
    border-radius: 4.30434px;
    
    /* 35pt_Bold */
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 51px;

    color: #FF4E4E;
`