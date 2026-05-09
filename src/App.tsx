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

const initTodoListsState: Array<TodoListType> = [
  { id: v1(), title: 'What to buy', filter: 'all' },
  { id: v1(), title: 'What to learn', filter: 'all' },
];

const initTasksState: Array<TaskType> = [
  { id: v1(), title: 'Food', isDone: true },
  { id: v1(), title: 'Books', isDone: false },
  { id: v1(), title: 'Games', isDone: false },
];

const App: FC = () => {
  const [todos, setTodos] = useState<Array<TodoListType>>(initTodoListsState);
  const [tasks, setTasks] = useState<Array<TaskType>>(initTasksState);

  const addTask = (taskTitle: string) => {
    setTasks(prevTasks => [
      ...prevTasks,
      { id: v1(), title: taskTitle, isDone: false },
    ]);
  };

  const changeTaskStatus = (taskId: string, status: boolean) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === taskId ? { ...task, isDone: status } : task
    ));
  };

  const removeTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const setTodoListFilter = (todoId: string, filter: FilterValues) => {
    setTodos(prevTodos => prevTodos.map(todo => todo.id === todoId ? { ...todo, filter } : todo));
  };

  return (
    <div className="App">
      {todos.map(todo => {
        let filteredTasks = tasks;

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
