import { memo, useCallback, type FC, type ChangeEvent } from 'react';
import type { TaskType } from '../../models/task';
import EditableSpan from '../UI/EditableSpan';
import { Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

type TaskProps = {
  todoId: string,
  task: TaskType,
  changeTaskTitle: (todoId: string, id: string, title: string) => void,
  changeTaskStatus: (todoId: string, id: string, status: boolean) => void,
  removeTask: (todoId: string, id: string) => void,
};

const Task: FC<TaskProps> = memo(({
  todoId,
  task,
  changeTaskTitle,
  changeTaskStatus,
  removeTask,
}) => {
  const { id, title, isDone } = task;

  const onChangeTaskTitle = useCallback((title: string) => {
    changeTaskTitle(todoId, id, title);
  }, [changeTaskTitle, todoId, id]);

  const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(todoId, id, e.target.checked);
  };

  return (
    <div className={isDone ? 'is-done' : undefined}>
      <Checkbox
        color="primary"
        checked={isDone}
        onChange={onChangeTaskStatus}
      />
      <EditableSpan text={title} onChangeText={onChangeTaskTitle} />
      <IconButton onClick={() => removeTask(todoId, id)}>
        <Delete />
      </IconButton>
    </div>
  );
});

export default Task;
