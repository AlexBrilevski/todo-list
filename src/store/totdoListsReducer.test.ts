import { todoListsReducer } from './totdoListsReducer';
import type { FilterValues, TodoListType } from '../App';
import { v1 } from 'uuid';

test('Todo list is correctly added', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   let newTodolistTitle = "New Todolist";

   const startState: Array<TodoListType> = [
       {id: todolistId1, title: "What to learn", filter: "all"},
       {id: todolistId2, title: "What to buy", filter: "all"}
   ]

   const endState = todoListsReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle})

   expect(endState.length).toBe(3);
   expect(endState[2].title).toBe(newTodolistTitle);
});

test('Todo list name changes correctly', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   let newTodolistTitle = "New Todolist";

   const startState: Array<TodoListType> = [
       {id: todolistId1, title: "What to learn", filter: "all"},
       {id: todolistId2, title: "What to buy", filter: "all"}
   ]

   const action = {
       type: 'CHANGE-TODOLIST-TITLE',
       id: todolistId2,
       title: newTodolistTitle
   };

   const endState = todoListsReducer(startState, action);

   expect(endState[0].title).toBe("What to learn");
   expect(endState[1].title).toBe(newTodolistTitle);
});

test('Todo list filter changes correctly', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   let newFilter: FilterValues = "completed";

   const startState: Array<TodoListType> = [
       {id: todolistId1, title: "What to learn", filter: "all"},
       {id: todolistId2, title: "What to buy", filter: "all"}
   ]

   const action = {
       type: 'CHANGE-TODOLIST-FILTER',
       id: todolistId2,
       filter: newFilter
   };

   const endState = todoListsReducer(startState, action);

   expect(endState[0].filter).toBe("all");
   expect(endState[1].filter).toBe(newFilter);
});


test('Todo list is correctly removed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ]

  const endState = todoListsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1 })

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});
