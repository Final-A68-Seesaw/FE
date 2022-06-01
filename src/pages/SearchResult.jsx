import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { __loadDictCardList } from '../redux/modules/dictionary'
import { actionCreators as SearchActions } from '../redux/modules/search'

//element & component
import Header from '../components/Header'
import Footer from '../components/Footer'

//style
import styled from 'styled-components'
import Result0 from '../asset/Result0.svg'
import ResultCard from '../components/ResultCard'


const DictList = () => {

    const dispatch = useDispatch();
    const dictSearchList = useSelector((state) => (state.search.list))

    const params = useParams()

    useEffect(() => {
        dispatch(SearchActions.getSearchDB(params.keyword))
    }, [params.keyword])

    return (
        <div>
            <Header />
            <Container>
                {dictSearchList ?
                    <CardWholeBox>
                        {dictSearchList?.map((v, i) => <ResultCard key={i} data={v} />)}
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
