import type { FC, ChangeEvent } from "react";

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
};

type TaskProps = TaskType & {
  changeTaskStatus: (id: string, status: boolean) => void,
  removeTask: (id: string) => void,
};

const Task: FC<TaskProps> = ({
  id,
  title,
  isDone,
  changeTaskStatus,
  removeTask,
}) => {
  const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(id, e.target.checked);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={isDone}
        onChange={onChangeTaskStatus}
      />
      <span>{title}</span>
      <button onClick={() => removeTask(id)}>X</button>
    </li>
  );
};

export default Task;
