var socket = io();
socket.on('connect', () => {
    console.log("connected to the server")
    // socket.emit('createMessage', {
    //     from: "Neha",
    //     text: "How are you??"

    // })
})
socket.on('disconnect', () => {
    console.log('Disconnected from server ')
})
// socket.on('newEmail', (email) => {
//     console.log('new Email', email)
// })
// socket.emit('createEmail', {
//     to: 'mukesh1234@gmail.com',
//     text: 'Hey,This is mukesh'

// })
socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);
    jQuery('#messages').append(li);
});
socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hey'

}, function (data) {
    console.log('Got it', data)
})
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message').val()
    }, function () {

    });
})

