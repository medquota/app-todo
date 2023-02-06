export const getTodosState = store => store;

export const getTodoList = store =>
  getTodosState(store) ? getTodosState(store) : [];
