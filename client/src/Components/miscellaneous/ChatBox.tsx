import { setSelectedChat } from '../../Features/selectedchats';
import { useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { useSelector } from "react-redux";
import SingleChat from '../SingleChat';

const ChatBox = (props: {fetchAgain: boolean, setfetchAgain: any}) => {
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
        <SingleChat fetchApi={props.fetchAgain} setfetchApi={props.setfetchAgain}/>
    </Box>
  )
}   

export default ChatBox;
