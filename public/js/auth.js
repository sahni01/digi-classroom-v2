const join = document.getElementById('join-class-button');


join.addEventListener('click',()=>{
    let roomid = document.getElementById('roomid').value;
    let password = document.getElementById('password').value;
    window.location.href=`/join/${roomid}?password=${password}`;
})