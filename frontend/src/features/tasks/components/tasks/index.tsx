import PageLayout from '@/components/layout/page-layout';
import { useQuery } from 'react-query';
import { API_GET_TASKS } from '@/api/task.api';
import toast from 'react-hot-toast';
import Spinner from '@/components/spinner';
import TaskItem from '@/features/tasks/components/task-item';

type Props = {
  title: string;
  filter?: string;
};

const Tasks = ({ title, filter }: Props) => {
  const { data, isLoading } = useQuery(title, () => API_GET_TASKS(filter), {
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const tasks = data?.data?.tasks || [];

  const tasksTitle = `${title} (${tasks.length} ${
    tasks.length === 1 ? 'task' : 'tasks'
  })`;

  return (
    <PageLayout className="flex-col">
      <h1 className="font-medium text-center sm:text-left md:text-2xl text-lg text-slate-200">
        {tasksTitle}
      </h1>
      <div className="flex justify-center mt-6">
        {isLoading ? (
          <Spinner />
        ) : tasks.length ? (
          <div className="mt-8 grid gap-2 gap-y-14 sm:gap-4 sm:gap-y-14 xl:gap-6 xl:gap-y-14 2xl:grid-cols-5 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {tasks.map((task) => (
              <TaskItem task={task} key={task._id} queryKey={title} />
            ))}
          </div>
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </PageLayout>
  );
};

export default Tasks;
