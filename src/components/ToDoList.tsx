import type { TaskType } from "./Task";
import Task from "./Task";

type ToDoListProps = {
  title: string,
  tasks: TaskType[],
  removeTask: (id: string) => void,
};

const ToDoList = (props: ToDoListProps) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map(task =>
          <Task
            key={task.id}
            removeTask={props.removeTask}
            {...task}
          />
        )}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};

export default ToDoList;
