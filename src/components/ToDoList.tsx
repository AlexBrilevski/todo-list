import { useState } from "react";
import type { TaskType } from "./Task";
import Task from "./Task";

type ToDoListProps = {
  title: string,
  tasks: TaskType[],
  removeTask: (id: string) => void,
};

const ToDoList = ({title, tasks, removeTask}: ToDoListProps) => {
  const [filter, setFilter] = useState('all');

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
        <input />
        <button>+</button>
      </div>
      <ul>
        {filteredTasks.map(task =>
          <Task
            key={task.id}
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
