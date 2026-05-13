import type { TodoListType } from "../App";

type ActionType = {
  type: string,
  [key: string]: any
};

export const todoListsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
  switch (action.type) {
    case '':
      return state;
    default:
      return state;
  }
};
