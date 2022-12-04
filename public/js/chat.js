const socket = io();

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');
const $sidebar = document.querySelector('#sidebar');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

function autoScroll() {

    // New added message element
    const $newMessage = $messages.lastElementChild;

    // Calculating new message height
    const newMessageStyle = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyle.marginBottom);
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    // Visible height 
    const visibleHeight = $messages.offsetHeight;

    // Height of messages container
    const contarinerHeight = $messages.scrollHeight;

    // How far are we scrolled?
    const scrollHeight = $messages.scrollTop + visibleHeight;

    if (contarinerHeight - newMessageHeight <= scrollHeight) {
        $messages.scrollTop = contarinerHeight;
    }
}

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        cipher: message.cipher,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
    autoScroll();
});

socket.on('locationMessage', message => {
    const html = Mustache.render(locationMessageTemplate, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
    autoScroll();
});

socket.on('listData', ({ room, roomUsers }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users: roomUsers
    });
    $sidebar.innerHTML = html;
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'true');

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        if (error) {
            return console.log(error);
        }
        console.log('Message delivered!');
    });
});

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Your browser does not support geolocation, sorry');
    }

    $sendLocationButton.setAttribute('disabled', 'true');

    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (message) => {
            $sendLocationButton.removeAttribute('disabled');
            console.log(message);
        });
    });
    $sendLocationButton.removeAttribute('disabled');

});

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});



