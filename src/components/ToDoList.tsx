import { useState, type ChangeEvent, type FC, type KeyboardEvent } from "react";
import type { TaskType } from "./Task";
import Task from "./Task";

type ToDoListProps = {
  title: string,
  tasks: TaskType[],
  addTask: (title: string) => void,
  changeTaskStatus: (id: string, status: boolean) => void,
  removeTask: (id: string) => void,
};

type FilterValues = 'all' | 'active' | 'completed';

const ToDoList: FC<ToDoListProps> = ({
  title,
  tasks,
  addTask,
  changeTaskStatus,
  removeTask,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [filter, setFilter] = useState<FilterValues>('all');
  const [taskTitleError, setTaskTitleError] = useState<string|null>(null);

  const addTaskHandler = () => {
    if (newTaskTitle.trim() !== '') {
      addTask(newTaskTitle);
      setNewTaskTitle('');
      setTaskTitleError(null);
    } else {
      setTaskTitleError('Title is required');
    }
  };

  const onChangeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
    setTaskTitleError(null);
  };

  const onNewTaskTitleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler();
    }
  };

  let filteredTasks = tasks;

  if (filter === 'active') {
    filteredTasks = filteredTasks.filter(task => !task.isDone);
  }

  if (filter === 'completed') {
    filteredTasks = filteredTasks.filter(task => task.isDone);
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          className={taskTitleError ? 'error' : undefined}
          value={newTaskTitle}
          onChange={onChangeNewTaskTitle}
          onKeyUp={onNewTaskTitleKeyUp}
        />
        <button onClick={addTaskHandler}>+</button>
      </div>
      {taskTitleError && <div className="error-message">{taskTitleError}</div>}
      <ul>
        {filteredTasks.map(task =>
          <Task
            key={task.id}
            changeTaskStatus={changeTaskStatus}
            removeTask={removeTask}
            {...task}
          />
        )}
      </ul>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
    </div>
  );
};

export default ToDoList;
