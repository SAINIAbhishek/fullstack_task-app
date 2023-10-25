import Task, { TaskModel } from '../models/TaskModel';
import { PopulateOptions } from 'mongoose';

const sanitizedTask = (task: Task): Task => {
  return {
    _id: task._id,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    title: task.title,
    description: task.description,
    completed: task.completed,
    important: task.important,
    date: task.date,
    user: task.user,
  };
};

const findAll = async (
  filter: object = {},
  selectFields = '',
  populates: PopulateOptions[] = []
): Promise<Task[] | []> => {
  return TaskModel.find(filter).select(selectFields).populate(populates).exec();
};

export default { sanitizedTask, findAll };
