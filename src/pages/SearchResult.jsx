import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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


const DictList = () => {

    const dispatch = useDispatch();
    const dictSearchList = useSelector((state) => (state.search.list))

    const params = useParams()

    const [dicSel, setDicSel] = useState()

    useEffect(() => {
        dispatch(SearchActions.getSearchDB(params.keyword))
    }, [dictSearchList])

    return (
        <div>
            <Header />
            <Container>
                <MenuSelection>
                    <DictSelect>고민글</DictSelect>
                    <DictSelect>단어</DictSelect>

                </MenuSelection>
                <Line style={{ width: "74rem" }} />
                <CardWholeBox>
                    {dictSearchList?.map((v, i) => <DictionaryCard key={i} data={v} />)}
                </CardWholeBox>

            </Container>
            <Footer />
        </div>
    )
}

export default DictList
const Container = styled.div`
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

const CardImage = styled.div`
  width: 12rem;
  border-radius: 10px;
`
