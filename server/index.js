require('dotenv').config();
const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const bodyParser=require("body-parser")
const port = process.env.PORT || 6000;
const {Server} = require("socket.io")
const io =new Server(server,{
    cors:{
        origin:"*"
        
    }
});

app.use(cors());
app.use(bodyParser.json())

app.get('/',(req,res)=>{
   res.send("helllocvxvcx")
})


const onlineuser=new Map();
const sockettoemailmapping=new Map();

io.on('connection',(socket)=>{
    socket.emit("me",socket.id);
    console.log("user is now connected",socket.id)

    socket.on('join-room',({emailId,username,roomId})=>{
        console.log(`User with emailid ${emailId} joined and name ${username}`)
        onlineuser.set(emailId,socket.id)
        sockettoemailmapping.set(socket.id,emailId)
        socket.join(roomId)
        socket.emit("approved-joining",{roomId})
        socket.broadcast.to(roomId).emit("user-joined",{emailId})
    })
 
    socket.on("call-user",(data)=>{
        const {emailId,offer}=data;
        const to = onlineuser.get(emailId);
        const from = sockettoemailmapping.get(socket.id)
        socket.to(to).emit("incoming-call",{from,offer})
    })

    socket.on("call-accepted",(data)=>{
        const {ans,from}=data;
        const socketid=onlineuser.get(from);
        socket.to(socketid).emit("call-accepted",{ans})

    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit("Call Ended")
    })

})

server.listen(port,()=>{
    console.log(`Port is listening on ${port}`)
})