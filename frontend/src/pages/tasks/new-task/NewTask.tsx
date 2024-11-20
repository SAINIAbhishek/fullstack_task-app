import PageLayout from '@/components/layout/page-layout/PageLayout';
import { todayDate } from '@/helpers/DateHelper';
import { useMutation } from '@tanstack/react-query';
import { API_CREATE_TASK } from '@/api/TaskApi';
import toast from 'react-hot-toast';
import { useState } from 'react';
import useAuthContext from '@/contexts/auth-context/useAuthContext';
import TaskForm from '@/pages/tasks/components/task-form/TaskForm';
import { TaskType } from '@/types/TaskType';

const NewTask = () => {
  const { user } = useAuthContext();
  const [resetForm, setResetForm] = useState(false);

  const initialValues: TaskType = {
    user: user?._id ?? '',
    title: '',
    description: '',
    completed: false,
    important: false,
    date: todayDate(),
  };

  const { mutate, isError, isPending } = useMutation({
    mutationFn: API_CREATE_TASK,
    onSuccess: (response) => {
      setResetForm(true);
      toast.success(response.message);
    },
  });

  const handleSubmit = (values: TaskType) => {
    setResetForm(false);
    mutate(values);
  };

  return (
    <PageLayout className="flex flex-col items-center justify-center px-6 py-8">
      <TaskForm
        handleSubmit={handleSubmit}
        title="title.add_task"
        btnLabel="button.add_task"
        isSubmitting={isPending}
        isError={isError}
        initialValues={initialValues}
        key={resetForm ? 'reset' : 'form'}
      />
    </PageLayout>
  );
};

export default NewTask;
