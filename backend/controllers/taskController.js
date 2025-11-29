import Task from "../models/Task.js";

// Get all tasks for user
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

// Get single task
export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if(task && task.user.equals(req.user._id)){
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

// Create task
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ user: req.user._id, title, description });
  res.status(201).json(task);
};

// Update task
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if(task && task.user.equals(req.user._id)){
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if(task && task.user.equals(req.user._id)){
    await Task.deleteOne({ _id: task._id }); // ✅ Mongoose 7+ bilan ishlaydi
    res.json({ message: "Task removed" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};