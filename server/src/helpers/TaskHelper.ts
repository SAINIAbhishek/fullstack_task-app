import Task from '../models/TaskModel';

const sanitizedTask = (task: Task): Task => {
  return {
    _id: task._id,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    title: task.title,
    description: task.description,
    completed: task.completed,
    completedAt: task.completedAt,
    user: task.user,
  };
};

export default { sanitizedTask };
