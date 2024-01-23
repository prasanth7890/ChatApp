import React from 'react'
import { setSelectedChat } from '../../Features/selectedchats';
import { useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { useSelector } from "react-redux";

const ChatBox = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state:any) => state.selectedChat.selectedChat)


  return (
    <Box 
      display={{base: selectedChat._id !== "" ? "flex": "none", md: "flex"}}
      alignItems={'center'}
      flexDir={'column'}
      p={3}
      bg={'white'}
      w={{base: '100%', md: "68%"}}
      borderRadius={'lg'}
      borderWidth={'1px'}
    >
        Chat Box Here
    </Box>
  )
}   

export default ChatBox;
