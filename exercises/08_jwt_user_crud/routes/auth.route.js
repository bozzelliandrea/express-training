const router = require('express').Router();
const authService = require('../services/auth.service');
const AuthError = require("../errors/auth.error");

router.post('/register', (req, res, next) => {

    if (!req.body.username || !req.body.email || !req.body.password)
        throw new AuthError(404, "Required parameters are null");

    authService.register(req.body.username,
        req.body.email,
        req.body.password
    ).then((response) => {
        res.send(response);
    }).catch((err) => {
        next(err)
    });
});

router.post('/login', (req, res, next) => {

    if (!req.body.username || !req.body.password)
        throw new AuthError(404, "Required parameters are null");

    authService.login(req.body.username, req.body.password).then((token) => {
        res.send(token);
    }).catch((err) => {
        next(err)
    });
});

module.exports = router;