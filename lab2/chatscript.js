var username=prompt("please enter your name")
var chatpage = document.getElementById("chatpage")
var userheader = document.getElementById("user")

var chatmessage = document.getElementById("chatmessage")
var sendmessage = document.getElementById("sendmsg")

userheader.innerHTML= `Hello ${username}`


let mywebsocket = new WebSocket("ws://localhost:8700")
//console.log(mywebsocket)
mywebsocket.onopen=function(){
    console.log("connection opened")
    data_to_send={
        username:username,
        type:"login"
    }
    mywebsocket.send(JSON.stringify(data_to_send))
}
mywebsocket.onerror=function()
{
    console.log("connection error")
}


mywebsocket.onmessage=function(event)
{
    console.log("message recieved")
    console.log(event.data, typeof data)
    msg= JSON.parse(event.data)
    msg_color=msg.color
    newmessag= `<span style="color: ${msg_color} "> ${msg['content']} </span> </br>`
    chatpage.innerHTML+=newmessag
}

sendmessage.addEventListener('click',function()
{
   mymssg=chatmessage.value
   data_to_send={
       username:username,
       body:mymssg+'\n',
       type:"chat"
   }
   mywebsocket.send(JSON.stringify(data_to_send))
})