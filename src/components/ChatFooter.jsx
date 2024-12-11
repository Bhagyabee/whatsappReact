import React, { useState } from 'react'
import { useEffect } from 'react';

import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';

const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;

const ClipIcon = styled(AttachFile)`
    transform: 'rotate(40deg)'
`;

const ChatFooter = ({sendText}) => {
    const [text,setText]= useState('')
  return (
   <Container>
    <EmojiEmotions/>
    <AttachFile/>
    <Search>
      <InputField
      placeholder='Type a message'
      onChange={(e)=>setText(e.target.value)}
      
      />
    </Search>
    <Mic/>
   </Container>
  )
}

export default ChatFooter
