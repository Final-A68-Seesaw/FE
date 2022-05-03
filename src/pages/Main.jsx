import React, { useState } from 'react'
import styled from 'styled-components'

import Mainchat from '../components/Mainchat'

const Main = () => {

  return (
    <ChatContainer>
      <Mainchat />
    </ChatContainer>
  )
}

export default Main

const ChatContainer = styled.div`
  height: 1000px;
`