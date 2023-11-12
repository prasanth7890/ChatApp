import { useEffect, useState } from 'react';
import './App.css';
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(()=>{
    socket.on("receive_message", (data)=>{
      setReceivedMessage(data.message);
    });
  }, [socket]);

  const sendMessage = ()=> {
    socket.emit("send_message", { message });
  }


  return (
    <div className="App">
      <h1>Hello world</h1>
      <input type="text" onChange={(event)=>setMessage(event.target.value)} placeholder='Message...' />
      <button onClick={sendMessage}>Send Message</button>
      <h2>{receivedMessage}</h2>
    </div>
  );
}

export default App;
