var express = require('express');
var router = express.Router();
var db = require('../config/db')

router.get('/', function (req, res, next) {
    db.query("select t.transaction_type,d.account_no,d.amount,d.recepient,d.transaction_date from transaction_details d inner join transaction_type t on d.transaction_type=t.transaction_id", function (err, result) {
        res.send(result)
    })

});
//for dropdown 
router.get('/drop', function (req, res, next) {
    db.query("select * from transaction_type", function (err, result) {
        res.send(result)
    })

});

router.get('/:id/:from/:to', function (req, res, next) {
    db.query("select a.customer_id,a.bank_id,c.customer_name,c.address,c.mailid,c.phone_no,t.transaction_type,d.account_no,d.amount,d.recepient,d.transaction_date,a.balance from transaction_details d inner join transaction_type t on d.transaction_type=t.transaction_id inner join account_details a on d.account_no=a.account_no inner join customer_details c on a.customer_id=c.customer_id where transaction_date between ? and ? and d.account_no=?", [req.params.from, req.params.to, req.params.id], function (err, result) {
        res.send(result)
    })

});

router.post("/", function (req, res) {

    var data = req.body
    db.query("insert into transaction_details values(?,?,?,?,?)", [data.transaction_type, data.account_no, data.amount, data.recepient, data.transaction_date], function (err, result) {
        if (err) throw err
        if (data.transaction_type == 1) {
            db.query("update account_details set balance=balance+? where account_no=?", [data.amount, data.account_no], function (err, result) {
                if (err) throw err
            })
        }
        if (data.transaction_type == 2) {
            db.query("update account_details set balance=balance-? where account_no=?", [data.amount, data.account_no], function (err, result) {
                if (err) throw err
            })
        }
        if (data.transaction_type == 3) {
            db.query("update account_details set balance=balance-? where account_no=?", [data.amount, data.account_no], function (err, result) {
                if (err) throw err
            })
            db.query("update account_details set balance=balance+? where account_no=?", [data.amount, data.recepient], function (err, result) {
                if (err) throw err
            })
        }
    })
    res.send("transaction completed successfully")

})


module.exports = router;