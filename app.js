const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app);
const io = require('socket.io')(server);
const {v4:uuidV4} = require('uuid')
const {ExpressPeerServer} = require('peer')
const usersmodel = require('./db/models/users');
const peerServer = ExpressPeerServer(server,{
    debug:true,
})
app.use('/peerjs',peerServer)
const PORT = process.env.PORT||8000

app.use(express.static('public'))
app.set('view engine','ejs')
require('./db/connection');
var users = [];

app.use(express.json())




// app.get('/join',async(req,res)=>{
//     res.redirect(`${uuidV4()}`)
// })

app.get("/",(req,res)=>{
    res.render('index',{
        res:req.query.res
    })
})
app.post('/create',async(req,res)=>{
    console.log(req.body)

    const password = req.body.password;
    const cpassword = req.body.cpassword;

    console.log(req.body);

    if(password==cpassword){

        const roomid = uuidV4()

        const user = usersmodel({
            name:req.body.name,
            roomName:req.body.roomName,
            email:req.body.email,
            password:password,
            roomid:roomid
        });

        try{

            const userCreated = await user.save()
            console.log('user saved :'+userCreated );
            res.json(userCreated);
        }catch{err=>{
            console.log(err);
        }}





    }


})


app.get('/join/:roomid',async(req,res)=>{
    
    
    let roomid = req.params.roomid;
    let password = req.query.password;
    console.log(password);

    try{


        const user = await usersmodel.findOne({
            roomid:roomid
        })
        console.log(user)
        if(user.password===password){
            console.log('login')
            res.render('class',{
                roomId:roomid,
                teacher:user.name
            })
        }else{
            console.log('wrong password')
            res.redirect('/?res=invalid credentials');
        }
    
    
    }catch{err=>{
        // res.send(err).status(404)
        console.log('invalid credentials')
        res.redirect('/?res=invalid credentials');

    }
    }



    // let name = req.query.name
    // console.log(req.query.name)

})



io.on('connection',(socket)=>{
    console.log('user connected')
    socket.on('join-room',(roomId,userId,name)=>{
        console.log(name +'joined room:'+roomId);
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
            socket.to(roomId).emit('user-disconnected',userId,name);
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
    users = users.filter(user=>user.userId!=userId);

}

function getallusers(roomId){
    return users.filter(user=>user.roomId==roomId)
}

server.listen(PORT,()=>{
    console.log(`server is listenning at http://localhost:${PORT}`)
}) 