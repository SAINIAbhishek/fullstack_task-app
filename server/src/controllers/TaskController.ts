import asyncHandler from 'express-async-handler';
import { TaskModel } from '../models/TaskModel';
import { SuccessResponse } from '../middleware/ApiResponse';
import TaskHelper from '../helpers/TaskHelper';
import { NotFoundError } from '../middleware/ApiError';

class TaskController {
  get = asyncHandler(async (req, res) => {
    const task = await TaskModel.findOne({
      _id: req.params.id,
    });
    if (!task) throw new NotFoundError('Task not found');

    new SuccessResponse('Task fetched successfully', {
      task: TaskHelper.sanitizedTask(task),
    }).send(res);
  });

  delete = asyncHandler(async (req, res) => {
    const result: DeleteResult = await TaskModel.deleteOne({
      _id: req.params.id,
    });

    if (!result.deletedCount) throw new NotFoundError('Task not found');

    new SuccessResponse('Task deleted successfully', {
      taskId: req.params.id,
    }).send(res);
  });

  getAll = asyncHandler(async (req, res) => {
    const filter = req.query.filter && JSON.parse(req.query.filter as string);

    const tasks = await TaskHelper.findAll(filter);
    tasks.map((task) => TaskHelper.sanitizedTask(task));

    new SuccessResponse('Tasks fetched successfully', {
      total: tasks.length,
      tasks: tasks,
    }).send(res);
  });

  create = asyncHandler(async (req, res) => {
    const { title, description, important, completed, date, user } = req.body;

    const newTask = await TaskModel.create({
      title,
      description,
      important,
      completed,
      date: new Date(date),
      user,
    });

    new SuccessResponse('Task created successfully', {
      task: TaskHelper.sanitizedTask(newTask),
    }).send(res);
  });
}

export default new TaskController();
