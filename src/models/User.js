const users = [];

const addUser = ({ id, name, room }) => {
    let error;
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    if(!name || !room) {
        error = 'Username and room are required.';
    }

    const existingUser = users.find((user) => user.room === room && user.name === name);
    if(existingUser) {
        error = 'Username is taken.';
    }

    if( error ) {
        return { error }
    }

    const user = { id, name, room };
    users.push(user);

    return { user };
}

const removeUser = id => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = id => users.find((user) => user.id === id);

const getUsersInRoom = room => users.filter((user) => user.room === room);

module.exports = {
    add : addUser,
    remove : removeUser,
    get : getUser,
    getUsersInRoom,
    users,
};