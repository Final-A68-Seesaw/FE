import React from 'react'
import styled from 'styled-components';

const AboutCard = (props) => {

    return (
        <CardWarp pos={props.data.pos} top={props.data.top}>
            <props.char className='jello-horizontal'/>
            <div style={{ color: props.tcolor, maxWidth: '420px' }}>
                <DevName>{props.data.name}</DevName>
                <DevWork>{props.data.work}</DevWork>
                <DevTag>{props.data.tag}</DevTag>
                <DevSay>{props.data.say}</DevSay>
                <DevEmail>{props.data.email}</DevEmail>
                <a href={props.data.profile}><DevProfile style={{ color: props.tcolor }}>Profile : {props.data.profile}</DevProfile></a>
            </div>
        </CardWarp>
    )
}

export default AboutCard

const CardWarp = styled.div`
    position: absolute;
    width: 80vw;
    display: flex;
    margin: 0 100px;
    align-items: center;

    justify-content: ${(props) => props.pos === 'l' ? 'flex-start' : 'flex-end'};
    top: ${(props) => `${props.top}px`};

    .jello-horizontal {
        animation: jello-horizontal 0.9s both;
    }
    @keyframes jello-horizontal {
        0% {
            transform: scale3d(1, 1, 1);
        }
        30% {
            transform: scale3d(1.25, 0.75, 1);
        }
        40% {
            transform: scale3d(0.75, 1.25, 1);
        }
        50% {
            transform: scale3d(1.15, 0.85, 1);
        }
        65% {
            transform: scale3d(0.95, 1.05, 1);
        }
        75% {
            transform: scale3d(1.05, 0.95, 1);
        }
        100% {
            transform: scale3d(1, 1, 1);
        }
    }
    .jello-vertical {
        animation: jello-vertical 0.9s both;
    }
    @keyframes jello-vertical {
        0% {
            transform: scale3d(1, 1, 1);
        }
        30% {
            transform: scale3d(0.75, 1.25, 1);
        }
        40% {
            transform: scale3d(1.25, 0.75, 1);
        }
        50% {
            transform: scale3d(0.85, 1.15, 1);
        }
        65% {
            transform: scale3d(1.05, 0.95, 1);
        }
        75% {
            transform: scale3d(0.95, 1.05, 1);
        }
        100% {
            transform: scale3d(1, 1, 1);
        }
    }
    .jello-diagonal-1 {
        animation: jello-diagonal-1 0.8s both;
    }
    @keyframes jello-diagonal-1 {
        0% {
            transform: skew(0deg 0deg);
        }
        30% {
            transform: skew(25deg 25deg);
        }
        40% {
            transform: skew(-15deg, -15deg);
        }
        50% {
            transform: skew(15deg, 15deg);
        }
        65% {
            transform: skew(-5deg, -5deg);
        }
        75% {
            transform: skew(5deg, 5deg);
        }
        100% {
            transform: skew(0deg 0deg);
        }
    }
    .jello-diagonal-2 {
        animation: jello-diagonal-2 0.8s both;
    }
    @keyframes jello-diagonal-2 {
        0% {
            transform: skew(0deg 0deg);
        }
        30% {
            transform: skew(-25deg -25deg);
        }
        40% {
            transform: skew(15deg, 15deg);
        }
        50% {
            transform: skew(-15deg, -15deg);
        }
        65% {
            transform: skew(5deg, 5deg);
        }
        75% {
            transform: skew(-5deg, -5deg);
        }
        100% {
            transform: skew(0deg 0deg);
        }
    }


`

const DevName = styled.div`
    /* width: 67px; */
    height: 24px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
    /* identical to box height, or 100% */

    display: flex;
    align-items: center;

    /* color: #FFFFFF; */
`

const DevWork = styled.div`
    /* width: 105px; */
    height: 24px;
    margin-top: 4px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 20.4px;
    line-height: 24px;
    /* identical to box height, or 118% */

    display: flex;
    align-items: center;

    /* color: #FFFFFF; */
`

const DevTag = styled.div`
    box-sizing: border-box;
    margin-top: 8px;

    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 6px 12px;
    gap: 2.23px;

    /* max-width: 320px; */
    height: 27px;

    /* White_#ffffff */

    background: #FFFFFF;
    /* Secondary_purple_#8E41FF */

    border: 1.5px solid #8E41FF;
    border-radius: 20px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 15px;
    /* identical to box height, or 100% */

    display: flex;
    align-items: center;

    /* Secondary_purple_#8E41FF */

    color: #8E41FF;
`

const DevSay = styled.div`
    /* width: 184px; */
    height: 24px;
    margin-top: 42px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 20.4px;
    line-height: 24px;
    /* identical to box height, or 118% */

    display: flex;
    align-items: center;

    /* White_#ffffff */

    /* color: #FFFFFF; */
`

const DevEmail = styled.div`
    /* width: 206px; */
    height: 24px;
    margin-top: 22px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;
    /* identical to box height, or 200% */

    display: flex;
    align-items: center;

    /* color: #FFFFFF; */
`

const DevProfile = styled.div`
    /* width: 223px; */
    height: 24px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;
    /* identical to box height, or 200% */

    display: flex;
    align-items: center;

    /* color: #FFFFFF; */
`