import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SearchResult = () => {

    const params = useParams()

    console.log(params);

    useEffect(() => {
        
    }, [])

    return (
        <div>SearchResult</div>
    )
}

export default SearchResult