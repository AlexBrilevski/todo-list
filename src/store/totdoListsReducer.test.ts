import { todoListsReducer } from './totdoListsReducer';
import type { FilterValues, TodoListType } from '../App';
import { v1 } from 'uuid';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListType>;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all"
    },
  ];
});

test('Todo list is correctly added', () => {
  const newTodolistTitle = "New Todolist";
  const action = {
    type: 'ADD-TODOLIST' as const,
    title: newTodolistTitle,
  };

  const endState = todoListsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});

test('Todo list name changes correctly', () => {
  const newTodolistTitle = "New Todolist";
  const action = {
    type: 'CHANGE-TODOLIST-TITLE' as const,
    id: todolistId2,
    title: newTodolistTitle,
  };

  const endState = todoListsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('Todo list filter changes correctly', () => {
  const newFilter: FilterValues = "completed";
  const action = {
    type: 'CHANGE-TODOLIST-FILTER' as const,
    id: todolistId2,
    filter: newFilter,
  };

  const endState = todoListsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});


test('Todo list is correctly removed', () => {
  const action = {
    type: 'REMOVE-TODOLIST' as const,
    id: todolistId1,
  };

  const endState = todoListsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});
