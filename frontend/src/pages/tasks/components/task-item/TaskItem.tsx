import './TaskItemStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faCalendarDays,
  faPen,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { formattedDate } from '@/helpers/DateHelper';
import IconButton from '@/components/buttons/icon-btn/IconButton';
import { useMutation } from '@tanstack/react-query';
import {
  API_DELETE_TASK,
  API_TASK_TOGGLE_COMPLETED,
  API_TASK_TOGGLE_IMPORTANT,
} from '@/api/TaskApi';
import toast from 'react-hot-toast';
import { queryClient } from '@/lib/react-query/ReactQuery';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TaskType } from '../../../../types/TaskType';
import { TASKS_BASE_ROUTE } from '@/routes/TasksRoutes';

type Props = {
  task: TaskType;
  queryKey: string;
};

const TaskItem = ({ task, queryKey }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const taskId = task._id as string;

  const { mutate: deleteMutate } = useMutation({
    mutationFn: API_DELETE_TASK,
    onSuccess: (response) => {
      handleSuccessResponse(response.message);
    },
  });

  const { mutate: importantMutate } = useMutation({
    mutationFn: API_TASK_TOGGLE_IMPORTANT,
    onSuccess: (response) => {
      handleSuccessResponse(response.message);
    },
  });

  const { mutate: completedMutate } = useMutation({
    mutationFn: API_TASK_TOGGLE_COMPLETED,
    onSuccess: (response) => {
      handleSuccessResponse(response.message);
    },
  });

  const handleSuccessResponse = (message: string) => {
    void queryClient.invalidateQueries({ queryKey: [queryKey] });
    toast.success(message);
  };

  return (
    <div className="task-item__card">
      <h5 className="mb-2 font-bold tracking-tight text-white">{task.title}</h5>

      <p className="mb-8 font-normal text-gray-400">{task.description}</p>

      <div className="mt-auto text-gray-300 flex w-full items-center">
        <FontAwesomeIcon icon={faCalendarDays} className="mr-3" />
        {formattedDate(task.date)}
      </div>

      <div className="task-item__footer">
        <IconButton
          handleClick={() =>
            importantMutate({ taskId: taskId, important: !task.important })
          }
          title={
            task.important ? 'label.unmark_important' : 'label.mark_important'
          }
          className={`hover:bg-gray-700 ${task.important ? 'text-red-500 hover:text-red-600' : 'text-white'}`}>
          <FontAwesomeIcon icon={faStar} />
        </IconButton>

        <IconButton
          handleClick={() =>
            completedMutate({ taskId: taskId, completed: !task.completed })
          }
          title={
            task.completed ? 'label.mark_uncompleted' : 'label.mark_completed'
          }
          className={`hover:bg-gray-700 ${task.completed ? 'text-green-500 hover:text-green-600' : 'text-white'}`}>
          <FontAwesomeIcon icon={faCalendarCheck} />
        </IconButton>

        <IconButton
          handleClick={() => navigate(`${TASKS_BASE_ROUTE}/${task._id}/edit`)}
          title="label.edit_task"
          className="text-white hover:bg-gray-700">
          <FontAwesomeIcon icon={faPen} />
        </IconButton>

        <div className="w-[1px] h-[35px] ml-1 mr-2 bg-gray-700"></div>

        <IconButton
          handleClick={() => deleteMutate(taskId)}
          title="label.delete_task"
          className="text-white hover:bg-gray-700">
          <FontAwesomeIcon icon={faTrashCan} />
        </IconButton>
      </div>

      <span
        className={`task-item__badge ${
          task.completed
            ? 'bg-green-200 text-green-800'
            : 'bg-yellow-200 text-yellow-800'
        }`}>
        {task.completed ? t('label.completed') : t('label.uncompleted')}
      </span>
    </div>
  );
};

export default TaskItem;
