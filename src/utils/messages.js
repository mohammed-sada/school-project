const hill = require("./hill");
const des = require("./des");

const helpers = require('./helpers');

function generateMessage(text, username, cipherType) {
    const cipher = cipherType == "hill" ? hill.encrypt(text) : des.encrypt(text);

    return {
        id: helpers.createRandomString(20),
        username,
        text,
        cipher,
        cipherType,
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