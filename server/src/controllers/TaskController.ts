import asyncHandler from 'express-async-handler';
import { TaskModel } from '../models/TaskModel';
import { SuccessResponse } from '../middleware/ApiResponse';
import TaskHelper from '../helpers/TaskHelper';

class TaskController {
  create = asyncHandler(async (req, res) => {
    const { title, description, important, completed, completedAt, user } =
      req.body;

    const newTask = await TaskModel.create({
      title,
      description,
      important,
      completed,
      completedAt,
      user,
    });

    new SuccessResponse('Task created successfully', {
      task: TaskHelper.sanitizedTask(newTask),
    }).send(res);
  });
}

export default new TaskController();
