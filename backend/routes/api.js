const express = require('express');
const controllerModule = require('../controllers/lolAPIcontroller');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("hello from API!");
});

router.get('/stats', controllerModule.getStats);

module.exports = router;
