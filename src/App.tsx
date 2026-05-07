import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import ToDoList from './components/ToDoList';

const initTasksState = [
  { id: v1(), title: 'Food', isDone: true },
  { id: v1(), title: 'Books', isDone: false },
  { id: v1(), title: 'Games', isDone: false },
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
