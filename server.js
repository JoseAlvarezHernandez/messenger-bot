/**
 * @module server
 * @author Jose de Jesus Alvarez Hernandez
 * @desc Node JS server.js
 */

/** Express instance */
const express = require('express');

/** Path instance */
const path = require('path');

/** URL instance */
const url = require('url');

/** bodyParser instance */
const bodyParser = require('body-parser');

/** Express Router instance */
const router = express.Router();

/** Express object */
const app = express();

/** Node app port */
const port = process.env.port || process.env.PORT || 3978;

/************************************************
 * Express middleware
 ************************************************/

/** App Access Control configurations */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({
    extended: true,
    limit: 1024 * 1024 * 5,
    type: 'application/x-www-form-urlencoding',
}));

app.use(bodyParser.json({
    limit: 1024 * 1024,
    type: 'application/json',
}));

/************************************************
 * Import routes
 ************************************************/

/** webhook route */
const webhookRoute = require('./routes/webhook');

/************************************************
 * Express route binding 
 ************************************************/

// Init get
router.get('/', (req, res) => res.status(200).send({ status: 'up' }));

app.use(router);
app.use(webhookRoute);

app.listen(port, () => console.log('Server up' + process.env.token));