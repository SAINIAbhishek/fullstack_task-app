import { protectedRequest } from '@/lib/axios';
import {
  TaskType,
  UpdateCompletedTaskType,
  UpdateImportantTaskType,
  UpdateTaskType,
} from '@/features/tasks/types/task.type';

export const API_TASK_UPDATE = async (data: UpdateTaskType) => {
  return await protectedRequest<
    Pick<
      TaskType,
      'title' | 'description' | 'completed' | 'important' | 'date'
    >,
    ApiResponse
  >({
    url: `/tasks/${data.taskId}`,
    method: 'PUT',
    data,
  });
};

export const API_TASK_TOGGLE_IMPORTANT = async (
  data: UpdateImportantTaskType,
) => {
  return await protectedRequest<Pick<TaskType, 'important'>, ApiResponse>({
    url: `/tasks/${data.taskId}`,
    method: 'PUT',
    data: { important: data.important },
  });
};

export const API_TASK_TOGGLE_COMPLETED = async (
  data: UpdateCompletedTaskType,
) => {
  return await protectedRequest<Pick<TaskType, 'completed'>, ApiResponse>({
    url: `/tasks/${data.taskId}`,
    method: 'PUT',
    data: { completed: data.completed },
  });
};

export const API_GET_TASK = async (taskId: string) => {
  return await protectedRequest<null, ApiResponse>({
    url: `/tasks/${taskId}`,
    method: 'GET',
  });
};

export const API_DELETE_TASK = async (taskId: string) => {
  return await protectedRequest<null, ApiResponse>({
    url: `/tasks/${taskId}`,
    method: 'DELETE',
  });
};

export const API_CREATE_TASK = async (data: TaskType) => {
  return await protectedRequest<TaskType, ApiResponse>({
    url: `/tasks`,
    method: 'POST',
    data,
  });
};

export const API_GET_TASKS = async (filter?: string) => {
  return await protectedRequest<null, ApiResponse>({
    url: `/tasks${filter ? `?filter=${filter}` : ''}`,
    method: 'GET',
  });
};
