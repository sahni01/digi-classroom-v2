const join = document.getElementById('join-class-button');


join.addEventListener('click',()=>{
    const roomid = document.getElementById('roomid').value;
    const password = document.getElementById('password').value;

    window.location.href=`/join/${roomid}?password=${password}`;
})