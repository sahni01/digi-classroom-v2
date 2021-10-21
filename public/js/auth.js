let join = document.getElementById('join-class-button');


join.addEventListener('click',()=>{
    let roomid = document.getElementById('roomid').value;
    let Name = document.getElementById('name').value;
    window.location.href=`/join/${roomid}/${Name}`;
})