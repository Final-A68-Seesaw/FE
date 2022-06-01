import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component'

//redux
import { useDispatch, useSelector } from "react-redux";
import { __loadDictCardList, __scrapDict } from "../redux/modules/dictionary";
import { actionCreators as DictionaryActions } from "../redux/modules/dictionary";

//element & component
import Header from "../components/Header";
import DictionaryCard from "../components/DictionaryCard";
import Footer from "../components/Footer";
import { bold16, bold22 } from "../themes/textStyle";

//style
import styled from "styled-components";
import Line from "../asset/Dictionary_list_line.svg";

const DictList = (props) => {

  const dispatch = useDispatch()

  const dictList = useSelector((state) => state.dictionary.list);

  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(__loadDictCardList(1));

    return () => dispatch(DictionaryActions.clearDict())
  }, [])

  const getData = () => {
    let newPage = page + 1
    if (dictList.length < 30) return

    dispatch(__loadDictCardList(newPage))

    setPage(newPage)
  }

  return (
    <>
      <Header />
      <Container>
        <MenuSelection>
          <DictSelect>사전장</DictSelect>
          <Newest>최신순</Newest>
        </MenuSelection>
        <Line style={{ width: "74.5rem" }} />

        <InfiniteScroll
          dataLength={dictList.length}
          next={getData}
          hasMore={true}
        >
          <CardWholeBox>
            {dictList &&
              dictList.map((v, i) => {
                return <DictionaryCard key={i} data={v} />;
              })}
          </CardWholeBox>
        </InfiniteScroll>
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
