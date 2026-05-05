export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
};

type TaskProps = TaskType & {
  removeTask: (id: string) => void,
};

const Task = (props: TaskProps) => {
  return (
    <li>
      <input type="checkbox" checked={props.isDone} />
      <span>{props.title}</span>
      <button onClick={() => props.removeTask(props.id)}>X</button>
    </li>
  );
};

export default Task;
