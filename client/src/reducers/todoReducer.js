import { ADD_TODO, DELETE_TODO } from "../actionTypes/actionTypes";

const initialState = {};

export default  function (state = initialState, action){
    console.log(state,'state');
  switch (action.type) {
    case ADD_TODO:
        const { content } = action.payload;
        return content;
        case DELETE_TODO:
            return {
              ...state,
            };

    case DELETE_TODO:
      return {
        ...state,
      };
    default:
      return state;
  }
};