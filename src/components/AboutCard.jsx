import React from 'react'
import styled from 'styled-components';

const AboutCard = (props) => {

    console.log(props);

    return (
        <div style={{ position: 'absolute', width: '80vw', display: 'flex', margin: '0 100px', justifyContent: props.data.pos === 'l' ? 'flex-start' : 'flex-end', alignItems: 'center', top: props.data.top }}>
            <props.char />
            <div style={{ color: props.tcolor, maxWidth: '420px' }}>
                <DevName>{props.data.name}</DevName>
                <DevWork>{props.data.work}</DevWork>
                <DevTag>{props.data.tag}</DevTag>
                <DevSay>{props.data.say}</DevSay>
                <DevEmail>{props.data.email}</DevEmail>
                <DevProfile>Profile : <a href={props.data.profile}>{props.data.profile}</a></DevProfile>
            </div>
        </div>
    )
}

export default AboutCard

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