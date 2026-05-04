import './App.css';
import ToDoList from './components/ToDoList';

const App = () => {
  return (
    <div className="App">
      <ToDoList title='What to buy'/>
      <ToDoList title='What to learn'/>
    </div>
  );
}

export default App;
