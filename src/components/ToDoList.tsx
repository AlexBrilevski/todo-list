import type { FC } from "react";
import type { TaskType, FilterValues } from "../App";
import AddItemForm from "./UI/AddItemForm";
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
  const onAddTask = (title: string) => {
    addTask(id, title);
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
      <AddItemForm addItem={onAddTask} />
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
