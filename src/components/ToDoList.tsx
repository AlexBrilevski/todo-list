type ToDoListProps = {
  title: string
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
        <li><input type="checkbox" checked={true} /> <span>Food</span></li>
        <li><input type="checkbox" checked={true} /> <span>Books</span></li>
        <li><input type="checkbox" checked={false} /> <span>Games</span></li>
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
