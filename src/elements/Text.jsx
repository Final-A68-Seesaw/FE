import React from "react";
import styled from "styled-components";
import {
  
  bold41,
  bold30,
  bold24,
  bold22,
  bold18,
  bold17,
  bold16,
  bold15,
  bold14,
  bold12,
  med24,
  med22,
  med20,
  med18,
  med16,
  med15,
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
      case "bold30":
        return `${bold30}`;
      case "bold24":
        return `${bold24}`;
      case "bold22":
        return `${bold22}`;
      case "bold18":
        return `${bold18}`;
      case "bold17":
        return `${bold17}`;
      case "bold16":
        return `${bold14}`;
      case "bold15":
        return `${bold15}`;
      case "bold14":
        return `${bold14}`; 
      case "bold12":
        return`${bold12}`;
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
      case "med15":
        return `${med15}`;
      case "med14":
        return `${med14}`;
      case "reg20":
        return `${reg20}`;

      default:
        return `${med15}`;
    }
  }};
  color: ${(props) => (props.color ? `var(--${props.color})` : `var(--black)`)};
`;

export default Text;