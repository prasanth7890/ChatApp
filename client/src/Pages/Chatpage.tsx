import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Flex } from '@chakra-ui/react';
import SideBar from '../Components/miscellaneous/SideBar';
import { useDispatch } from 'react-redux';
import { login } from '../Features/user';
import MyChats from '../Components/miscellaneous/MyChats';
import ChatBox from '../Components/miscellaneous/ChatBox';

const Chatpage:React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state:any)=>state.user.value);
    const [fetchAgain, setfetchAgain] = useState(false);
    
    useEffect(()=>{
        const data = localStorage.getItem("userInfo");
        if (!data) {
            navigate("/");
        } else {
          dispatch(login(JSON.parse(data)));
        }
    }, []);
  

  return (
    <div style={{width: "100%"}}>
      {user && <SideBar/>}
      <Box 
        display={'flex'}
        justifyContent={'space-between'}
        width={'100%'}
        height={'91.5vh'}
        padding={'10px'}
      >
        {user && <MyChats fetchAgain={fetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />}
      </Box>
    </div>
  )
}

export default Chatpage
