import { protectedRequest } from '@/lib/axios';
import { TaskType } from '@/features/tasks/types/task.type.ts';

export const API_CREATE_TASK = async (data: TaskType) => {
  return await protectedRequest<TaskType, ApiResponse>({
    url: `/tasks`,
    method: 'POST',
    data,
  });
};
