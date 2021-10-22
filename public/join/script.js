



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
    
    const videoBoxContainer=document.createElement('div');
    const username = document.createElement('p') ;
    username.innerText=name
    const video = document.createElement('video');
    video.muted=true
    // video.autoplay=false
    const videoBox = document.getElementsByClassName('video-box')[0]
    
    function load(){
    
        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        }).then(stream=>{
            videoBoxContainer.append(username)
            addvideostream(video,stream,videoBoxContainer)
        
            socket.on('user-connected',(userId,name)=>{
                console.log('user-connected: '+userId+name)
                alert(`${name} joined the class`)
                const videoBoxContainer=document.createElement('div')
                const username = document.createElement('p');
                username.innerText=name
                videoBoxContainer.append(username);
                connecttonewuser(userId,stream,name,videoBoxContainer)
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
    function addvideostream(video,stream,videoBoxContainer){
        video.srcObject = stream
        video.addEventListener('loadedmetadata',()=>{
            video.play()
        })
        videoBoxContainer.append(video)
        videoBox.append(videoBoxContainer);
    
    }
    
    function connecttonewuser(userId,stream,name,videoBoxContainer){
        const call = mypeer.call(userId,stream)
        const video = document.createElement('video')
        call.on('stream',uservideosstream=>{
            addvideostream(video,uservideosstream,videoBoxContainer)
        })
        call.on('close',()=>{
            video.remove()
            username.remove()
            videoBoxContainer.remove()
        })
    }

    
}
connect();