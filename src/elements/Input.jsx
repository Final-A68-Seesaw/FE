import React from "react";
import styled  from "styled-components";
import { TiDelete } from "react-icons/Ti";
import { med14 } from "../themes/textStyle";


export const Xicon = () => {
    
        return(
            <></>

        );
    

};




export const SFormError = styled.div`

    margin-bottom: 1rem;
    color: var(--red);
    ${med14}
    
`

export const InputText = styled.input`
  ${med14}
  width: 70%;
  border-radius: 0.3rem;;
  height: 0.8rem;
  padding: 1rem 1rem;
  color: var(--black24);
  border: 1px solid ${(props) =>
    (props.hasError
      ? "var(--red)"
      : "var(--graydf)")};
  transition: border-color 150ms ease-in-out;
  &::placeholder {
    color: var(--grayc1);
  }
  &:focus {
    border: 1px solid ${(props)=>
    (props.hasError
    ? "var(--red)"
    : "var(--gray66)")};
  }
`;

