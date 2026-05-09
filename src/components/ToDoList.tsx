import { useState, type ChangeEvent, type FC, type KeyboardEvent } from "react";
import type { TaskType, FilterValues } from "../App";
import Task from "./Task";

type ToDoListProps = {
  id: string,
  title: string,
  tasks: Array<TaskType>,
  filter: FilterValues,
  removeTodoList: (id: string) => void,
  addTask: (id: string, title: string) => void,
  changeTaskStatus: (id: string, taskId: string, status: boolean) => void,
  removeTask: (id: string, taskId: string) => void,
  setFilter: (id: string, filter: FilterValues) => void,
};

const ToDoList: FC<ToDoListProps> = ({
  id,
  title,
  tasks,
  filter,
  removeTodoList,
  addTask,
  changeTaskStatus,
  removeTask,
  setFilter,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [taskTitleError, setTaskTitleError] = useState<string | null>(null);

  const addTaskHandler = () => {
    if (newTaskTitle.trim() !== '') {
      addTask(id, newTaskTitle);
      setNewTaskTitle('');
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

  const onSelectFilter = (filter: FilterValues) => {
    setFilter(id, filter);
  };

  return (
    <div>
      <h3>
        {title}
        <button onClick={() => removeTodoList(id)}>X</button>
      </h3>
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
        {tasks.map(task =>
          <Task
            key={task.id}
            todoId={id}
            changeTaskStatus={changeTaskStatus}
            removeTask={removeTask}
            {...task}
          />
        )}
      </ul>
      <div>
        <button
          className={filter === 'all' ? 'active-filter' : undefined}
          onClick={() => onSelectFilter('all')}>
          All
        </button>
        <button
          className={filter === 'active' ? 'active-filter' : undefined}
          onClick={() => onSelectFilter('active')}>
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active-filter' : undefined}
          onClick={() => onSelectFilter('completed')}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
