const {generateToken} = require("../common/auth");
const router = require('express').Router();
const enableAuth = require('../middleware/authenticate.middleware')

router.route('/')
    .post((req, res) => {
        res.send("Bearer " + generateToken(req.body.username))
    })
    .get(enableAuth, (req, res) => {
        res.send("Valid auth, logged user is: "
            + req.user.username
            + " session still valid until "
            /**
             revert logic from exp seconds to date
             @see: https://github.com/auth0/node-jsonwebtoken#token-expiration-exp-claim
             */
            + new Date(Math.floor(req.user.exp * 1000) + (60 * 60)))
    });

module.exports = {
    router
}