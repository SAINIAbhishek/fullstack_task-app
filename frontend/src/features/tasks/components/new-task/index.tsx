import PageLayout from '@/components/layout/page-layout';
import TaskForm from '../task-form';
import { useAuth } from '@/providers/auth-provider';
import { TaskType } from '../../types/task.type';
import { todayDate } from '@/utils/date';
import { useMutation } from 'react-query';
import { API_CREATE_TASK } from '@/api/task.api';
import toast from 'react-hot-toast';
import { useState } from 'react';

export const NewTask = () => {
  const { user } = useAuth();
  const [resetForm, setResetForm] = useState(false);

  const initialValues: TaskType = {
    user: user?._id ?? '',
    title: '',
    description: '',
    completed: false,
    important: false,
    date: todayDate(),
  };

  const { mutate, isError, isLoading } = useMutation(API_CREATE_TASK, {
    onSuccess: (response) => {
      setResetForm(true);
      toast.success(response.message);
    },
    onError: (err: Error) => {
      toast.error(err.message);
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
        title="Add a task"
        btnLabel="Add a task"
        isSubmitting={isLoading}
        isError={isError}
        initialValues={initialValues}
        key={resetForm ? 'reset' : 'form'}
      />
    </PageLayout>
  );
};

export default NewTask;
