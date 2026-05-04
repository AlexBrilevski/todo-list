import './App.css';
import ToDoList from './components/ToDoList';

const App = () => {
  const tasks1 = [
    { id: 't1', title: 'Food', isDone: true },
    { id: 't2', title: 'Books', isDone: false },
    { id: 't3', title: 'Games', isDone: false },
  ];

  const tasks2 = [
    { id: 't1', title: 'HTML&CSS', isDone: true },
    { id: 't2', title: 'JavaScript', isDone: true },
    { id: 't3', title: 'React', isDone: false },
  ];

  return (
    <div className="App">
      <ToDoList
        title='What to buy'
        tasks={tasks1}
      />
      <ToDoList
        title='What to learn'
        tasks={tasks2}
      />
    </div>
  );
}

export default App;
