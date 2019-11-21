var express = require('express');
var router = express.Router();
var controllerModule = require('../controllers/lolAPIcontroller');

router.get('/', (req, res) => {
    res.send("hello from API!");
});

router.get('/stats', controllerModule.getStats);

module.exports = router;