const express = require("express");
require('dotenv').config({path: "../.env"});
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/db");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const chats = require("./data/data");
const userRoutes = require('./routers/userRoutes');

connectDB();
app.use(cors());
app.use(express.json());
app.use("/", userRoutes);

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"]
//     },
// });


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


// // connection event
// io.on('connection', (socket)=>{
//     console.log(`a user connected: ${socket.id}`);
    
//     socket.on("send_message", (data)=>{
//         console.log(data);
//         socket.broadcast.emit("receive_message", data);
//     })

// })

const PORT = process.env.PORT;

server.listen(PORT, ()=>{
    console.log(`Server Connected to: ${PORT}`);
})