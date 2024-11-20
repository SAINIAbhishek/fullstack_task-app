type TaskBaseType = {
  important: boolean;
  description: string;
  title: string;
  completed: boolean;
  date: string;
};

export type TaskType = TaskBaseType & {
  _id?: string;
  user: string;
  createdAt?: string;
  updatedAt?: string;
};

type UpdateTaskBaseType = {
  taskId: string;
};

export type UpdateImportantTaskType = UpdateTaskBaseType & {
  important: boolean;
};

export type UpdateCompletedTaskType = UpdateTaskBaseType & {
  completed: boolean;
};

export type UpdateTaskType = UpdateTaskBaseType & TaskBaseType;

export type TaskResponse = {
  task: TaskType;
};

export type TasksResponse = {
  tasks: TaskType[];
  total: number;
};

export type TaskDeleteResponse = {
  taskId: string;
};
