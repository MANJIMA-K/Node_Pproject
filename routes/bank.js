var express = require('express');
var router = express.Router();
var db = require('../config/db')

router.get('/', function (req, res, next) {
    db.query("select * from bank_details", function (err, result) {
        res.send(result)
    })

});

module.exports = router;