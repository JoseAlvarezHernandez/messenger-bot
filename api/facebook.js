/**
 * @module api
 * @author Jose de Jesus Alvarez Hernandez
 * @desc api/facebook
 */

const request = require('request');

exports.handleMessage = (sender_psid, received_message) => {
    // Sends the response message
    //callSendAPI(sender_psid, response);
    callSendAPIImage(sender_psid);
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

async function callSendAPIImage(sender_psid) {
    const request_body = {
        recipient: {
            id: sender_psid
        },
        message: {
            attachment: {
                type: 'image',
                payload: {
                    url: 'https://inncol-messenger-bot.herokuapp.com/images/facebook-messenger.png',
                    is_reusable: true
                }
            }
        }
    }
    const user = await getPersonsProfile(sender_psid);

    request({
        'uri': 'https://graph.facebook.com/v2.6/me/messages',
        'qs': { 'access_token': process.env.access_token },
        'method': 'POST',
        'json': request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('image message sent!');
        } else {
            console.error(`Unable to send image: ${err}`);
        }
    });
}

function callSendAPI(sender_psid, message) {
    const request_body = {
        recipient: {
            id: sender_psid
        },
        message
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
            console.error(`Unable to send message: ${err}`);
        }
    });
}

function sendComment(commentId) {
    request({
        'uri': `https://graph.facebook.com/v2.6/${commentId}`,
        'qs': { 'access_token': process.env.access_token },
        'method': 'POST',
        'json': request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('comment sent!')
        } else {
            console.error(`Unable to send comment: ${err}`);
        }
    });
}

async function getPersonsProfile(sender_psid) {
    return await request({
        'uri': `https://graph.facebook.com/v2.6/${sender_psid}`,
        'qs': { 'access_token': process.env.access_token, 'fields': 'first_name,last_name' },
        'method': 'GET'
    });
};