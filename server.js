/**
 * This bot will not use any framework
 * 
 */
const restify = require('restify');

// Setup Restify Server
const server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, () => { });

server.get('/', require('./routes/root'));

server.post('/weebhook', require('./routes/webhook'));