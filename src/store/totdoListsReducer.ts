import type { FilterValues, TodoListType } from "../App";
import { v1 } from 'uuid';

type AddTodoListAction = {
  type: 'ADD-TODOLIST',
  title: string,
};

type ChangeTodoListTitleAction = {
  type: 'CHANGE-TODOLIST-TITLE',
  id: string,
  title: string,
};

type ChangeTodoListFilterAction = {
  type: 'CHANGE-TODOLIST-FILTER',
  id: string,
  filter: FilterValues,
};

type RemovedTodoListAction = {
  type: 'REMOVE-TODOLIST',
  id: string,
};

type TodoListActions =
  AddTodoListAction |
  ChangeTodoListTitleAction |
  ChangeTodoListFilterAction |
  RemovedTodoListAction;

export const todoListsReducer = (state: Array<TodoListType>, action: TodoListActions): Array<TodoListType> => {
  switch (action.type) {
    case 'ADD-TODOLIST':
      return [
        ...state,
        { id: v1(), title: action.title, filter: 'all' },
      ];
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(todo => todo.id === action.id ?
        { ...todo, title: action.title } : todo);
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(todo => todo.id === action.id ?
        { ...todo, filter: action.filter } : todo);
    case 'REMOVE-TODOLIST':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

export const addTodoListAC = (title: string): AddTodoListAction => {
  return { type: 'ADD-TODOLIST', title };
};

export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAction => {
  return { type: 'CHANGE-TODOLIST-TITLE', id, title };
};

export const changeTodoListFilterAC = (id: string, filter: FilterValues): ChangeTodoListFilterAction => {
  return { type: 'CHANGE-TODOLIST-FILTER', id, filter };
};

export const removeTodoListAC = (id: string): RemovedTodoListAction => {
  return { type: 'REMOVE-TODOLIST', id };
};
