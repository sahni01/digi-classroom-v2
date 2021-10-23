

let microphoneButton = document.getElementsByClassName('microphone')[0];
let videoButton = document.getElementsByClassName('video')[0];
let StudentsButton = document.getElementsByClassName('students')[0];
let leaveButton = document.getElementsByClassName('leave')[0];

microphoneButton.addEventListener('click',muteUnmute);
videoButton.addEventListener('click',videoOnOff);
leaveButton.addEventListener('click',()=>{

    socket.emit('disconnect',Room_Id,userid,name);
    window.location.href('https://vdeo-call-app.herokuapp.com');

})

function muteUnmute(){
    enabled = myVideostream.getAudioTracks()[0].enabled;
    if(enabled){
        myVideostream.getAudioTracks()[0].enabled=false;
        setMuteButton()
    } 
    else{
        myVideostream.getAudioTracks()[0].enabled=true
        setUnmuteButton();
    }
}

function setMuteButton(){
    microphoneButton.innerHTML = `
    <i class="fas fa-microphone-slash"></i>
            <p>Unmute</p>
    `
}

function setUnmuteButton(){
    microphoneButton.innerHTML=`
    <i class="fas fa-microphone"></i>
            <p>Mute</p>
    `
}

function videoOnOff(){
    enabled = myVideostream.getVideoTracks()[0].enabled;
    if(enabled){
        myVideostream.getVideoTracks()[0].enabled = false;
        setVideoOFFButton();
    }
    else{
        myVideostream.getVideoTracks()[0].enabled = true;
        setVideoOnButton()
    }
}

function setVideoOFFButton(){
    videoButton.innerHTML=`
    <i class="fas fa-video-slash"></i>
            <p>Video</p>
    `
}
function setVideoOnButton(){
    videoButton.innerHTML = `
    <i class="fas fa-video"></i>
            <p>Video</p>
    `
}