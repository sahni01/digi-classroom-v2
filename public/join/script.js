



function connect(){

    const socket = io('/')
    
    
    var mypeer = new Peer(name,{
        path:'peerjs',
        host:'/',
        post:'3000'
        
        
    })
    mypeer.on('open',id=>{
        socket.emit('join-room',Room_Id,id)
        
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
        
            socket.on('user-connected',(userId)=>{
                console.log('user-connected: '+userId)
                connecttonewuser(userId,stream)
            })
        
            mypeer.on('call',call=>{
                call.answer(stream)
                const video =  document.createElement('video')
                call.on('stream',uservideosstream=>{
                    addvideostream(video,uservideosstream)
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
        videoBox.append(video);
    
    }
    
    function connecttonewuser(userId,stream){
        const call = mypeer.call(userId,stream)
        const video = document.createElement('video')
        call.on('stream',uservideosstream=>{
            addvideostream(video,uservideosstream)
        })
        call.on('close',()=>{
            video.remove()
        })
    }

    
}
connect();