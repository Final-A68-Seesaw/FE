import React from 'react'
import styled, { css } from 'styled-components';

const Button = ({ shape, children, ...rest }) => {
    switch (shape) {
     
      case "confirmRed-B":
        return(
            <Confirm {...rest}>
                {children}
            </Confirm>
        );
     default:
        return (
            <Confirm>
                {children}
            </Confirm>
        );
        
    }
  };



const Confirm = styled.button`
      
      margin: 2.5rem;
      display: inline-block;
      width: 20%;
      height: 3.5rem;
      background-color:#C1C1C1;
      border-color: transparent;
      border-radius: 0.75rem;
      color: white;
      font-size: 16px;
      font-weight: bolder;
      cursor: pointer;

  &:hover{
    background: #FF4E4E;
    color: white;
    font-weight: bolder;
    position: relative;}
    transition: color 300ms ease-in-out, background-color 300ms ease-in-out;
  
`;


export default Button;

