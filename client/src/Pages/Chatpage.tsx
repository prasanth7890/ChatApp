import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Chatpage:React.FC = () => {
    const [chats, setChats] = useState<any[]>([]);
    const navigate = useNavigate();
    
    const fetchChats = async() => {
        const {data} = await axios.get('http://localhost:4000/chats');
        console.log(data);
        setChats(data);
    }

    useEffect(()=>{
        fetchChats();

        const data = localStorage.getItem("userInfo");
        if (!data) {
            navigate("/");
        }
    }, []);


  return (
    <div>
      This is chatpage
      {chats.map((chat)=>{
        return <div key={chat._id}>{chat.chatName}</div>
      })}
    </div>
  )
}

export default Chatpage
