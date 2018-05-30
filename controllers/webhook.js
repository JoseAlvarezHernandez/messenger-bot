/** 
 * @module controllers 
 * @author Jose de Jesus Alvarez Hernandez
 * @desc controller  
 */

const facebook = require('./../api/facebook');

exports.post = (req, res, next) => {
    const body = req.body;
    if (body.entry[0].messaging) {
        let webhook_event = '';
        body.entry.forEach(entry => {
            webhook_event = entry.messaging[0];
            const sender_psid = webhook_event.sender.id;
            console.log(sender_psid);
            if (webhook_event.message) {
                facebook.handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                facebook.handlePostback(sender_psid, webhook_event.postback);
            }
        });
        res.status(200).send(webhook_event);
    } else if (body.entry[0].changes) {
        body.entry.forEach(entry => {
            console.log(entry.changes);
            console.log(entry.post);
        });
        res.status(200).send({});
    } else {
        console.log('body => ', body);
        res.sendStatus(404);
    }
}

exports.get = (req, res, next) => {
    const verify_token = process.env.token;

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge']

    if (mode && token) {
        if (mode === 'subscribe' && token === verify_token) {
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400);
    }
}