import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { actionCreators as TroubleActions } from '../redux/modules/touble'

const TroubleDetail = (props) => {

    const params = useParams()
    const dispatch = useDispatch()
    const TroubleDetailList = useSelector((state) => state.trouble.detail)

    console.log(TroubleDetailList)

    useEffect(() => {
        dispatch(TroubleActions.getTrouDetailDB(params.id))
    }, [])

    return (
        <div>
            {TroubleDetailList ?
                <div>
                    <p>{TroubleDetailList.title}</p>
                    <p>{TroubleDetailList.content}</p>
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