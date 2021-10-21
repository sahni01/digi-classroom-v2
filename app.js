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








app.get('/join',async(req,res)=>{
    res.redirect(`${uuidV4()}`)
})

app.get('/join/:roomId/:name',(req,res)=>{

    let name = req.query.name
    res.render('class',{
        roomId:req.params.roomId,
        name:req.params.name
    })

})


io.on('connection',(socket)=>{
    console.log('user connected')
    socket.on('join-room',(roomId,userId)=>{
        console.log(roomId);
        socket.join(roomId)
        console.log(userId)
        socket.to(roomId).emit('user-connected',userId)
        console.log(roomId,userId)
    })
})



server.listen(PORT,()=>{
    console.log(`server is listenning at http://localhost:${PORT}`)
})