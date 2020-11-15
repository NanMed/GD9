var express = require('express');
const UrlController = require('../controllers/UrlController');
const UrlModel = require('../models/Url');

var router = express.Router();

router.get('/', UrlController.showAll);
router.post('/', UrlController.store);
router.get('/:nanoid', UrlController.findByNanoid);
router.get('/:nanoid/informacion', UrlController.info);

module.exports = router;