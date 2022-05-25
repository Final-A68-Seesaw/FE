import React, { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { history } from "../redux/configStore";
import { __scrapDict } from "../redux/modules/dictionary";
import { __scrapMyPage } from "../redux/modules/mypage";

//element & component
import { bold15, bold22, med15 } from "../themes/textStyle";

//style
import styled from "styled-components";
import { BsSuitHeart } from "react-icons/bs";
import { BsSuitHeartFill } from "react-icons/bs";

const DictionaryCard = (props) => {
  const dispatch = useDispatch();


  //스크랩 기능
  const [scrap, setScrap] = useState(false);
  const ChangeScrap = (postId) => {
    setScrap(!scrap);
    if(props.data.mainImage){
      dispatch(__scrapMyPage(!scrap, postId))
    } else {
      dispatch(__scrapDict(!scrap, postId));
    } 
  };

  return (
    <div style={{ margin: "0.5rem" }}>
      <WordCard
        onClick={() => {
          history.push(`/dictionary/detail/${props.data.postId}`);
        }}
      >
        <GenScrapBox>
          <GenerationBox> {props.data.generation} </GenerationBox>

          <ScrapBtn
            onClick={(e) => {
              console.log(props.data)
              ChangeScrap(props.data.postId);
              e.stopPropagation();
            }}
          >
            {props.data.scrapStatus === false ? (
              <BsSuitHeart style={{ cursor: "pointer", width: "1rem" }} />
            ) : (
              <BsSuitHeartFill style={{ cursor: "pointer", width: "1rem" }} />
            )}
          </ScrapBtn>
        </GenScrapBox>

        <CardTitle>{props.data.title}</CardTitle>
        <CardContents>{props.data.contents}</CardContents>
        <ViewCountBox>
          <div>조회수 {props.data.views}</div>
          <div>스크랩 {props.data.scrapCount} </div>
        </ViewCountBox>
      </WordCard>
      <img
        src={
          props.data.postImages || props.data.postImage || props.data.mainImage
        }
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

export default DictionaryCard;

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

  cursor: pointer;
`;
const GenScrapBox = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin: 1rem 0 8rem 1rem;
`;
const GenerationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2rem;
  background-color: transparent;
  border-radius: 40px;
  border: 3px solid var(--white);
  color: white;
  ${bold15}
`;

const ScrapBtn = styled.div`
  margin-right: 1.2rem;
`;

const CardTitle = styled.div`
  ${bold22}
  margin: 0 0 1rem 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const CardContents = styled.div`
  ${med15}
  color: #AAAAAA;
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
  line-height: 1.2;
  height: 2.3rem;
  margin: 0 1rem 0 1rem;
`;
const ViewCountBox = styled.div`
  color: #555555;
  ${med15}
  margin: 0 0.5rem 0.5rem 0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;
