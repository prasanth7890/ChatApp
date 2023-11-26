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
const chatRoutes = require('./routers/chatRoutes');
const {notFound, errorHandler} = require("./midddlewares/errorMiddleware");

connectDB();
app.use(cors());
app.use(express.json());
app.use("/", userRoutes);
app.use('/chats', chatRoutes);
app.use(notFound);
app.use(errorHandler);

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"]
//     },
// });





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