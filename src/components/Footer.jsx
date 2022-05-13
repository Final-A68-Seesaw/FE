import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    return (
        <FooterContainer>
            Copyright ⓒ Team8 SEESO, 2022
        </FooterContainer>
    )
}

export default Footer

const FooterContainer = styled.div`
    width: 100%;
    height: 153px;
    margin-top: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    background-color: #ddd;
`