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

io.on('connection',(socket)=>{
    socket.emit("me",socket.id);
    console.log("user is now connected",socket.id)

    socket.on('join-room',({emailId,username,roomId})=>{
        console.log(`User with emailid ${emailId} joined and name ${username}`)
        onlineuser.set(emailId,socket.id)
        console.log(onlineuser)
        socket.join(roomId)
        socket.emit("approved-joining",{roomId})
        socket.broadcast.to(roomId).emit("user-joined",`User with emailId ${emailId} has connected`)
    })
 
    socket.on("calluser",({signaldata,from, to,client})=>{
        io.to(to).emit("calluser",{signal:signaldata,from,client})
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit("Call Ended")
    })

    socket.on("answercall",(data)=>{
        io.to(data.to).emit("call accepted",data.signal);
    })
})

server.listen(port,()=>{
    console.log(`Port is listening on ${port}`)
})