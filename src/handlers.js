const _data = require('./utils/data');
const hill = require("./utils/hill");
const des = require("./utils/des");

const handlers = {};

handlers.httpGetMessages = function (req, res) {
    // Get all the messages
    _data.list('messages', function (err, messages) {
        if (!err && messages && messages.length > 0) {
            return res.json(messages);
        } else {
            console.log('Error: Could not find any messages to process');
            return res.json([]);
        }
    });
};

handlers.httpGetMessage = function (req, res) {
    // Required data: id
    // Optional data: none

    // Check that id is valid
    var id = typeof (req.query.id) == 'string' && req.query.id.trim().length == 20 ? req.query.id.trim() : false;
    if (id) {
        // Lookup the check
        _data.read('messages', id, function (err, messageData) {
            if (!err && messageData) {
                messageData.text = messageData.cipherType == "hill" ? hill.decrypt(messageData.cipher) : des.decrypt(messageData.cipher);
                return res.json(messageData);
            } else {
                callback(404);
            }
        });
    } else {
        return res.status(400).json({ 'Error': 'Missing required field, or field invalid' });
    }
};

module.exports = handlers;
