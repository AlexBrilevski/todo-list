import { useState } from 'react';
import './App.css';
import ToDoList from './components/ToDoList';

const initTasksState = [
  { id: 't1', title: 'Food', isDone: true },
  { id: 't2', title: 'Books', isDone: false },
  { id: 't3', title: 'Games', isDone: false },
];

const App = () => {
  const [tasks, setTasks] = useState(initTasksState);

  const removeTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="App">
      <ToDoList
        title='What to buy'
        tasks={tasks}
        removeTask={removeTask}
      />
    </div>
  );
}

export default App;
