import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import Task from "./Task";

const meta = {
  title: "TodoList/Task",
  component: Task,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    changeTaskTitle: {
      description: "Change task title callback",
    },
    changeTaskStatus: {
      description: "Change task status callback",
    },
    removeTask: {
      description: "Remove task callback",
    },
  },
  args: {
    changeTaskTitle: fn(),
    changeTaskStatus: fn(),
    removeTask: fn(),
  },
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    todoId: "TodoListId1",
    task: { id: "1", title: "Task title", isDone: false },
  }
};

export const Completed: Story = {
  args: {
    todoId: "TodoListId1",
    task: { id: "1", title: "Task title", isDone: true },
  }
};
