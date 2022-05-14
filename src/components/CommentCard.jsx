import React from "react";
import { useDispatch } from "react-redux";
import { __deleteDictComment } from "../redux/modules/dictionary";

//ellement & component
import Character from "./Character";
import { bold15, med14, med15 } from "../themes/textStyle";

//style
import styled from "styled-components";
import { AiOutlineLike } from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";

const CommentCard = (props) => {
  const dispatch = useDispatch();

  const updateCmt = () => {
    dispatch;
  };


  const deleteCmt = (data) =>{
    dispatch(__deleteDictComment(data));
  }

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
              {props.nickname === props.data.nickname
              ? <>
              <div style={{ margin: "0 0.25rem" }} onClick={() => {}}>
                수정
              </div>{" "}
              |{" "}
              <div style={{ margin: "0 0.25rem", cursor: "pointer"}}
              onClick={() => {deleteCmt(props.data.commentId)}}>
                삭제
              </div>
              </>
              : null }
              {" "}
              | 신고
            </LoadCmtTime>
          </div>
        </LoadCmtInfo>
        <LoadCmt> {props.data?.comment} </LoadCmt>
      </div>
      <div>
        {props.nickname !== props.data.nickname
        ?<LikeBtn>
        {props.data?.commentLikeStatus === false ? (
          <AiOutlineLike style={{ cursor: "pointer", width: "1.5rem" }} />
        ) : (
          <AiTwotoneLike style={{ cursor: "pointer", width: "1.5rem" }} />
        )}
        {props.data?.commentLikeCount}
      </LikeBtn>
      : null}
        
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
  border: transparent;
  padding: 1rem 1rem 1rem 0.5rem;
  height: 2rem;
  margin: 0 1rem 1rem 2.5rem;
`;
