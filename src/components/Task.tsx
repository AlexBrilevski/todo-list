import { type FC } from "react";

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
};

type TaskProps = TaskType & {
  removeTask: (id: string) => void,
};

const Task: FC<TaskProps> = ({ id, title, isDone, removeTask }) => {
  return (
    <li>
      <input type="checkbox" checked={isDone} />
      <span>{title}</span>
      <button onClick={() => removeTask(id)}>X</button>
    </li>
  );
};

export default Task;
