import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { __loadDictCardList } from '../redux/modules/dictionary'
import { history } from '../redux/configStore'
import { actionCreators as SearchActions } from '../redux/modules/search'

//element & component
import Header from '../components/Header'
import DictionaryCard from '../components/DictionaryCard'
import Footer from '../components/Footer'

//style
import styled from 'styled-components'
import Line from '../asset/Dictionary_list_line.svg'
import { bold16, bold22, bold15, med15 } from '../themes/textStyle'
import Result0 from '../asset/Result0.svg'


const DictList = () => {

    const dispatch = useDispatch();
    const dictSearchList = useSelector((state) => (state.search.list))

    const params = useParams()

    console.log(params, dictSearchList);

    const [dicSel, setDicSel] = useState()

    useEffect(() => {
        dispatch(SearchActions.getSearchDB(params.keyword))
    }, [params.keyword])

    return (
        <div>
            <Header />
            <Container>
                {/* <MenuSelection>
                    <DictSelect>고민글</DictSelect>
                    <DictSelect>단어</DictSelect>

                </MenuSelection>
                <Line style={{ width: "74rem", margin: '14px' }} /> */}

                {dictSearchList ?
                    <CardWholeBox>
                        {dictSearchList?.map((v, i) => <DictionaryCard key={i} data={v} />)}
                    </CardWholeBox>
                    : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '106px auto 0 auto' }} >
                        <Result0 />
                        <NoResultMsg>아직 등록된 정보가 없습니다!
                            단어를 추가해주세요
                        </NoResultMsg>
                    </div>}

            </Container>
            
            <div style={{ width: '100%', position: dictSearchList?.length > 10 ? 'relative' : 'absolute', bottom: '0px' }}>
                <Footer />
            </div>
        </div>
    )
}

export default DictList
const Container = styled.div`
    display: flex;
    flex-direction: column;
  margin: auto;
  max-width: 75rem;
  padding-top: 5rem;
`;
const MenuSelection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem 0 0 0 ;
  max-width: 75rem;
`
const DictSelect = styled.div`
${bold22}
margin-left: 1rem;

`
const Newest = styled.div`
${bold16}
margin-right: 2rem;
`
const CardWholeBox = styled.div`
display: flex;
flex-wrap: wrap;
max-width: 75rem;
margin-top: 2rem;

`

const NoResultMsg = styled.p`
    width: 242px;
    margin-top: 20.78px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #222222;
`

const CardImage = styled.div`
  width: 12rem;
  border-radius: 10px;
`
