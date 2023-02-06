import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useDispatch } from "react-redux";
import { connect } from "react-redux";
import { addTodo } from "../../actions/todoAction";
import { getTodoList } from "../../selectors/selectors";

import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../services/taskServices";
import "./Task.scss";

function Task(data) {
  const todos=data.todos;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(getTasks());
      const json = await res.json();
      dispatch(addTodo(json));
    };
    fetchData();
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    const maxId = Math.max(...todos.map((key) => key.id));
    const taskData = {
      id: maxId + 1,
      name: name,
      description: description,
      completed: false,
      date: new Date().toLocaleString(),
    };
    try {
      await addTask(taskData);
      dispatch(addTodo([...todos, taskData]));
    } catch (error) {
      console.log(error);

    }
  };

  const HandleUpdate = async (currentTask) => {
    try {
      const originalTasks = [...todos];
      const index = originalTasks.findIndex(
        (task) => task.name === currentTask.name
      );
      originalTasks[index] = { ...originalTasks[index] };
      originalTasks[index].completed = !originalTasks[index].completed;
      dispatch(addTodo(originalTasks));
      await updateTask(currentTask.name, {
        id: currentTask.id,
        name: currentTask.name,
        description: currentTask.description,
        completed: originalTasks[index].completed,
        date: currentTask.date,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const HandleDelete = async (currentTask) => {
    try {
      const tasksData = todos.filter((task) => task.name !== currentTask);
      dispatch(addTodo(tasksData));
      await deleteTask(currentTask);
    } catch (error) {
      console.log(error);
    }
  };
  let sortCompleted=[];
  if(todos.length){
    const sortData =todos.sort((a, b) => b.id - a.id);
    sortCompleted = sortData.sort((a, b) => a.completed - b.completed);

  }

  return (
    <div className="container app-todo">
      <div className="heading">TO-DO</div>
      <form onSubmit={HandleSubmit} className="form-todo">
        <input
          className="text-name"
          required={true}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <textarea
          className="text-desc"
          required={false}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button className="btn-add" type="submit">
          Add task
        </button>
      </form>
      <table id="task-info">
        <thead>
          <tr>
            <th>Task</th>
            <th> ✔</th>
            <th>x</th>
          </tr>
        </thead>
        <tbody>
          {sortCompleted.length &&
            sortCompleted.map((task) => (
              <tr key={task.id} className="task_container">
                <td>
                  <Link to={"/" + task.id}>
                    <div
                      className={task.completed ? "task line_through" : "task"}>
                      <div className="task_name">{task.name}</div>
                      <div className="task_desc">
                        Description : {task.description}
                      </div>
                    </div>
                  </Link>
                </td>
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    checked={task.completed ?? ""}
                    onChange={() => HandleUpdate(task)}
                    className="check-task"
                  />
                </td>
                <td>
                  <button
                    onClick={() => HandleDelete(task.name)}
                    className="btn-delete">
                    delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
const mapStateToProps = state => {
    const todos = getTodoList(state);
    return {todos} ;
  };
export default connect(mapStateToProps)(Task);

