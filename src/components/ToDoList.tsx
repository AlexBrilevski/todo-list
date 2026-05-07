import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { TaskType } from "./Task";
import Task from "./Task";

type ToDoListProps = {
  title: string,
  tasks: TaskType[],
  addTask: (title: string) => void,
  removeTask: (id: string) => void,
};

type FilterValues = 'all' | 'active' | 'completed';

const ToDoList = ({ title, tasks, addTask, removeTask }: ToDoListProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [filter, setFilter] = useState<FilterValues>('all');

  const addTaskHandler = () => {
    if (newTaskTitle.trim().length > 0) {
      addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const onChangeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
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
          value={newTaskTitle}
          onChange={onChangeNewTaskTitle}
          onKeyUp={onNewTaskTitleKeyUp}
        />
        <button onClick={addTaskHandler}>+</button>
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
