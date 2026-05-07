import { useState, type FC } from 'react';
import { v1 } from 'uuid';
import './App.css';
import ToDoList from './components/ToDoList';

const initTasksState = [
  { id: v1(), title: 'Food', isDone: true },
  { id: v1(), title: 'Books', isDone: false },
  { id: v1(), title: 'Games', isDone: false },
];

const App: FC = () => {
  const [tasks, setTasks] = useState(initTasksState);

  const addTask = (taskTitle: string) => {
    setTasks(prevTasks => [
      ...prevTasks,
      { id: v1(), title: taskTitle, isDone: false },
    ]);
  };

  const removeTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="App">
      <ToDoList
        title='What to buy'
        tasks={tasks}
        addTask={addTask}
        removeTask={removeTask}
      />
    </div>
  );
}

export default App;
