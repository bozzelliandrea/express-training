const router = require('express').Router();
const userService = require('../services/user.service');
const enableAuth = require('../middleware/authenticate.middleware');

router.route('/').get(enableAuth, (req, res, next) => {
    userService.getAll().then(response => {
        res.send(response)
    }).catch(err => {
        next(err)
    })
})

router.get('/export', enableAuth, (req, res, next) => {
    userService.getAll().then(response => {
        const dataBuffer = new Buffer(JSON.stringify(response), 'utf-8')
        res.setHeader('Content-Length', dataBuffer.byteLength);
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Disposition', `attachment; filename=users_export_${new Date().toISOString()}.json`);
        res.write(dataBuffer, 'binary');
        res.end();
    }).catch(err => {
        next(err)
    })
})

module.exports = router;