const express = require('express');
const router = express.Router();
const contactRoutes = require('./contactsRoute');

router.use('/contacts', contactRoutes)

module.exports = router;