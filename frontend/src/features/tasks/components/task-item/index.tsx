import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faCalendarDays,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { formattedDate } from '@/utils/date.ts';
import './task-item.css';
import IconBtn from '@/components/buttons/icon-btn';

type Props = {
  task: TaskType;
};

const TaskItem = ({ task }: Props) => {
  return (
    <div className="task-item__card">
      <h5 className="mb-2 font-bold tracking-tight text-white">{task.title}</h5>
      <p className="mb-8 font-normal text-gray-400">{task.description}</p>
      <div className="mt-auto text-gray-300 flex w-full items-center">
        <FontAwesomeIcon icon={faCalendarDays} className="mr-3" />
        {formattedDate(task.date)}
      </div>
      <div className="task-item__footer">
        <IconBtn
          title={task.important ? 'mark as uncompleted' : 'mark as completed'}
          className={`hover:bg-gray-700 ${
            task.important
              ? 'text-green-500 hover:text-green-600'
              : 'text-white'
          }`}>
          <FontAwesomeIcon icon={faCalendarCheck} />
        </IconBtn>
        <IconBtn
          title={task.important ? 'unmark as important' : 'mark as important'}
          className={`hover:bg-gray-700 ${
            task.important ? 'text-red-500 hover:text-red-600' : 'text-white'
          }`}>
          <FontAwesomeIcon icon={faStar} />
        </IconBtn>
        <IconBtn title="Delete task" className="text-white hover:bg-gray-700">
          <FontAwesomeIcon icon={faTrashCan} />
        </IconBtn>
      </div>
      <span
        className={`task-item__badge ${
          task.completed
            ? 'bg-green-200 text-green-800'
            : 'bg-yellow-200 text-yellow-800'
        }`}>
        {task.completed ? 'Completed' : 'Uncompleted'}
      </span>
    </div>
  );
};

export default TaskItem;
