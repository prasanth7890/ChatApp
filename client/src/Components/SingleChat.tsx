import { Box, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import {IconButton} from "@chakra-ui/button"
import { clearSelectedChat } from "../Features/selectedchats";
import { getSender, getSenderFull } from "../ts/chatLogic";
import ProfileModal from "./miscellaneous/ProfileModal";

const SingleChat = (props: {fetchApi: boolean, setfetchApi: any}) => {
    const user = useSelector((state:any)=>state.user.value);
    const selectedchat = useSelector((state:any)=> state.selectedChat.selectedChat);
    const dispatch = useDispatch();

  return (
    <>
    {selectedchat._id ? (
        <>
            <Text
                fontSize={{base: '28px', md: '30px'}}
                pb={3}
                px={2}
                w={'100%'}
                display={'flex'}
                justifyContent={{base: "space-between"}}
                alignItems={'center'}
            >
                <IconButton onClick={()=> dispatch(clearSelectedChat())} aria-label="go back" display={{base: 'flex', md: 'none'}} icon={<i className="fa-regular fa-hand-point-left"></i>}/>
                {selectedchat.isGroupChat ? (
                    // if groupchat
                    <>
                        <p style={{fontSize: '25px'}}>{selectedchat.chatName.toUpperCase()}</p>
                    </>
                ) : (
                    <>
                        <div style={{fontSize: '25px'}}>{getSender(user, selectedchat.users)}</div>
                        <ProfileModal user={getSenderFull(user, selectedchat.users)} />
                    </>
                )}
            </Text>
            <Box
                display={'flex'}
                flexDir={'column'}
                justifyContent={'flex-end'}
                bg={'greenyellow'}
                p={3}
                w={'100%'}
                h={'100%'}
                borderRadius={'lg'}
                overflow={'hidden'}
            >
                
            </Box>

        </>
    ) : (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} h='100%'>
            <Text fontSize={'xl'} pb={3}>
                Click on a user to start chatting
            </Text>
        </Box>
    )}
    </>
  )
}

export default SingleChat
