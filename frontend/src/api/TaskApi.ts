import { protectedRequest } from '@/lib/axios/Axios';
import {
  TaskDeleteResponse,
  TaskResponse,
  TasksResponse,
  TaskType,
  UpdateCompletedTaskType,
  UpdateImportantTaskType,
  UpdateTaskType,
} from '@/types/TaskType';

export const API_TASK_UPDATE = async (data: UpdateTaskType) => {
  return await protectedRequest<
    Pick<
      TaskType,
      'title' | 'description' | 'completed' | 'important' | 'date'
    >,
    TaskResponse
  >({
    url: `/tasks/${data.taskId}`,
    method: 'PUT',
    data,
  });
};

export const API_TASK_TOGGLE_IMPORTANT = async (
  data: UpdateImportantTaskType,
) => {
  return await protectedRequest<Pick<TaskType, 'important'>, TaskResponse>({
    url: `/tasks/${data.taskId}`,
    method: 'PUT',
    data: { important: data.important },
  });
};

export const API_TASK_TOGGLE_COMPLETED = async (
  data: UpdateCompletedTaskType,
) => {
  return await protectedRequest<Pick<TaskType, 'completed'>, TaskResponse>({
    url: `/tasks/${data.taskId}`,
    method: 'PUT',
    data: { completed: data.completed },
  });
};

export const API_GET_TASK = async (taskId: string) => {
  return await protectedRequest<null, TaskResponse>({
    url: `/tasks/${taskId}`,
    method: 'GET',
  });
};

export const API_DELETE_TASK = async (taskId: string) => {
  return await protectedRequest<null, TaskDeleteResponse>({
    url: `/tasks/${taskId}`,
    method: 'DELETE',
  });
};

export const API_CREATE_TASK = async (data: TaskType) => {
  return await protectedRequest<TaskType, TaskResponse>({
    url: `/tasks`,
    method: 'POST',
    data,
  });
};

export const API_GET_TASKS = async (filter?: string) => {
  return await protectedRequest<null, TasksResponse>({
    url: `/tasks${filter ? `?filter=${filter}` : ''}`,
    method: 'GET',
  });
};
