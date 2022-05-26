import React from "react";
import styled from "styled-components";
import { med16 } from "../themes/textStyle";

const Footer = () => {
  return (
      <>
<HrLine/>
    <FooterContainer>
      <TextArea>
          <Textbox>
        <p>항해 99 팀프로젝트</p>
        </Textbox>
        <Textbox>
        <p>Copyright ⓒSEESO 2022</p>
        </Textbox>
      </TextArea>
    </FooterContainer>
    </>
  );
};

export default Footer;
const HrLine = styled.hr`
border: 1px solid var(--grayed);
margin-top: 3rem;

`

const FooterContainer = styled.div`
  min-width: 89rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0 2rem 0;
  background-color: var(--white);
  border-top: 1.5px solid E5E5E5;
`;
const TextArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 74rem;
`;
const Textbox = styled.div`
${med16};
color: #777777;
`
