import { useState, type FC } from 'react';
import { v1 } from 'uuid';
import './App.css';
import AppHeader from './components/AppHeader';
import AddItemForm from './components/UI/AddItemForm';
import ToDoList from './components/ToDoList';
import { Container, Grid, Paper } from '@mui/material';

export type FilterValues = 'all' | 'active' | 'completed';

export type TodoListType = {
  id: string,
  title: string,
  filter: FilterValues,
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
};

type TasksStateType = {
  [key: string]: Array<TaskType>,
};

const todoListId1 = v1();
const todoListId2 = v1();

const initTodoListsState: Array<TodoListType> = [
  { id: todoListId1, title: 'What to buy', filter: 'all' },
  { id: todoListId2, title: 'What to learn', filter: 'all' },
];

const initTasksState: TasksStateType = {
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
  const [tasks, setTasks] = useState<TasksStateType>(initTasksState);

  const addTodoList = (title: string) => {
    const id = v1();
    setTodos(prevTodos => [...prevTodos, { id, title, filter: 'all' }]);
    setTasks(prevTasks => ({ ...prevTasks, [id]: [] }));
  };

  const setTodoListTitle = (id: string, title: string) => {
    setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, title } : todo));
  };

  const setTodoListFilter = (id: string, filter: FilterValues) => {
    setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, filter } : todo));
  };

  const removeTodoList = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    setTasks(prevTasks => {
      const newTasks = {...prevTasks};
      delete newTasks[id];
      return newTasks;
    });
  };

  const addTask = (todoId: string, title: string) => {
    setTasks(prevTasks => ({
      ...prevTasks, [todoId]: [
        ...prevTasks[todoId],
        { id: v1(), title, isDone: false },
      ]
    }));
  };

  const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
    setTasks(prevTasks => ({
      ...prevTasks, [todoId]: prevTasks[todoId].map(task =>
        task.id === taskId ? { ...task, title } : task
      )
    }));
  };

  const changeTaskStatus = (todoId: string, taskId: string, status: boolean) => {
    setTasks(prevTasks => ({
      ...prevTasks, [todoId]: prevTasks[todoId].map(task =>
        task.id === taskId ? { ...task, isDone: status } : task
      )
    }));
  };

  const removeTask = (todoId: string, taskId: string) => {
    setTasks(prevTasks => ({ ...prevTasks, [todoId]: prevTasks[todoId].filter(task => task.id !== taskId) }));
  };

  return (
    <div className="App">
      <AppHeader />
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3} style={{ padding: "20px" }}>
          {todos.map(todo => {
            let filteredTasks = tasks[todo.id];

            if (todo.filter === "active") {
              filteredTasks = filteredTasks.filter(task => !task.isDone);
            }

            if (todo.filter === "completed") {
              filteredTasks = filteredTasks.filter(task => task.isDone);
            }

            return (
              <Grid key={todo.id}>
                <Paper style={{ padding: "10px" }}>
                  <ToDoList
                    id={todo.id}
                    title={todo.title}
                    tasks={filteredTasks}
                    filter={todo.filter}
                    setTodoListTitle={setTodoListTitle}
                    removeTodoList={removeTodoList}
                    addTask={addTask}
                    changeTaskTitle={changeTaskTitle}
                    changeTaskStatus={changeTaskStatus}
                    removeTask={removeTask}
                    setFilter={setTodoListFilter}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
