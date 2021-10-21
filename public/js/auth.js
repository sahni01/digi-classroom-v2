let join = document.getElementById('join-class-button');
join.addEventListener('click',()=>{
    let roomid = document.getElementById('roomid').value;
    window.location.href=`/join/${roomid}`;
})