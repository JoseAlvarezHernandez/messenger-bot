/**
 * @module api
 * @author Jose de Jesus Alvarez Hernandez
 * @desc api/facebook
 */

const request = require('request');

exports.handleMessage = (sender_psid, received_message) => {
    let response;
    // Check if the message contains text
    if (received_message.text) {

        // Create the payload for a basic text message
        response = {
            text: `You sent the message: '${received_message.text}'.`
        }
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
}

exports.handlePostback = (sender_psid, received_postback) => {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = { 'text': 'Thanks!' }
    } else if (payload === 'no') {
        response = { 'text': 'Oops, try sending another image.' }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response) {
    const request_body = {
        'recipient': {
            'id': sender_psid
        },
        'message': response
    }

    request({
        'uri': 'https://graph.facebook.com/v2.6/me/messages',
        'qs': { 'access_token': process.env.access_token },
        'method': 'POST',
        'json': request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error('Unable to send message:' + err);
        }
    });
}