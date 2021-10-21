var header = document.getElementsByClassName('head')[0]
let menu = document.getElementsByClassName('menu')[0]
let buttons = document.getElementsByClassName('buttons')[0]

menu.addEventListener('click',()=>{
    header.classList.toggle('height')
    
})