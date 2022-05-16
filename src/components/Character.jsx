import React from 'react'
import styled from 'styled-components'

const Character = (props) => {

    let CharParts = props.char

    return (
        <div>
            {CharParts && CharParts.map((v, i) => {
                return <div key={i}>
                    <CharImg src={v.profileImage} style={{ zIndex: `${CharParts.length - i}` }} size={props.size} />
                </div>
            })}
        </div>
    )
}

export default Character

const CharImg = styled.img`
    position: absolute;

    ${(props) => props.size ? `width: ${props.size}; height:${props.size}` : 
        `width: 2rem;`};

    border-radius: 3px;
`