import PageLayout from '@/components/layout/page-layout/PageLayout';
import { API_GET_TASKS } from '@/api/TaskApi';
import Spinner from '@/components/spinner/Spinner';
import TaskItem from '@/pages/tasks/components/task-item/TaskItem';
import PrimaryButton from '@/components/buttons/primary-btn/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { TASKS_BASE_ROUTE } from '@/routes/TasksRoutes';

type Props = {
  title: string;
  filter?: string;
};

const Tasks = ({ title, filter }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: [title],
    queryFn: () => API_GET_TASKS(filter),
  });

  const tasks = data?.data?.tasks || [];

  return (
    <PageLayout className="flex-col">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-center sm:text-left md:text-2xl text-lg text-slate-200">
          {t(title)} {t('title.task', { count: tasks.length })}
        </h1>
        <PrimaryButton
          title="button.add_new_task"
          className="px-5"
          handleClick={() => navigate(`${TASKS_BASE_ROUTE}/new`)}
        />
      </div>

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
          <p>{t('no_task')}</p>
        )}
      </div>
    </PageLayout>
  );
};

export default Tasks;
