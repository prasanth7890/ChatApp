import { useEffect } from 'react';
import './App.css';
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {
  useEffect(()=>{
    socket.on("receive_message", (data)=>{
      alert(data.message);
    });
  }, [socket]);

  const sendMessage = ()=> {
      socket.emit("send_message", {
        "message": `Hello from client: ${socket.id}` 
      });
  }


  return (
    <div className="App">
      <h1>Hello world</h1>
      <input type="text" placeholder='Message...' />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
