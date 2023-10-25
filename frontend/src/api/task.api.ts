import { protectedRequest } from '@/lib/axios';
import { TaskType } from '@/features/tasks/types/task.type.ts';

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
