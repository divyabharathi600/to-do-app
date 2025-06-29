// controllers/taskController.js
const Task = require('../models/Task');
const User = require('../models/User');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, createdBy: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Tasks for User (own + shared)
exports.getTasks = async (req, res) => {
  const { status, priority, page = 1, limit = 10 } = req.query;
  const filter = {
    $or: [
      { createdBy: req.user.id },
      { sharedWith: req.user.id },
    ]
  };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const tasks = await Task.find(filter)
    .sort({ dueDate: 1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(tasks);
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, $or: [{ createdBy: req.user.id }, { sharedWith: req.user.id }] },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });
    if (!task) return res.status(404).json({ error: 'Task not found or unauthorized' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Share Task with another user by email
exports.shareTask = async (req, res) => {
  const { email } = req.body;
  const taskId = req.params.id;

  const userToShare = await User.findOne({ email });
  if (!userToShare) return res.status(404).json({ error: 'User not found' });

  const task = await Task.findOne({ _id: taskId, createdBy: req.user.id });
  if (!task) return res.status(404).json({ error: 'Task not found or unauthorized' });

  if (!task.sharedWith.includes(userToShare._id)) {
    task.sharedWith.push(userToShare._id);
    await task.save();
  }

  res.json({ message: 'Task shared successfully' });
};
