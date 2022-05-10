import React, { useEffect } from 'react'
import { TroubleApi } from '../api/troubleApi'
import Header from '../components/Header'

const Trouble = () => {

    useEffect(() => {
        TroubleApi.troubleget().then((res) => console.log(res))
    }, [])

    return (
        <div>
            <Header />
        </div>
    )
}

export default Trouble