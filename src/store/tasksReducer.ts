import type { TasksStateType } from '../App';
import { v1 } from 'uuid';
import { TODOLIST_ACTION_TYPES, type AddTodoListAction, type RemovedTodoListAction } from './totdoListsReducer';

const TASK_ACTION_TYPES = {
  ADD: 'task/ADD',
  CHANGE_TITLE: 'task/CHANGE_TITLE',
  CHANGE_STATUS: 'task/CHANGE_STATUS',
  REMOVE: 'task/REMOVE',
} as const;

type AddTaskAction = ReturnType<typeof addTaskAC>;
type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>;
type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>;
type RemovedTaskAction = ReturnType<typeof removeTaskAC>;

type TaskActions =
  AddTaskAction |
  ChangeTaskTitleAction |
  ChangeTaskStatusAction |
  RemovedTaskAction |
  AddTodoListAction |
  RemovedTodoListAction;

export const tasksReducer = (state: TasksStateType, action: TaskActions): TasksStateType => {
  switch (action.type) {
    case TASK_ACTION_TYPES.ADD:
      return {
        ...state,
        [action.todoId]: [
          ...state[action.todoId],
          { id: v1(), title: action.title, isDone: false },
        ],
      };
    case TASK_ACTION_TYPES.CHANGE_TITLE:
      return {
        ...state,
        [action.todoId]: state[action.todoId].map(task =>
          task.id === action.taskId ? { ...task, title: action.title } : task
        ),
      };
    case TASK_ACTION_TYPES.CHANGE_STATUS:
      return {
        ...state,
        [action.todoId]: state[action.todoId].map(task =>
          task.id === action.taskId ? { ...task, isDone: action.status } : task
        ),
      };
    case TASK_ACTION_TYPES.REMOVE:
      return {
        ...state,
        [action.todoId]: state[action.todoId].filter(task => task.id !== action.taskId),
      };
    case TODOLIST_ACTION_TYPES.ADD:
      return { ...state, [action.id]: [] };
    case TODOLIST_ACTION_TYPES.REMOVE:
      delete state[action.id];
      return {...state};
    default:
      return state;
  }
};

export const addTaskAC = (todoId: string, title: string) => {
  return { type: TASK_ACTION_TYPES.ADD, todoId, title };
};

export const changeTaskTitleAC = (todoId: string, taskId: string, title: string) => {
  return { type: TASK_ACTION_TYPES.CHANGE_TITLE, todoId, taskId, title };
};

export const changeTaskStatusAC = (todoId: string, taskId: string, status: boolean) => {
  return { type: TASK_ACTION_TYPES.CHANGE_STATUS, todoId, taskId, status };
};

export const removeTaskAC = (todoId: string, taskId: string) => {
  return { type: TASK_ACTION_TYPES.REMOVE, todoId, taskId };
};
