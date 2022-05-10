import React, { useState } from 'react'
import styled from 'styled-components'

import { GoSearch } from 'react-icons/go'

import Image from '../elements/Image'
import { InputText } from '../elements/Input'
import Text from '../elements/Text'

const Header = (props) => {

    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(!showModal);
    }
    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <Head>
            {showModal ?
                <ModalContainer className='slide-in-left'>
                    <div>메뉴</div>
                </ModalContainer> : null}
            <HeadInner>
                <div style={{ display: 'flex' }}>
                    <div style={{ marginRight: '30px', cursor: 'pointer' }} onClick={openModal}>🍔</div>
                    <div style={{ marginRight: '30px', cursor: 'pointer' }}>사전장</div>
                    <div style={{ marginRight: '30px', cursor: 'pointer' }}>질문장</div>
                    <div style={{ cursor: 'pointer' }}>게임장</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <SearchInput placeholder='검색어를 입력해주세요' />
                    <GoSearch style={{ margin: '0 0 0 -25px' }} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Image />
                    <div style={{ display: 'flex' }}>
                        <div>🍔</div>
                        <Text>Text</Text>
                    </div>
                </div>
            </HeadInner>
        </Head>
    )
}

export default Header

const Head = styled.div`
    background-color: yellowgreen;
    
    top: 0px;
    height: 100px;
    width: 100%;
    
    .slide-in-left {
        animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }

    @keyframes slide-in-left {
        0% {
            transform: translateX(-1000px);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .slide-out-left {
	    animation: slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
    }
    
    @keyframes slide-out-left {
        0% {
            transform: translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateX(-1000px);
            opacity: 0;
        }
    }
`

const HeadInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 36px;
`

const ModalContainer = styled.div`
    position: fixed;
    left: 10px;
    top: 110px;
    /* transform: translate(-50%, -50%); */
    max-height: 80%;
    width: 20rem;
    height: 80%;
    padding: 16px;
    background: rgba(200, 200, 200, 0.8);
    border-radius: 10px;
    text-align: center;
    
    
`;

const SearchInput = styled.input`
    height: 30px;
    border: 0px;
    padding: 0px 10px;
    
    :focus {
        outline: none;
    }
`