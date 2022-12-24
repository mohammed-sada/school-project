const hill = require("./hill");
const hill = require("./Des");

const helpers = require('./helpers');

function generateMessage(text, username) {
    //const cipher = hill.encrypt(text);
    const cipher = des.encrypt(text); // TODO: change to hill / des

    return {
        id: helpers.createRandomString(20),
        username,
        text,
        cipher,
        createdAt: new Date().getTime()
    };
}
function generateLocationMessage(url, username) {
    return {
        username,
        url,
        createdAt: new Date().getTime()
    };
}

module.exports = {
    generateMessage,
    generateLocationMessage
};