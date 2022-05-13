import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { actionCreators as TroubleActions } from '../redux/modules/touble'
import Button from '../elements/Button'
import { history } from '../redux/configStore'

const TroubleDetail = (props) => {

    const params = useParams()
    const dispatch = useDispatch()
    const TroubleDetailList = useSelector((state) => state.trouble.detail)

    const delTrouble = () => {
        dispatch(TroubleActions.delTrouDB(params.id))
    }

    const setTrouble = () => {
        history.push(`/troublewrite/${params.id}`)
    }

    useEffect(() => {
        dispatch(TroubleActions.getTrouDetailDB(params.id))

        return () => { dispatch(TroubleActions.clearDetail()) }
    }, [])

    return (
        <div>
            {TroubleDetailList ?
                <div style={{paddding:'74px 0'}}>
                    <Button onClick={delTrouble}>삭제</Button>
                    <Button onClick={setTrouble}>수정</Button>
                    <p>{TroubleDetailList.title}</p>
                    <p>{TroubleDetailList.contents}</p>
                    <p>{TroubleDetailList.question}</p>
                    <p>{TroubleDetailList.answer}</p>
                    <p>{TroubleDetailList.imageUrls.map((v, i) => {
                        return <img key={i} src={v} style={{ width: '200px', height: '200px' }} />
                    })}</p>
                    <div>{TroubleDetailList.tagName.map((v, i) => {
                        return <p key={i}>{v}</p>
                    })}</div>
                </div>
                : null}
        </div>
    )
}

export default TroubleDetail

const TroubleImage = styled.img`
    
`