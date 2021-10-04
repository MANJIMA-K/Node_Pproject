var express = require('express');
var router = express.Router();
var db = require('../config/db')

router.get('/', function (req, res, next) {
    db.query("select a.customer_id,c.customer_name,c.address,c.mailid,c.phone_no,a.account_no,a.bank_id,a.balance from account_details a inner join customer_details c on a.customer_id=c.customer_id", function (err, result) {
        res.send(result)
    })

});
router.get('/:id', function (req, res, next) {
    db.query("select c.customer_id,c.customer_name,c.address,c.mailid,c.phone_no,a.account_no,a.bank_id,a.balance from account_details a inner join customer_details c on a.customer_id=c.customer_id where c.customer_id=?", [req.params.id], function (err, result) {
        res.send(result)
    })

});

//new customer
router.post('/newcustomer', function (req, res) {
    var data = req.body
    db.query("insert into customer_details values(?,?,?,?,?)", [data.customer_id, data.customer_name, data.address, data.mailid, data.phone_no], function (err, result) {
        if (err) throw err
        db.query("insert into account_details values(?,?,?,?)", [data.customer_id, data.account_no, data.bank_id, data.balance], function (err, result) {
            if (err) throw err
        })
    })
    res.send("new customer details added successfully")
});

//new account for old customer
router.post('/oldcustomer/:id', function (req, res) {
    var data = req.body
    db.query("insert into account_details values(?,?,?,?)", [req.params.id, data.account_no, data.bank_id, data.balance], function (err, result) {
        if (err) throw err
    })
    res.send(`new account for customer_id ${[req.params.id]} created successfully`)
});

//update customer details
router.put('/:id', function (req, res) {
    var data = req.body;
    db.query("update customer_details set customer_name=?,address=?,mailid=?,phone_no=? where customer_id=?", [data.customer_name, data.address, data.mailid, data.phone_no, req.params.id], function (err, result) {
        if (err) throw err
        res.send("updated successfully")
    })
})

router.delete('/:id', function (req, res) {
    db.query("delete from customer_details where customer_id=?", [req.params.id], function (err) {
        if (err) throw err
        
    })
    db.query("delete from account_details where customer_id=?", [req.params.id], function (err) {
        if (err) throw err
        
    })
    res.send("deleted successfully")
});

module.exports = router;