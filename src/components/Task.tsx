import type { FC, ChangeEvent } from "react";
import type { TaskType } from "../App";

type TaskProps = TaskType & {
  todoId: string,
  changeTaskStatus: (todoId: string, id: string, status: boolean) => void,
  removeTask: (todoId: string, id: string) => void,
};

const Task: FC<TaskProps> = ({
  id,
  todoId,
  title,
  isDone,
  changeTaskStatus,
  removeTask,
}) => {
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
      <span>{title}</span>
      <button onClick={() => removeTask(todoId, id)}>X</button>
    </li>
  );
};

export default Task;
