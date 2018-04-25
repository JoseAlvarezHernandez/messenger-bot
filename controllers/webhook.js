/** 
 * @module controllers 
 * @author Jose de Jesus Alvarez Hernandez
 * @desc controller  
 */

exports.post = (req, res, next) => {
    const body = req.body;

    if (body.object === 'page') {
        let webhook_event = '';
        body.entry.forEach(entry => {
            webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });
        res.status(200).send(webhook_event);
    } else {
        res.sendStatys(404);
    }
}

exports.get = (req, res, next) => {
    const verify_token = process.env.token;

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge']

    if (mode && token) {
        if (mode === 'suscribe' && token === verify_token)
            res.status(200).send(challenge);
        else
            res.sendStatus(403);
    }
}