// routes/taskRoutes.js
const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  shareTask
} = require('../controllers/taskcontroller');
const auth = require('../middlewares/authMiddleware');

module.exports = (io) => {
  const router = express.Router();

  router.use(auth);

  router.post('/', async (req, res) => {
    await createTask(req, res);
    io.emit('taskUpdated');
  });

  router.get('/', getTasks);

  router.put('/:id', async (req, res) => {
    await updateTask(req, res);
    io.emit('taskUpdated');
  });

  router.delete('/:id', async (req, res) => {
    await deleteTask(req, res);
    io.emit('taskUpdated');
  });

  router.post('/share/:id', shareTask);

  return router;
};
