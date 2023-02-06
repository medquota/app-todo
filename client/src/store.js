import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import todoReducer from "./reducers/todoReducer";

export default createStore(todoReducer, applyMiddleware(logger));
