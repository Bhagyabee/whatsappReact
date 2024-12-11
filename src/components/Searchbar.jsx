import { Search as SearchIcon } from '@mui/icons-material'
import { Box, InputBase,styled } from '@mui/material'
import React from 'react'

const Component = styled(Box)`
background:#fff;

height:45px;
display:flex;
align-items:center;
`
const Wrapper = styled(Box)`
background-color:#f0f2f5;
position:relative;
margin:0 13px;
height:39px;
width:100%;
border-radius:10px;
`
const Icon = styled(Box)`
position: absolute;
height:100%;
padding: 9px 20px;
color:#919191;
`
const InputField = styled(InputBase)`
  width:100%;
  padding:20px;
  height:15px;
  padding-left:75px;
  font-size:16.5px;
`
function Searchbar({setText}) {
  return (
   <Component>
    <Wrapper>
      <Icon>
        <SearchIcon 
        fontSize='small'/>

      </Icon>
      <InputField
      placeholder='Search'
      onChange={(e)=> setText(e.target.value)}></InputField>
    </Wrapper>
   </Component>
  )
}

export default Searchbar
