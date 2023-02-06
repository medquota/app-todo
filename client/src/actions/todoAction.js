import { ADD_TODO,UPDATE_TODO, DELETE_TODO } from "../actionTypes/actionTypes";

export const addTodo = content => ({
  type: ADD_TODO,
  payload:{content}

});
export const updateTodo = content => ({
  type: UPDATE_TODO,
  payload:{content}

});

export const deleteTodo = () => {
  return {
    type: DELETE_TODO,
  };
};
