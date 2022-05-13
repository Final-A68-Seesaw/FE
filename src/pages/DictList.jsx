import React, {useEffect} from 'react'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { __loadDictCardList } from '../redux/modules/dictionary'

//element & component
import Header from '../components/Header'
import DictionaryCard from '../components/DictionaryCard'

//style
import styled from 'styled-components'
import Line from '../asset/Dictionary_list_line.svg'
import { bold16, bold22, bold15, med15 } from '../themes/textStyle'

const DictList = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(__loadDictCardList());
    },[]);
    
    const dictList = useSelector((state) => state.dictionary.list);
    console.log(dictList);
  return (
    <div>
        <Header/>
        <Container>
          <MenuSelection>
          <DictSelect>사전장</DictSelect>
          <Newest>최신순</Newest>
          </MenuSelection>
          <Line style = {{width: "74rem"}}/>
          <CardWholeBox>
          {dictList && dictList.map ((v,i)=>{
            return(
              <div key={i}>
             <WordCard 
             onClick = {() => {history.push(`/dictionary/detail/1`)}}>
              
              
              <GenerationBox> {v.generation} </GenerationBox>
               <CardTitle>{v.title}</CardTitle>
               <CardContents>{v.contents}</CardContents>
               <ViewCountBox><div>조회수 {v.views}</div>
               <div>스크랩 {v.scrapCount} </div></ViewCountBox>
              {/* {v.postImages} */}
             </WordCard>
                
              </div>
            )
          })}
          </CardWholeBox>
        </Container>
    </div>
  )
}

export default DictList
const Container = styled.div`
  margin: auto;
  max-width: 75rem;
`;
const MenuSelection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4rem 0 0 0 ;
  max-width: 75rem;
`
const DictSelect = styled.div`
${bold22}

`
const Newest = styled.div`
${bold16}
`
const CardWholeBox = styled.div`
display: flex;
flex-wrap: wrap;
max-width: 75rem;
margin-top: 2rem;

`
const WordCard = styled.div`
width: 12rem;
height: 17rem;
border-radius: 10px;
color:var(--white);
background: linear-gradient(180deg, rgba(18, 0, 44, 0.39) 41.15%, #1B0042 80.21%);
margin: 0.5rem;
padding: 1rem;

`

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
  margin-bottom: 8rem;
  ${bold15}
 
`;

const CardTitle = styled.div`
${bold22}
margin-bottom: 1rem;
`
const CardContents = styled.div`
  ${med15}
  color: #AAAAAA;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  line-height: 1.2;
  height: 2.3rem;
`
const ViewCountBox = styled.div`
color: #555555;
${med15}
margin: 1rem 0.5rem 1rem 0;
display: flex;
justify-content: space-between;
`
