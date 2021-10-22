

let videoBoxContainer;
let username ;

function connect(){

    const socket = io('/')
    
    
    var mypeer = new Peer(undefined,{
        path:'peerjs',
        host:'/',
        post:'3000'
        
        
    })
    console.log(name)
    mypeer.on('open',(id)=>{
        socket.emit('join-room',Room_Id,id,name)
        
    })
    
    
    const video = document.createElement('video');
    video.muted=true
    // video.autoplay=false
    const videoBox = document.getElementsByClassName('video-box')[0]
    
    function load(){
    
        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        }).then(stream=>{
            
            addvideostream(video,stream)
        
            socket.on('user-connected',(userId,name)=>{
                console.log('user-connected: '+userId+name)
                alert(`${name} joined the class`)
                videoBoxContainer=document.createElement('div')
                username = document.createElement('p').innerText=name;
                videoBoxContainer.append(username);
                connecttonewuser(userId,stream,name)
            })
        
            mypeer.on('call',call=>{
                call.answer(stream)
                const video =  document.createElement('video')
                call.on('stream',uservideosstream=>{
                    addvideostream(video,uservideosstream,videoBoxContainer)
                })
                call.on('close',()=>{
                    video.remove()
                    username.remove()
                    videoBoxContainer.remove()

                })
            })
        })
    }
    load();
    function addvideostream(video,stream){
        video.srcObject = stream
        video.addEventListener('loadedmetadata',()=>{
            video.play()
        })
        videoBoxContainer.append(video)
        videoBox.append(videoBoxContainer);
    
    }
    
    function connecttonewuser(userId,stream,name){
        const call = mypeer.call(userId,stream,name)
        const video = document.createElement('video')
        call.on('stream',uservideosstream=>{
            addvideostream(video,uservideosstream)
        })
        call.on('close',()=>{
            video.remove()
            username.remove()
            videoBoxContainer.remove()
        })
    }

    
}
connect();