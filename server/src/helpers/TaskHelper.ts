import Task from '../models/TaskModel';

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

export default { sanitizedTask };
