import React from "react";
import styled from "styled-components";
import {
  head_1,
  head_2,
  head_3,
  head_4,
  head_5,
  head_6,
  head_7,
  sub_1,
  sub_2,
  body_1,
  body_2,
  body_3,
  body_4,

  Bold_41px,
  Bold_24px,
  Bold_22px,
  Bold_18px,
  Med_24px,
  Med_22px,
  Med_20px,
  Med_18px,
  Med_16px,
  Med_14px,
  Reg_20px,

  gnb,
  button,
  caption,
} from "../themes/textStyle";

const Text = ({ children, ...rest }) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

const Wrapper = styled.div`
  ${({ type }) => {
    switch (type) {
      case "head_1":
        return `${head_1}`;
      case "head_2":
        return `${head_2}`;
      case "head_3":
        return `${head_3}`;
      case "head_4":
        return `${head_4}`;
      case "head_5":
        return `${head_5}`;
      case "head_6":
        return `${head_6}`;
      case "head_7":
        return `${head_7}`;
      case "sub_1":
        return `${sub_1}`;
      case "sub_2":
        return `${sub_2}`;
      case "body_1":
        return `${body_1}`;
      case "body_2":
        return `${body_2}`;
      case "body_3":
        return `${body_3}`;
      case "body_4":
        return `${body_4}`;

      case "Bold_41px":
        return `${Bold_41px}`;
      case "Bold_24px":
        return `${Bold_24px}`;
      case "Bold_22px":
        return `${Bold_22px}`;
      case "Bold_18px":
        return `${Bold_18px}`;
      case "Med_24px":
        return `${Med_24px}`;
      case "Med_22px":
        return `${Med_22px}`;
      case "Med_20px":
        return `${Med_20px}`;
      case "Med_18px":
        return `${Med_18px}`;
      case "Med_16px":
        return `${Med_16px}`;
      case "Med_14px":
        return `${Med_14px}`;
      case "Reg_20px":
        return `${Reg_20px}`;

      case "gnb":
        return `${gnb}`;
      case "button":
        return `${button}`;
      case "caption":
        return `${caption}`;
      default:
        return;
    }
  }};
  color: ${(props) => (props.color ? `var(--${props.color})` : `var(--black)`)};
`;

export default Text;