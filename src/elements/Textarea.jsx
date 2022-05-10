import React from "react";
import styled from "styled-components";
import { med14 } from "../themes/textStyle";

const Textarea = ({
...rest
}) => {

  return (
    <></>
  );
};

export const BasicTextarea = styled.textarea`
  ${med14}
  border-color: var(--graydf);
  width: ${(props)=> props.width ? props.width : '95%' };
  height: 16rem;
  color: var(--black24);
  resize: none;
  padding: 1rem;
  
  border: 1px solid ${(props) =>
    (props.hasError
      ? "var(--red)"
      : "var(--graydf)")};
  transition: border-color 150ms ease-in-out;

  ::placeholder{
    color: var(--grayc1);
    margin: 5px;
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3.75px;
    background-color: var(--grayc0);

    &:hover {
      background-color: #adb5bd;
    }
  }
  &::-webkit-scrollbar-track {
    background: var(--grayed);
  }

  
`
export default Textarea;