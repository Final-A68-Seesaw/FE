import React, { useEffect, useState } from "react";
import { dictApi } from "../api/dictApi";
import { useInfiniteQuery } from "react-query";

//redux
import { useDispatch, useSelector } from "react-redux";
import { __loadDictCardList, __scrapDict } from "../redux/modules/dictionary";
import { actionCreators as DictionaryActions } from "../redux/modules/dictionary";

//element & component
import Header from "../components/Header";
import DictionaryCard from "../components/DictionaryCard";
import Footer from "../components/Footer";
import { bold16, bold22,} from "../themes/textStyle";

//style
import styled from "styled-components";
import Line from "../asset/Dictionary_list_line.svg";


const DictList = (props) => {

  const fetchList = async (pageId = 1) => {
    const res = await dictApi.DictList(pageId);
    console.log(res)
    return res;
  };
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    "cards",
    ({ pageParam = 1 }) => fetchList(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage ? nextPage : undefined;
      },

    }
  );
console.log(data)
  useEffect(() => {
    let fetching = false;
    const onScroll = async (e) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    addEventListener("scroll", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
    };
  }, []);


  // //스크랩 기능
  // const dispatch = useDispatch();
  // const dictList = useSelector((state) => state.dictionary.list);

  // useEffect(() => {
  //   dispatch(__loadDictCardList(1));

  //   return () => dispatch(DictionaryActions.clearDict())
  // }, []);
  // const [scrap, setScrap] = useState(false);
  // const ChangeScrap = (postId) => {
  //   setScrap(!scrap);
  //   dispatch(__scrapDict(!scrap, postId));
  // };

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
          {data.pages.map((page) =>
            page.data.map((v, i) => {
              return <DictionaryCard key={i} data={v} />;
            })
          )}
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
