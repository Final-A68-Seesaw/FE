import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { __loadDictCardList, __scrapDict } from "../redux/modules/dictionary";
import { actionCreators as DictionaryActions } from "../redux/modules/dictionary";
import { history } from "../redux/configStore";

//element & component
import Header from "../components/Header";
import DictionaryCard from "../components/DictionaryCard";
import Footer from "../components/Footer";
import { bold16, bold22, bold15, med15 } from "../themes/textStyle";

//style
import styled from "styled-components";
import Line from "../asset/Dictionary_list_line.svg";

const DictList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__loadDictCardList());

    return () => dispatch(DictionaryActions.clearDict())
  }, []);

  //스크랩 기능
  const [scrap, setScrap] = useState(false);
  const ChangeScrap = (postId) => {
    setScrap(!scrap);
    dispatch(__scrapDict(!scrap, postId));
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
              return <DictionaryCard key={i} data={v} />;
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
`;
