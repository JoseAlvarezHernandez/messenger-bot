/** 
 * @module routes/webhook 
 * @author Jose de Jesus Alvarez Hernandez
 * @desc WebHook API routes  
 */

/** Express dependency */
const express = require('express');

/** Router dependency */
const router = express.Router();

const webhook = require('../controllers/webhook');

router.get('/webhook', webhook.get);

router.post('/webhook', webhook.post);

module.exports = router;