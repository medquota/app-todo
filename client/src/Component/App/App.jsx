import React,{useState,useEffect} from "react";
//import { Paper, TextField } from "@material-ui/core";
//import { Checkbox, Button } from "@material-ui/core";
import {Link } from "react-router-dom";
import RouteTask from '../RouteTask/RouteTask';
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../services/taskServices"
import "./App.scss";

function App() {
    const [tasks,setTasks]=useState([]);
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");

    useEffect(() => {
        const fetchData = async () => {
          const res = await fetch(
            getTasks()
          );
          const json = await res.json();
          setTasks(json);
        };
        fetchData();
      }, []);

     const HandleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();
        const maxId= Math.max(...tasks.map(key => key.id));
        const taskData={
            id:maxId+1,
            name:name,
            description:description,
            completed:false,
            date: new Date().toLocaleString()
            
        };
        try {
            await addTask(taskData);
        } catch (error) {
            console.log(error);
        }
        setTasks(tasks => [...tasks, taskData])
    };
    
     const HandleUpdate = async (currentTask) => {
        try {
            const originalTasks = [...tasks];
            const index = originalTasks.findIndex((task) => task.name === currentTask.name);
            originalTasks[index] = { ...originalTasks[index] };
            originalTasks[index].completed = !originalTasks[index].completed;
            setTasks(originalTasks);
            await updateTask(currentTask.name, {
                id:currentTask.id,
                name:currentTask.name,
                description:currentTask.description,
                completed: originalTasks[index].completed,
            });
        } catch (error) {
            console.log(error);
        }
    };
    
     const HandleDelete = async (currentTask) => {
        try {
            const tasksData = tasks.filter(
                (task) => task.name !== currentTask
            );
            setTasks(tasksData );
            await deleteTask(currentTask);
        } catch (error) {
            console.log(error);
        }
    };
        const sortedData = [...tasks].sort((a, b) => b.id - a.id)
        const sortdata=sortedData.sort((a,b) => a.completed - b.completed);
        return (
        <div className="App">
            <div className="container app-todo">
                <div className="heading">TO-DO</div>
                <form
                    onSubmit={HandleSubmit}
                    className="form-todo"
                >
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
                    <button
                       className="btn-add"
                        type="submit"
                    >
                        Add task
                    </button>
                </form>
                <table id="task-info">
                <tr>
                    <th>Task</th>
                    <th> ✔</th>
                    <th>x</th>
                </tr>
                    {sortdata.length
                    && sortdata.map((task) => (
                        <tr key={task.id}className="task_container">
                            <td>
                                <Link to={"/"+task.id}>
                            <div
                                className={
                                    task.completed
                                        ? "task line_through"
                                        : "task"
                                }
                            > 
                            <div className="task_name"> {task.name}</div>
                            <div className="task_desc">Description : {task.description} </div>
                            </div>
                            </Link>
                            </td>
                            <td>
                            <input type="checkbox"
                                defaultChecked={false}
                                checked={task.completed ?? ""}
                                onClick={() => HandleUpdate(task)}
                                className="check-task"
                            />
                            </td>
                                <td>
                            <button
                                onClick={() =>HandleDelete(task.name)}
                                className="btn-delete"
                            >
                                delete
                            </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
            <div className="details-todo">
            <RouteTask data={tasks}/>
            </div>
            </div>
        );
    }

export default App;
