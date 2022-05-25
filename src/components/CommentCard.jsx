import React, { useState } from "react";
import { useForm } from "react-hook-form";

//redux
import { useDispatch } from "react-redux";
import {
  __deleteDictComment,
  __likeDictComment,
  __updateDictComment,
} from "../redux/modules/dictionary";
import { __deleteTrouComment, __likeTrouComment, __updateTrouComment } from "../redux/modules/touble";

//ellement & component
import Character from "./Character";
import { bold15, med14, med15 } from "../themes/textStyle";
import { CommentTextarea } from "../elements/Textarea";

//style
import styled from "styled-components";
import { AiOutlineLike } from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";

const CommentCard = (props) => {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const dispatch = useDispatch();


  //댓글 수정 클릭시 인풋 열고 닫기
  const [updateInput, setUpdateInput] = useState(false);
  const updateCmt = () => {
    setUpdateInput(!updateInput);
  };

  //댓글 인풋 글자수 count
  const [inputCount, setInputCount] = useState("0");
  const onInputChange = (e) => {
    setInputCount(e.target.value.length);
  };

  //수정 데이터 전송
  const onSubmit = (data) => {
    if (props.data.commentCount!==undefined) {
      dispatch(__updateDictComment(data, props.data.commentId));
    } else {
      dispatch(__updateTrouComment(data, props.data.commentId))
    }
    updateCmt();
  };

  //삭제 데이터 전송
  const deleteCmt = (data) => {
    console.log(data)
    if (props.data.commentCount!==undefined) {
    dispatch(__deleteDictComment(data, props.postId, props.pageNum));
    } else {
      dispatch(__deleteTrouComment(data, props.postId, props.pageNum))
    }
  };
  
  //좋아요
  const [like, setLike] = useState(false);
  const ChangeLike = () => {
    setLike(!like);
    if (props.data.commentCount!==undefined) {
      dispatch(__likeDictComment(!like, props.data.commentId));
    } else {
      dispatch(__likeTrouComment(!like, props.data.commentId));
    }
  };

  return (
    <>
      <HrLine />
      <div>
        <LoadCmtInfo>
          <CharNickBox>
            <Character char={props?.pfImg} />
            <LoadCmtNickname>{props.data?.nickname}</LoadCmtNickname>
          </CharNickBox>
          <div style={{ display: "flex", alignItems: "center" }}>
            <LoadCmtTime>
              {props.data?.commentTime}{" "}
              {props.nickname === props.data?.nickname ? (
                <>
                  <div
                    style={{ margin: "0 0.25rem", cursor: "pointer" }}
                    onClick={updateCmt}
                  >
                    수정
                  </div>{" "}
                  |{" "}
                  <div
                    style={{ margin: "0 0.25rem", cursor: "pointer" }}
                    onClick={() => {
                      deleteCmt(props.data.commentId);
                    }}
                  >
                    삭제 |
                  </div>
                </>
              ) : null}{" "}
              신고
            </LoadCmtTime>
          </div>
        </LoadCmtInfo>
        {updateInput ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CommentInputBox>
              <CommentTextarea
                ref={register}
                name="comment"
                type="text"
                onChange={onInputChange}
                maxLength="500"
                placeholder="주제와 무관한 댓글, 홍보, 욕설, 일방적인 비난이나 악플 등은 삭제될 수 있습니다."
              />
              <InputCountBox>{inputCount}/500</InputCountBox>
              <div style={{ display: "flex", justifyContent: "top" }}>
                <CommentHr width="90%" />
                <CommentSubmitBtn type="submit">등록</CommentSubmitBtn>
              </div>
            </CommentInputBox>
          </form>
        ) : (
          <LoadCmt> {props.data?.comment} </LoadCmt>
        )}
      </div>
      <div>
        {props.nickname !== props.data?.nickname ? (
          <LikeBtn onClick={ChangeLike}>
            {props.data?.commentLikeStatus === false ? (
              <AiOutlineLike style={{ cursor: "pointer", width: "1.5rem" }} />
            ) : (
              <AiTwotoneLike style={{ cursor: "pointer", width: "1.5rem" }} />
            )}
            {props.data?.commentLikeCount}
          </LikeBtn>
        ) : null}
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
const CharNickBox = styled.div`
  align-items: center;
`;
const LoadCmtNickname = styled.div`
  ${bold15}
  color: black;
  margin: 0.5rem 0 1rem 2.5rem;
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
  border: 1px solid var(--graydf);
  border-radius: 3px;
  padding: 0.7rem 0.7rem 0.7rem 0.4rem;
  height: 2rem;
  background-color: transparent;
  margin: 0 1rem 1rem 4rem;
`;
const CommentSubmitBtn = styled.button`
  background-color: var(--red);
  color: var(--white);
  width: 5rem;
  height: 3rem;
  display: right;
  border: transparent;
  border-radius: 3px;
  ${med15}
`;

const InputCountBox = styled.div`
  display: flex;
  justify-content: flex-end;
  color: var(--gray99);
  ${med14}
  margin: 0 1rem 1rem 0;
`;
const CommentHr = styled.div`
  border: 1px solid var(--graydf);
  width: 43rem;
`;

const CommentInputBox = styled.div`
  width: 100%;
  color: var(--gray99);
  border: 0.75px solid var(--gray99);
  border-radius: 3px;
  margin: 0 0 2rem 0;
`;
