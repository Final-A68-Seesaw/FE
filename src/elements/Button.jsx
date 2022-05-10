import React from "react";
import styled from "styled-components";
import { FaTimesCircle } from "react-icons/Fa";

const Button = ({ shape, children, ...rest }) => {
  switch (shape) {

    case "confirmRed-B":
      return (
        <Confirm {...rest}>
          {children}
        </Confirm>
      );


    case "smallBlack-B":
      return (
        <Confirm
          margin="0 0 0 2rem"
          width="8.43rem"
          height="3rem"
          background="black"
          borderRadius="3px"
          {...rest}
        >
          {children}
        </Confirm>
      );

    case "inputReset":
      return (
        <ResetXbutton {...rest}>
          <FaTimesCircle
            style={{
              width: "1rem",
              height: "1rem",
              color: "var(--graydf)",
            }}
          />
        </ResetXbutton>
      );

    default:
      return <Confirm {...rest}>{children}</Confirm>;
  }
};

const Confirm = styled.button`
  margin: ${(props) => (props.margin ? props.margin : "2.5rem")};
  display: ${(props) => (props.display ? props.display : "inline-block")};
  width: ${(props) => (props.width ? props.width : "50%")};
  height: ${(props) => (props.height ? props.height : "3.5rem")};
  background-color: #c1c1c1;
  border-color: transparent;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "12px"};
  color: white;
  font-size: 16px;
  font-weight: bolder;
  cursor: pointer;

  &:hover {
    background: ${(props) =>
    props.background ? props.background : "var(--red);"};
    color: ${(props) => (props.color ? props.color : "var(--white)")};
    font-weight: bolder;
    position: relative;
    transition: color 300ms ease-in-out, background-color 300ms ease-in-out;
  }
`;

const ResetXbutton = styled.button`
  background-color: transparent;
  border: 0px;
  /* margin-left: -2.5rem; */
`;
export default Button;
