const express=require('express')
const app=express();

const http=require('http') // http is a part of node like path so not to install
const server=http.createServer(app) // http.createserver accepts request listner
const path=require('path')
const socketio=require('socket.io')
const io=socketio(server);   // object

app.use('/',express.static(path.join(__dirname,'public')))

const users=[];


io.on('connection',(socket)=>{
    console.log(`connection estabished at ${socket.id}`)

    socket.on('send-mssg',(data)=>{
        // console.log(data.msgText);
        io.emit('received-mssg',{   // emit to show the message make by user itself
            msg:data.msgText,
            id:socket.id,
            username:users[socket.id]
        })
    })

    socket.on('login',(data)=>{
       users[socket.id]=data.username;
    })
})










const port=process.env.PORT||3000;

server.listen(port,()=>{
    console.log(`server connected at ${port}`)
})