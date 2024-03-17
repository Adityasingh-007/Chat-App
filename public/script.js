
const socket=io();

$('#chat-box').hide();

$('#send-btn').on('click',()=>{
    const msgText=$('#inp').val();
    // console.log(msgText)
    

    socket.emit('send-mssg',{
        msgText:msgText
    })
    $('#inp').val("")
})

socket.on('received-mssg',(data)=>{
    console.log(data);
    $('#chat').append(`<li class="border mb-2 p-2 rounded-pill"><span class="fw-bold">${data.username}</span>--->${data.msg}</li>`)
})

// to map name to id; 

$('#login-btn').on('click',()=>{
    $('#login').hide()
    $('#chat-box').show()
    const username=$('#username').val()
    socket.emit('login',{
        username:username
    })
    $('username').val("")
})