import { useState, type FC, type ChangeEvent, type KeyboardEvent } from "react";

type AddItemFormProps = {
  addItem: (title: string) => void,
};

const AddItemForm: FC<AddItemFormProps> = ({ addItem }) => {
  const [itemValue, setItemValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (itemValue.trim() !== '') {
      addItem(itemValue);
      setItemValue('');
    } else {
      setError('Title is required');
    }
  };

  const onChangeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setItemValue(e.target.value);
    setError(null);
  };

  const onNewTaskTitleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItemHandler();
    }
  };

  return (
    <>
      <div>
        <input
          className={error ? 'error' : undefined}
          value={itemValue}
          onChange={onChangeNewTaskTitle}
          onKeyUp={onNewTaskTitleKeyUp}
        />
        <button onClick={addItemHandler}>+</button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

export default AddItemForm;
