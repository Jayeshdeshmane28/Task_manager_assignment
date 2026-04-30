import { validationResult } from 'express-validator';
import TaskModel from '../models/task.model.js';

export const getTasks = async (req, res) => {
  try {
    let tasks = await TaskModel.findAll(req.userId);
    const { status } = req.query;
    if (status) tasks = tasks.filter((t) => t.status === status);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { title, description } = req.body;

  try {
    const task = await TaskModel.create({ title, description, userId: req.userId });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const markCompleted = async (req, res) => {
  try {
    const task = await TaskModel.markCompleted(req.params.id, req.userId);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await TaskModel.delete(req.params.id, req.userId);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
