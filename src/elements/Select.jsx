import React from "react";
import styled  from "styled-components";
import { med14, med15 } from "../themes/textStyle";


export const Select = ({
  register,
  error,
  label,
  ...selectProps
}) => {
  return (
    <>
      <Labelbox>
        <label>{label}</label>
      </Labelbox>
      <SelectText
        ref={register}
        hasError={Boolean(error)}
        {...selectProps}

      />
      <SFormError>{error =="validate" &&
      (<p>⚠ 선택해주세요.</p>)}</SFormError>
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

export const SelectText = styled.select`
  ${med15}
  width: ${(props) => (props.width ? props.width : "103%")};

  border-radius: 0.3rem;;
  height: ${(props) => (props.height ? props.height : "3rem")};
  color: var(--black24);
  border: 1px solid
    ${(props) => (props.hasError ? "var(--red)" : "var(--graydf)")};
  transition: border-color 150ms ease-in-out;
  padding: 0.5rem 3rem 0.5rem 0.5rem;
  
  &::placeholder {
    color: var(--grayc1);
  }
  
  option {
    color: var(--black24);
    background: white;
    display: flex;
    white-space: pre;
    min-height: 0.8rem;
    padding: 1rem 1rem;
  }
`;