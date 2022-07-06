var express = require('express');
var router = express.Router();
const controller = require('../controllers/auth');
const {authJwt} = require('../middlewares');

router.post('/signin',controller.signin);
router.post('/auth',[authJwt.verifyToken],controller.checkSession);

module.exports = router;
