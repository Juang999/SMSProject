var express = require('express');
var router = express.Router();
const {AuthController} = require('../app/Controller/Controller.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST login user. */
router.post('/login', AuthController.login);

module.exports = router;
