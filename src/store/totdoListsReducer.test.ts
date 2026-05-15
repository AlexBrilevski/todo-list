import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListsReducer
} from './totdoListsReducer';
import type { FilterValues, TodoListType } from '../App';
import { v1 } from 'uuid';

let todoListId1: string;
let todoListId2: string;
let startState: Array<TodoListType>;

beforeEach(() => {
  todoListId1 = v1();
  todoListId2 = v1();

  startState = [
    {
      id: todoListId1,
      title: "What to learn",
      filter: "all",
    },
    {
      id: todoListId2,
      title: "What to buy",
      filter: "all"
    },
  ];
});

test('Todo list is correctly added', () => {
  const newTodolistTitle = "New Todolist";
  const action = addTodoListAC(newTodolistTitle);

  const endState = todoListsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});

test('Todo list title changes correctly', () => {
  const newTodolistTitle = "New Todolist";
  const action = changeTodoListTitleAC(todoListId2, newTodolistTitle);

  const endState = todoListsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('Todo list filter changes correctly', () => {
  const newFilter: FilterValues = "completed";
  const action = changeTodoListFilterAC(todoListId2, newFilter);

  const endState = todoListsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});


test('Todo list is correctly removed', () => {
  const action = removeTodoListAC(todoListId1);

  const endState = todoListsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});
