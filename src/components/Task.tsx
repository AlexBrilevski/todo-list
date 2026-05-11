import type { FC, ChangeEvent } from "react";
import type { TaskType } from "../App";
import EditableSpan from "./UI/EditableSpan";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

type TaskProps = TaskType & {
  todoId: string,
  changeTaskTitle: (todoId: string, id: string, title: string) => void,
  changeTaskStatus: (todoId: string, id: string, status: boolean) => void,
  removeTask: (todoId: string, id: string) => void,
};

const Task: FC<TaskProps> = ({
  id,
  todoId,
  title,
  isDone,
  changeTaskTitle,
  changeTaskStatus,
  removeTask,
}) => {
  const onChangeTaskTitle = (title: string) => {
    changeTaskTitle(todoId, id, title);
  };

  const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(todoId, id, e.target.checked);
  };

  return (
    <li className={isDone ? 'is-done' : undefined}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={onChangeTaskStatus}
      />
      <EditableSpan text={title} onChangeText={onChangeTaskTitle} />
      <IconButton onClick={() => removeTask(todoId, id)}>
        <Delete />
      </IconButton>
    </li>
  );
};

export default Task;
