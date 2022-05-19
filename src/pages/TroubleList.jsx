import React, { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { __loadTrouCardList } from "../redux/modules/touble";
import { history } from "../redux/configStore";

//element & component
import Header from "../components/Header";
import Footer from "../components/Footer";
import { bold16, bold22, bold15, med15, med18 } from "../themes/textStyle";

//style
import styled from "styled-components";
import Line from "../asset/Dictionary_list_line.svg";
import Arrow from "../asset/Trouble_arrow.svg"
import TroubleDetail from "./TroubleDetail";
import Character from "../components/Character";

const TroubleList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__loadTrouCardList());
  }, []);

  const troubleList = useSelector((state) => state.trouble.list);

  console.log(troubleList);

  return (
    <>
      <Header />
      <Container>
        <MenuSelection>
          <DictSelect>질문장</DictSelect>
          <Newest>최신순</Newest>
        </MenuSelection>
        <Line style={{ width: "74.5rem" }} />
        <CardWholeBox>
            {troubleList.map((v, i) => {
              return (
                <div key={i} style={{ margin: "0.5rem" , cursor:"pointer"}}
                onClick={() => history.push(`/trouble/detail/${v.troubleId}`)}
                >
                <WordCard>
                    <GenBox>
                <GenerationTag> {v.answer} </GenerationTag>
                <Arrow/>
                <GenerationTag> {v.question} </GenerationTag>
                </GenBox>
                  <CardTitle>{v.title}</CardTitle>
                  <ViewCountBox>
                      <div>조회수 {v.views}</div>
                      <div>댓글 {v.commentCount} </div>
                    </ViewCountBox>
                
                </WordCard>
                <img src={v.troubleImages[0]}
                style={{
                    display: "flex",
                    width: "223px",
                    height: "320px",
                    borderRadius: "10px",
                  }}/>

                </div>
              );
            })}
        </CardWholeBox>
      </Container>
      <Footer />
    </>
  );
};

export default TroubleList;

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
`;
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