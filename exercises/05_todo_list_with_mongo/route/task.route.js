const router = require('express').Router()
const taskController = require('../controller/task.controller');

router.route('/')
    .get(taskController.getAll)
    .post(taskController.create);
router.route('/:id')
    .get(taskController.get)
    .put(taskController.update)
    .patch(taskController.patch)
    .delete(taskController.deleteById);

module.exports = router