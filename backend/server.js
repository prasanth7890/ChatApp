const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

PORT=4000

app.get('/', (req, res)=>{
    res.send("<h1>Hello world</h1>");
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