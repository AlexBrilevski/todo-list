import { render } from "@testing-library/react";
import AddItemForm from "../components/UI/AddItemForm/AddItemForm";
import EditableSpan from "../components/UI/EditableSpan/EditableSpan";
import Task from "../components/Task/Task";

describe('AddItemForm component', () => {
  it("Matches the snapshot", () => {
    const { asFragment } = render(
      <AddItemForm addItem={() => { }} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('EditableSpan component', () => {
  it("Matches the snapshot", () => {
    const { asFragment } = render(
      <EditableSpan text="Title" onChangeText={() => { }} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Task component', () => {
  it("Completed state matches the snapshot", () => {
    const mockTask = { id: "t1", title: "Title", isDone: true };
    const { asFragment } = render(
      <Task
        todoId="todoId1"
        task={mockTask}
        changeTaskTitle={() => { }}
        changeTaskStatus={() => { }}
        removeTask={() => { }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("Active state matches the snapshot", () => {
    const mockTask = { id: "t1", title: "Title", isDone: false };
    const { asFragment } = render(
      <Task
        todoId="todoId1"
        task={mockTask}
        changeTaskTitle={() => { }}
        changeTaskStatus={() => { }}
        removeTask={() => { }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
