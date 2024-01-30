import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setChats } from '../../Features/chats';
import { setSelectedChat } from '../../Features/selectedchats';
import axios from 'axios';
import { ChatsType, userType } from '../../ts/configs';
import ChatLoading from '../ChatLoading';
import { getSender } from '../../ts/chatLogic';
import GroupChatModal from './GroupChatModal';

const MyChats = (props: { fetchAgain: boolean }) => {

  const initUser = {
    _id: "",
    name: "",
    pic: "",
    email: "",
  }

  const [loggedUser, setLoggedUser] = useState<userType>(initUser);

  const dispatch = useDispatch();
  
  const user = useSelector((state:any) => state.user.value);
  const selectedchat = useSelector((state:any)=> state.selectedChat);
  const chats = useSelector((state:any) => state.chats);

  const toast = useToast();
  
  useEffect(()=>{
    const fetchChats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
  
        const {data} = await axios.get('http://localhost:4000/chats', config);
        dispatch(setChats(data as ChatsType[]));  

      } catch (error:any) {
        toast({
          title: "Error Occured!",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: 'bottom-left',
        });
      }
    };

    setLoggedUser(user);
    fetchChats();
  }, [props.fetchAgain]);

  return (
    <Box
      display={{base: selectedchat.selectedChat._id !== "" ? "none" : "flex", md: "flex"}}
      flexDir={"column"}
      alignItems={'center'}
      p={3}
      bg={'white'}
      w={{base: '100%', md: '28%'}}
      borderRadius='lg'
      borderWidth='1px'
    >
      <Box
        pb={3}
        px={3}
        fontSize={{base: '28px', md: '30px'}}
        display={'flex'}
        w={'100%'}
        justifyContent={"space-between"}
        alignItems={'center'}
      >My Chats
      <GroupChatModal> 
        <Button
          display={'flex'}
          fontSize={{base: '17px', md: '10px', lg:'17px'}}
        >
          New Group Chat
        </Button>
      </GroupChatModal>
      </Box>

      <Box
        display={'flex'}
        flexDir={'column'}
        p={3}
        bg={'#F8F8F8'}
        w={'100%'}
        h={'100%'}
        borderRadius={'lg'}
        overflowY={'hidden'}
      >
        {chats?(
          <Stack overflowY={'scroll'}>
            {chats.map((chat:any) => (
              <Box
                onClick={function() {
                  dispatch(setSelectedChat(chat));
                }}
                cursor={'pointer'}
                bg={selectedchat.selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedchat.selectedChat === chat ? 'white': 'black'}
                px={3}
                py={2}
                borderRadius={'lg'}
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat?(
                    // <h1>test</h1>
                    getSender(loggedUser, chat.users)
                  ):(chat.chatName)}
                </Text>
              </Box>
            ) )}
          </Stack>
        ): (
          <ChatLoading />
        )}
      </Box>

    </Box>
  )
}

export default MyChats;
