import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TroubleApi } from '../api/troubleApi'
import Character from '../components/Character'
import Header from '../components/Header'

import { actionCreators as TroubleActions } from '../redux/modules/touble'

const Trouble = () => {

    const dispatch = useDispatch()
    const troubleList = useSelector((state) => (state.touble.list))

    console.log(troubleList);

    useEffect(() => {
        dispatch(TroubleActions.getTrouDB())
    }, [])

    return (
        <div>
            <Header />
            <div>
                {troubleList.map((v, i) => {
                    return <div key={i}>
                        <img src={v.imageUrls[0]} />
                        <Character char={v.profileImages}/>
                        <p>{v.title}</p>
                        <p>{v.contents}</p>
                        <p>댓글 {v.commentCount}</p>
                        <p>{v.nickname}</p>
                        <p>{v.question}</p>
                        <p>{v.answer}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Trouble