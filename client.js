// const { fuchsia } = require("color-name");

// const { setTimeout } /= require("timers/promises");

const socket=io("http://localhost:8000");
const form=document.getElementById("send-cont");
const messageiput=document.getElementById("messageinp")
const messagecontaianer=document.querySelector(".container")

const asdada=prompt("enter your name:")
socket.emit('user-joined', asdada);

function appendd(message,position){
    const msgelmnt=document.createElement('div')
    msgelmnt.innerText=message;
    msgelmnt.classList.add('message');
    msgelmnt.classList.add(position);
    messagecontaianer.append(msgelmnt);
    console.log("function is runnign")
}
document.getElementById("b").addEventListener("submit", function(e){
    e.preventDefault();
    if(document.getElementById("i").value==''){
        alert("please do not send a blank message")
    }
    const messaes=document.getElementById("i").value;
    appendd(`You: ${messaes}`, 'right');
    socket.emit('send', messaes);
    messageiput.value='';
})

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(messageiput.value==''){
        alert("please do not send a blank message")
    }
    const messaes=messageiput.value;
    appendd(`You: ${messaes}`, 'right');
    socket.emit('send', messaes);
    messageiput.value='';
})



socket.on('user-joined', naam=>{
    appendd(`${naam} joined the chat`, 'right');
})

socket.on('receive', daata=>{
    appendd(`${daata.name}: ${daata.message} `, 'left');
})

socket.on('left', nameeda=>{
    appendd(`${nameeda} left the chat`, 'left');
})
