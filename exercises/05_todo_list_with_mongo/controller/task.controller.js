const Task = require('../model/task.model');

const getAll = async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({tasks});
}

const create = async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
}

const get = async (req, res) => {
    const {id: taskID} = req.params;
    const task = await Task.findOne({_id: taskID})
    if (!task) {
        return res.status(404).json({message: "Task not found with id " + taskID});
    }

    res.status(200).json({task})
}

const update = async (req, res) => {
    const {id: taskID} = req.params;
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
        runValidators: true
    });

    if (!task) {
        return res.status(404).json({message: "Task not found with id " + taskID});
    }
    res.status(200).json({task})
}

const patch = async (req, res) => {
    const {id: taskID} = req.params
    const body = {completed: req.query.completed};

    const task = await Task.findOneAndUpdate({_id: taskID}, body, {
        runValidators: true
    });

    if (!task) {
        return res.status(404).json({message: "Task not found with id " + taskID});
    }
    res.status(200).json({task})
}

const deleteById = async (req, res) => {
    const {id: taskID} = req.params
    const task = await Task.findOneAndDelete({_id: taskID})
    if (!task) {
        return res.status(404).json({message: "Task not found with id " + taskID});
    }
    res.status(200).json({task})
}

module.exports = {
    getAll,
    create,
    get,
    update,
    patch,
    deleteById
}