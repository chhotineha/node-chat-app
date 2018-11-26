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
// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hey'

// }, function (data) {
//     console.log('Got it', data)
// })
socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current Location</a>');
    li.text(`${message.from}:`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
})
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    });
})
var locationButton = jQuery('#send-location');
jQuery('#send-location').on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,


        });

    }, function () {
        alert('Unable to fetch location');
    })
})


