import express from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getTasks).post(protect, createTask);
router.route("/:id").get(protect, getTask).put(protect, updateTask).delete(protect, deleteTask);

export default router;
