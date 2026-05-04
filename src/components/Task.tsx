export type TaskProps = {
  id: string,
  title: string,
  isDone: boolean,
};

const Task = (props: TaskProps) => {
  return (
    <li>
      <input type="checkbox" checked={props.isDone} />
      <span>{props.title}</span>
    </li>
  );
};

export default Task;
