import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { API_GET_TASK, API_TASK_UPDATE } from '@/api/task.api';
import toast from 'react-hot-toast';
import TaskForm from '@/features/tasks/components/task-form';
import PageLayout from '@/components/layout/page-layout';
import Spinner from '@/components/spinner';
import { TaskType } from '@/features/tasks/types/task.type';
import { formattedDate, todayDate } from '@/utils/date';
import { DATE_FORMAT } from '@/config';

const EditTask = () => {
  const { id } = useParams();

  const { data, isLoading: isFetchingTask } = useQuery({
    queryKey: ['task', id],
    queryFn: () => API_GET_TASK(id ?? ''),
    enabled: !!id,
  });

  const task = data?.data?.task ?? ({} as TaskType);

  const initialValues: TaskType = {
    user: task.user,
    title: task.title,
    description: task.description,
    completed: task.completed,
    important: task.important,
    date: task.date ? formattedDate(task.date, DATE_FORMAT) : todayDate(),
  };

  const { mutate, isError, isPending } = useMutation({
    mutationFn: API_TASK_UPDATE,
    onSuccess: (response) => {
      toast.success(response.message);
    },
  });

  const handleSubmit = (values: TaskType) => {
    if (id) {
      mutate({ ...values, taskId: id });
    }
  };

  return (
    <PageLayout className="flex flex-col items-center justify-center px-6 py-8">
      {isFetchingTask ? (
        <Spinner />
      ) : (
        <TaskForm
          title="title.edit_task"
          btnLabel="button.save"
          isSubmitting={isPending}
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          isError={isError}
        />
      )}
    </PageLayout>
  );
};

export default EditTask;
