
import styled  from "styled-components";
import { med14 } from "../themes/textStyle";


export const SelectText = styled.select`
  ${med14}
  width: 73%;
  border-radius: 0.3rem;;
  height: 3rem;
  color: var(--black24);
  padding: 0.5rem 3rem 0.5rem 0.5rem;
  border: 1px solid ${(props) =>
    (props.hasError
      ? "var(--red)"
      : "var(--graydf)")};
  transition: border-color 150ms ease-in-out;
  option {
    color: var(--black24);
    background: white;
    display: flex;
    white-space: pre;
    min-height: 0.8rem;
    padding: 1rem 1rem;
  }
`;