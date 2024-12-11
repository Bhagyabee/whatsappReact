import React, { useState } from 'react'
import Header from './Header'
import { Box } from '@mui/material'
import { useContext } from 'react'
import Searchbar from './Searchbar'
import Conversation from './Conversation'
import HeaderOptions from './HeaderOptions'

const Menu = () => {
  const [text,setText]= useState('');
  return (
   <Box>
    <Header/>
    <Searchbar setText={setText}/>
    <HeaderOptions/>
    <Conversation text={text}/>
   </Box>
  )
}

export default Menu
