export type TaskType = {
  _id?: string;
  title: string;
  description: string;
  user: string;
  important: boolean;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
  date: string;
};

export type UpdateImportantTaskType = {
  taskId: string;
  important: boolean;
};

export type UpdateCompletedTaskType = {
  taskId: string;
  completed: boolean;
};
