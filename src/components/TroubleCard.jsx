import React, { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { history } from "../redux/configStore";
import { __scrapDict } from "../redux/modules/dictionary";

//element & component
import { bold15, med18, med15 } from "../themes/textStyle";


//style
import styled from "styled-components";
import Arrow from "../asset/Trouble_arrow.svg"


const TroubleCard = (props) => {
  const dispatch = useDispatch();

  return (
      <div
        style={{ margin: "0.5rem", cursor: "pointer" }}
        onClick={() => history.push(`/trouble/detail/${props.data.troubleId}`)}
      >
        <WordCard>
          <GenBox>
            <GenerationTag> {props.data.question} </GenerationTag>
            <Arrow />
            <GenerationTag> {props.data.answer} </GenerationTag>
          </GenBox>
          <CardTitle>{props.data.title}</CardTitle>
          <ViewCountBox>
            <div>조회수 {props.data.views}</div>
            <div>댓글 {props.data.commentCount} </div>
          </ViewCountBox>
        </WordCard>
        <img
          src={props.data.mainImage || props.data.troubleImages}
          style={{
            display: "flex",
            width: "223px",
            height: "320px",
            borderRadius: "10px",
          }}
        />
      </div>
  );
};

export default TroubleCard;

const WordCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 223px;
  height: 320px;
  border-radius: 10px;
  color: var(--white);
  background: linear-gradient(
    180deg,
    rgba(18, 0, 44, 0.39) 41.15%,
    #1b0042 80.21%
  );
  /* margin: 0.5rem; */
  position: absolute;
`;
const GenerationTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.2rem;
  height: 1.65rem;
  background-color: transparent;
  border-radius: 50px;
  border: 2.5px solid var(--white);
  color: white;
  ${bold15}
`;
const GenBox = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin: 1.3rem 1rem 9rem 1rem;
`;
const CardTitle = styled.div`
  ${med18}
  color: var(--white);
  display: inline-block;
  width: 85%;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  line-height: 1.5;
  height: 3.2rem;
  margin: 0 1.4rem 0 1rem;
`;
const ViewCountBox = styled.div`
  color: #555555;
  ${med15}
  margin: 0 0.5rem 1rem 0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;
