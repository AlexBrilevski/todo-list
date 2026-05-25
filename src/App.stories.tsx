import type { Meta, StoryObj } from "@storybook/react-vite";
import { v1 } from "uuid";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { todoListsReducer } from "./store/todoListsReducer";
import { tasksReducer } from "./store/tasksReducer";
import type { AppRootState } from "./store/store";

import App from "./App";

const mockPreloadedState = {
  todos: [
    { id: "todolistId1", title: "What to learn", filter: "all" },
    { id: "todolistId2", title: "What to buy", filter: "all" },
  ],
  tasks: {
    "todolistId1": [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
    ],
    "todolistId2": [
      { id: v1(), title: "Bread", isDone: true },
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Book", isDone: false, },
    ],
  },
};

const rootReducer = combineReducers({
  todos: todoListsReducer,
  tasks: tasksReducer,
});

const mockStore = createStore(rootReducer, mockPreloadedState as AppRootState);

const meta = {
  title: "TodoList/App",
  component: App,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <Provider store={mockStore}>
          <Story />
        </Provider>
      );
    },
  ],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
