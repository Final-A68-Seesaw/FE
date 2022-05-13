import React from "react";
import { useDispatch } from "react-redux";

//ellement & component
import Character from "./Character";
import { bold15, med14, med15 } from "../themes/textStyle";

//style
import styled from "styled-components";
import { AiOutlineLike } from "react-icons/Ai";
import { AiTwotoneLike } from "react-icons/Ai";

const CommentCard = (props) => {
  const dispatch = useDispatch();

  const updateCmt = () => {
    dispatch;
  };

  return (
    <>
      <HrLine />
      <div>
        <LoadCmtInfo>
          <div>
            <Character char={props.data?.profileImages} />
            <LoadCmtNickname>{props.data?.nickname}</LoadCmtNickname>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <LoadCmtTime>
              {props.data?.commentTime}{" "}
              <div style={{ margin: "0 0.25rem" }} onClick={() => {}}>
                수정
              </div>{" "}
              |{" "}
              <div style={{ margin: "0 0.25rem" }} onClick={() => {}}>
                삭제
              </div>{" "}
              | 신고
            </LoadCmtTime>
          </div>
        </LoadCmtInfo>
        <LoadCmt> {props.data?.comment} </LoadCmt>
      </div>
      <div>
        <LikeBtn>
          {props.data?.commentLikeStatus === true ? (
            <AiOutlineLike style={{ width: "1.5rem" }} />
          ) : (
            <AiTwotoneLike style={{ width: "1.5rem" }} />
          )}
          {props.data?.commentLikeCount}
        </LikeBtn>
      </div>
    </>
  );
};

export default CommentCard;
const HrLine = styled.hr`
  border: 1px solid var(--graydf);
`;
const LoadCmtInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LoadCmtNickname = styled.div`
  ${bold15}
  color: black;
  margin: 1rem 1rem 1rem 2.5rem;
`;
const LoadCmtTime = styled.div`
  color: var(--gray99);
  display: flex;
  ${med14}
`;
const LoadCmt = styled.div`
  margin: 0 1rem 1rem 2.5rem;
  ${med15}
`;
const LikeBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 0.75px solid var(--graydf);
  border-radius: 1.5px;
  width: 4rem;
  height: 2rem;
  margin: 0 1rem 1rem 2.5rem;
`;
