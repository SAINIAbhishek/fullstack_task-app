import asyncHandler from 'express-async-handler';
import { TaskModel } from '../models/TaskModel';
import { SuccessResponse } from '../middleware/ApiResponse';
import TaskHelper from '../helpers/TaskHelper';
import DateHelper from '../helpers/DateHelper';

class TaskController {
  create = asyncHandler(async (req, res) => {
    const { title, description, important, completed, date, user } = req.body;

    const newTask = await TaskModel.create({
      title,
      description,
      important,
      completed,
      date: DateHelper.format(date),
      user,
    });

    new SuccessResponse('Task created successfully', {
      task: TaskHelper.sanitizedTask(newTask),
    }).send(res);
  });
}

export default new TaskController();
