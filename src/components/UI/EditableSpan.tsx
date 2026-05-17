import { useState, type FC, type ChangeEvent } from 'react';
import { TextField } from '@mui/material';

type EditableSpanProps = {
  text: string,
  onChangeText: (text: string) => void,
};

const EditableSpan: FC<EditableSpanProps> = ({ text, onChangeText }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(text);
  const [error, setError] = useState<string | null>(null);

  const enableEditMode = () => {
    setEditMode(true);
  };

  const disableEditMode = () => {
    if (value.trim() !== '') {
      setEditMode(false);
      onChangeText(value)
    } else {
      setError('Title is required');
    }
  };

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setError(null);
  }

  return editMode ?
    <TextField
      label="Title"
      value={value}
      onChange={onChangeValue}
      onBlur={disableEditMode}
      error={!!error}
      helperText={error}
      size="small"
      autoFocus
    />
    :
    <span onDoubleClick={enableEditMode}>{text}</span>;
};

export default EditableSpan;
