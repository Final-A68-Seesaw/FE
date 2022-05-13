import React from "react";
import styled from "styled-components";
import { med14 } from "../themes/textStyle";


export const ErrorXInput = ({
  register,
  error,
  label,
  ...inputProps
}) => {
  return (
    <>
      <Labelbox >
        <label>{label}</label>
      </Labelbox>
      <InputText
        ref={register}
        hasError={Boolean(error)}
        {...inputProps}
      />
      <SFormError>{error}</SFormError>
    </>
  );
};

const Labelbox = styled.div`
  ${med14}
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const SFormError = styled.div`
  margin-bottom: 1rem;
  color: var(--red);
  ${med14}
`;

export const InputText = styled.input`
  ${med14}
  width: ${(props) => (props.width ? props.width : "95%")};

  border-radius: 0.3rem;
  height: 0.8rem;
  padding: 1rem 1rem;
  color: var(--black24);
  border: 1px solid
    ${(props) => (props.hasError ? "var(--red)" : "var(--graydf)")};
  transition: border-color 150ms ease-in-out;
  &::placeholder {
    color: var(--grayc1);
  }
  &:focus {
    border: 1px solid
      ${(props) => (props.hasError ? "var(--red)" : "var(--gray66)")};
  }
`;
const ResetXbutton = styled.button`
  background-color: transparent;
  border: 0px;
  margin-left: -2.5rem;
`;

