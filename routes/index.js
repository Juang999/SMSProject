var express = require('express');
var router = express.Router();
var CsrfToken = require('../helper/CsrfToken');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.info(CsrfToken.generateToken())

  res.render('Auth/login', { title: 'Express', _csrf: CsrfToken.generateToken() });
});

module.exports = router;
