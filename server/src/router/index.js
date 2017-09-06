const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    res.send(({
        message: `Hello ${req.body.email}! Your user was registered! Have fun!`
    }))
});

router.route('/test')
    .post((req, res) => {
        res.send({
            message: 'this is from test method post'
        })
    })
    .get((req, res) => {
        res.send({
            message: 'this is from test method get'
        })
    })

module.exports = router