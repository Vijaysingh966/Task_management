const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// CREATE
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(500).send({ message: "Error creating task", error });
    }
});

// READ
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);  
    } catch (error) {
        res.status(500).send({ message: "Error fetching tasks", error });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(task);
    } catch (error) {
        res.status(500).send({ message: "Error updating task", error });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.send({ message: 'Task Deleted' });
    } catch (error) {
        res.status(500).send({ message: "Error deleting task", error });
    }
});

module.exports = router;
