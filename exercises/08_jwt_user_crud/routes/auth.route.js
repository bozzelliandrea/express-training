const router = require('express').Router();
const authService = require('../services/auth.service');

router.post('/register', (req, res) => {
    authService.register(req.body.username,
        req.body.email,
        req.body.password
    ).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.status(500).send({
            message: err.message
        });
    })
});

router.post('/login', (req, res) => {
    res.send(authService.login(req.body.username, req.body.password))
});

module.exports = router;