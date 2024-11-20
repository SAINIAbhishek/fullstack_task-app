import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { API_GET_TASK, API_TASK_UPDATE } from '@/api/TaskApi';
import toast from 'react-hot-toast';
import TaskForm from '@/pages/tasks/components/task-form/TaskForm';
import PageLayout from '@/components/layout/page-layout/PageLayout';
import Spinner from '@/components/spinner/Spinner';
import { TaskType } from '@/types/TaskType';
import { formattedDate, todayDate } from '@/helpers/DateHelper';
import { CONFIG } from '@/config/Config';

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
    date: task.date
      ? formattedDate(task.date, CONFIG.DATE_FORMAT)
      : todayDate(),
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
