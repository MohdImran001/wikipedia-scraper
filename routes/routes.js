const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();


const mainCtrl = require('../controllers/main');

router.get('/', mainCtrl.getIndexPage);

router.post('/search', bodyParser.urlencoded({ extended: false }) ,mainCtrl.searchPerson);

module.exports = router;
