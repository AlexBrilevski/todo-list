import { useState, type FC } from 'react';
import { v1 } from 'uuid';
import './App.css';
import ToDoList from './components/ToDoList';

export type FilterValues = 'all' | 'active' | 'completed';

type TodoListType = {
  id: string,
  title: string,
  filter: FilterValues,
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
};

type TasksType = {
  [id: string]: Array<TaskType>,
};

const todoListId1 = v1();
const todoListId2 = v1();

const initTodoListsState: Array<TodoListType> = [
  { id: todoListId1, title: 'What to buy', filter: 'all' },
  { id: todoListId2, title: 'What to learn', filter: 'all' },
];

const initTasksState: TasksType = {
  [todoListId1]: [
    { id: v1(), title: 'Food', isDone: true },
    { id: v1(), title: 'Books', isDone: false },
    { id: v1(), title: 'Games', isDone: false },
  ],
  [todoListId2]: [
    { id: v1(), title: 'HTML & CSS', isDone: true },
    { id: v1(), title: 'JavaScript/TypeScript', isDone: true },
    { id: v1(), title: 'React', isDone: true },
    { id: v1(), title: 'REST API', isDone: true },
    { id: v1(), title: 'GraphQL', isDone: false },
  ],
};

const App: FC = () => {
  const [todos, setTodos] = useState<Array<TodoListType>>(initTodoListsState);
  const [tasks, setTasks] = useState<TasksType>(initTasksState);

  const setTodoListFilter = (todoId: string, filter: FilterValues) => {
    setTodos(prevTodos => prevTodos.map(todo => todo.id === todoId ? { ...todo, filter } : todo));
  };

  const removeTodoList = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const addTask = (todoId: string, title: string) => {
    setTasks(prevTasks => ({
      ...prevTasks, [todoId]: [
        ...prevTasks[todoId],
        { id: v1(), title, isDone: false },
      ]
    }));
  };

  const changeTaskStatus = (todoId: string, taskId: string, status: boolean) => {
    setTasks(prevTasks => ({...prevTasks, [todoId]: prevTasks[todoId].map(task =>
      task.id === taskId ? { ...task, isDone: status } : task
    )}));
  };

  const removeTask = (todoId: string, taskId: string) => {
    setTasks(prevTasks => ({...prevTasks, [todoId]: prevTasks[todoId].filter(task => task.id !== taskId)}));
  };

  return (
    <div className="App">
      {todos.map(todo => {
        let filteredTasks = tasks[todo.id];

        if (todo.filter === 'active') {
          filteredTasks = filteredTasks.filter(task => !task.isDone);
        }

        if (todo.filter === 'completed') {
          filteredTasks = filteredTasks.filter(task => task.isDone);
        }

        return (
          <ToDoList
            key={todo.id}
            id={todo.id}
            title={todo.title}
            tasks={filteredTasks}
            filter={todo.filter}
            removeTodoList={removeTodoList}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            removeTask={removeTask}
            setFilter={setTodoListFilter}
          />
        );
      }
      )}
    </div>
  );
}

export default App;
