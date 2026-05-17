export type FilterValues = 'all' | 'active' | 'completed';

export type TodoListType = {
  id: string,
  title: string,
  filter: FilterValues,
};
