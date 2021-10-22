const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app);
const io = require('socket.io')(server);
const {v4:uuidV4} = require('uuid')
const {ExpressPeerServer} = require('peer')

const peerServer = ExpressPeerServer(server,{
    debug:true,
})
app.use('/peerjs',peerServer)
const PORT = process.env.PORT||3000

app.use(express.static('public'))
app.set('view engine','ejs')

let users = [];






// app.get('/join',async(req,res)=>{
//     res.redirect(`${uuidV4()}`)
// })

app.get('/join/:roomId',(req,res)=>{

    // let name = req.query.name
    // console.log(req.query.name)
    res.render('class',{
        roomId:req.params.roomId,
        name:req.query.name
    })

})



io.on('connection',(socket)=>{
    console.log('user connected')
    socket.on('join-room',(roomId,userId,name)=>{
        console.log(roomId,name);
        socket.join(roomId);
        // console.log(userId,name)
        adduser(roomId,userId,name);
        console.log(users);
        socket.to(roomId).emit('user-connected',userId,name);
        // console.log(roomId,userId,name)
        io.to(roomId).emit('all-users',getallusers(roomId));
        socket.on("disconnect",()=>{
            socket.leave(roomId);
            deleteuser(userId);
            console.log('user-disconnected'+userId)
            io.to(roomId).emit('all-users',getallusers(roomId));

        })
    })
})

function adduser(roomId,userId,name){

    users.push({
        roomId:roomId,
        userId:userId,
        name:name,
    })

}

function deleteuser(userId){
    users = users.filter(user=>users.userId!=userId);

}

function getallusers(roomId){
    return users.filter(user=>user.roomId==roomId)
}

server.listen(PORT,()=>{
    console.log(`server is listenning at http://localhost:${PORT}`)
})