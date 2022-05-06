import React from "react";
import styled from "styled-components";
import {
  
  bold41,
  bold24,
  bold22,
  bold18,
  med24,
  med22,
  med20,
  med18,
  med16,
  med14,
  reg20,

} from "../themes/textStyle";

const Text = ({ children, ...rest }) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  ${({ type }) => {
    switch (type) {
      case "bold41":
        return `${bold41}`;
      case "bold24":
        return `${bold24}`;
      case "bold22":
        return `${bold22}`;
      case "bold18":
        return `${bold18}`;
      case "med24":
        return `${med24}`;
      case "med22":
        return `${med22}`;
      case "med20":
        return `${med20}`;
      case "med18":
        return `${med18}`;
      case "med16":
        return `${med16}`;
      case "med14":
        return `${med14}`;
      case "reg20":
        return `${reg20}`;

      default:
        return `${med18}`;
    }
  }};
  color: ${(props) => (props.color ? `var(--${props.color})` : `var(--black)`)};
`;

export default Text;