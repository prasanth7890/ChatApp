const express = require("express");
const dotenv = require('dotenv')
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const chats = require("./data/data");

dotenv.config();
const PORT = process.env.PORT;


app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});


app.get('/', (req, res)=>{
    res.send("<h1>Hello world</h1>");
});

app.get('/chats', (req, res)=>{
    res.json(chats);
});

app.get('/chats/:id', (req, res)=>{
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});


// connection event
io.on('connection', (socket)=>{
    console.log(`a user connected: ${socket.id}`);
    
    socket.on("send_message", (data)=>{
        console.log(data);
        socket.broadcast.emit("receive_message", data);
    })

})


server.listen(PORT, ()=>{
    console.log(`Server Connected to: ${PORT}`);
})