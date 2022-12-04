const { encrypt } = require("./hill");

function generateMessage(text, username) {
    const cipher = encrypt(text);

    return {
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