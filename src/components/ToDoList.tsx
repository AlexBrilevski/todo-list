import { useCallback, type FC } from 'react';
import type { TaskType } from '../models/task';
import type { FilterValues } from '../models/todo';
import AddItemForm from './UI/AddItemForm';
import Task from './Task';
import EditableSpan from './UI/EditableSpan';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

type ToDoListProps = {
  id: string,
  title: string,
  tasks: Array<TaskType>,
  filter: FilterValues,
  setTodoListTitle: (id: string, title: string) => void
  removeTodoList: (id: string) => void,
  addTask: (id: string, title: string) => void,
  changeTaskTitle: (id: string, taskId: string, title: string) => void,
  changeTaskStatus: (id: string, taskId: string, status: boolean) => void,
  removeTask: (id: string, taskId: string) => void,
  setFilter: (id: string, filter: FilterValues) => void,
};

const ToDoList: FC<ToDoListProps> = ({
  id,
  title,
  tasks,
  filter,
  setTodoListTitle,
  removeTodoList,
  addTask,
  changeTaskTitle,
  changeTaskStatus,
  removeTask,
  setFilter,
}) => {
  const onAddTask = useCallback((title: string) => {
    addTask(id, title);
  }, [addTask, id]);

  const onChangeTitle = (title: string) => {
    setTodoListTitle(id, title);
  };

  const onSelectFilter = (filter: FilterValues) => {
    setFilter(id, filter);
  };

  return (
    <div>
      <h3>
        <EditableSpan text={title} onChangeText={onChangeTitle} />
        <IconButton onClick={() => removeTodoList(id)}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={onAddTask} />
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {tasks.map(task =>
          <Task
            key={task.id}
            todoId={id}
            changeTaskTitle={changeTaskTitle}
            changeTaskStatus={changeTaskStatus}
            removeTask={removeTask}
            {...task}
          />
        )}
      </ul>
      <div>
        <Button
          color="primary"
          variant={filter === "all" ? "outlined" : "text"}
          onClick={() => onSelectFilter('all')}>
          All
        </Button>
        <Button
          color="error"
          variant={filter === "active" ? "outlined" : "text"}
          onClick={() => onSelectFilter('active')}>
          Active
        </Button>
        <Button
          color="success"
          variant={filter === "completed" ? "outlined" : "text"}
          onClick={() => onSelectFilter("completed")}>
          Completed
        </Button>
      </div>
    </div>
  );
};

export default ToDoList;
