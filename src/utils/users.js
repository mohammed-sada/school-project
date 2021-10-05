const users = [];

function addUser({ id, username, room }) {
    // Clean data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Validate date
    if (!username || !room) {
        return {
            error: 'username and room are required!'
        };
    }

    // Validate username
    const existingUsername = users.find(user => user.room === room && user.id === id);
    if (existingUsername) {
        return {
            error: 'Username is in use!'
        };
    }

    const user = { id, username, room };
    users.push(user);
    return user;
}

function removeUser(id) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return {
            error: `username is not found with this id: ${id}`
        };
    }
    return users.splice(index, 1)[0];
}

function getUser(id) {
    const user = users.find(user => user.id === id);
    if (!user) {
        return {
            error: `username is not found with this id: ${id}`
        };
    }
    return user;

}

function getRoomUsers(room) {
    room = room.trim().toLowerCase();
    const usersRoom = users.filter(user => user.room === room);
    if (usersRoom.length === 0) {
        return {
            error: `room is not found or there is no users in this room`
        };
    }
    return usersRoom;
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getRoomUsers
};

