import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Chatpage = () => {
    const [chats, setChats] = useState<any[]>([]);

    useEffect(()=>{
        fetchChats();
    }, [])

    const fetchChats = async() => {
        const {data} = await axios.get('http://localhost:4000/chats');
        console.log(data);
        setChats(data);
    }

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
