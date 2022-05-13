import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    return (
        <FooterContainer>
            Copyright ⓒ 8조 2022
        </FooterContainer>
    )
}

export default Footer

const FooterContainer = styled.div`
    width: 100%;
    height: 153px;

    display: flex;
    align-items: center;
    justify-content: center;
    
    background-color: #ddd;
`