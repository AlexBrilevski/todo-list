import { combineReducers, createStore } from 'redux';
import { todoListsReducer } from './totdoListsReducer';
import { tasksReducer } from './tasksReducer';

export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  todos: todoListsReducer,
  tasks: tasksReducer,
});

export const store = createStore(rootReducer);
