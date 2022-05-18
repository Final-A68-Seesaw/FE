import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { __loadDictCardList, __scrapDict } from "../redux/modules/dictionary";
import { history } from "../redux/configStore";

//element & component
import Header from "../components/Header";
import DictionaryCard from "../components/DictionaryCard";
import Footer from "../components/Footer";
import { bold16, bold22, bold15, med15 } from "../themes/textStyle";

//style
import styled from "styled-components";
import Line from "../asset/Dictionary_list_line.svg";
import { BsSuitHeart } from "react-icons/bs";
import { BsSuitHeartFill } from "react-icons/bs";

const DictList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__loadDictCardList());
  }, []);

  //스크랩 기능
  const [scrap, setScrap] = useState(false);
  const ChangeScrap = (postId) => {
    setScrap(!scrap);
    dispatch(__scrapDict(!scrap,postId));
  };

  const dictList = useSelector((state) => state.dictionary.list);

  return (
    <>
      <Header />
      <Container>
        <MenuSelection>
          <DictSelect>사전장</DictSelect>
          <Newest>최신순</Newest>
        </MenuSelection>
        <Line style={{ width: "74.5rem" }} />
        <CardWholeBox>
          {dictList &&
            dictList.map((v, i) => {
              return (
                <div key={i} style={{ margin: "0.5rem" }}>
                  <WordCard>
                    <GenScrapBox>
                      <GenerationBox> {v.generation} </GenerationBox>
                      <ScrapBtn onClick={()=>{ChangeScrap(v.postId)}}>
                        {v.scrapStatus === false ? (
                          <BsSuitHeart
                            style={{ cursor: "pointer", width: "1rem" }}
                          />
                        ) : (
                          <BsSuitHeartFill
                            style={{ cursor: "pointer", width: "1rem" }}
                          />
                        )}
                      </ScrapBtn>
                    </GenScrapBox>
                    <div onClick={() => {
                      history.push(`/dictionary/detail/${v.postId}`);
                    }} style = {{cursor: "pointer"}}>
                    <CardTitle>{v.title}</CardTitle>
                    <CardContents>{v.contents}</CardContents>
                    <ViewCountBox>
                      <div>조회수 {v.views}</div>
                      <div>스크랩 {v.scrapCount} </div>
                    </ViewCountBox>
                    </div>
                  </WordCard>
                  <img
                    src={v.postImages}
                    style={{
                      display: "flex",
                      width: "223px",
                      height: "320px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              );
            })}
        </CardWholeBox>
      </Container>
      <Footer />
    </>
  );
};

export default DictList;
const Container = styled.div`
  margin: auto;
  max-width: 75rem;
  padding-top: 5rem;
`;
const MenuSelection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4rem 0 0 0;
  max-width: 75rem;
`;
const DictSelect = styled.div`
  ${bold22}
  margin-left: 1rem;
`;
const Newest = styled.div`
  ${bold16}
  margin-right: 2rem;
`;
const CardWholeBox = styled.div`
display: flex;
flex-wrap: wrap;
max-width: 75rem;
margin-top: 2rem;
`
const CardImage = styled.div`
  width: 12rem;
  border-radius: 10px;
`
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
