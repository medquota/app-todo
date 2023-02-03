import React,{useState,useEffect} from "react";
import { Paper, TextField } from "@material-ui/core";
import { Checkbox, Button } from "@material-ui/core";
import {Link } from "react-router-dom";
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../services/taskServices"
import "./App.css";

function App() {
    const [tasks,setTasks]=useState([]);
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    console.log(getTasks().config);

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
        console.log(tasks,'tasks')
        const maxId= Math.max(...tasks.map(key => key.id));
        const taskData={
            id:maxId+1,
            name:name,
            description:description,
            completed:false,
            date: new Date().toLocaleString()
            
        };
        console.log(taskData,'taskData');
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
        console.log(currentTask,'currentTask')
        try {
            const tasksData = tasks.filter(
                (task) => task.name !== currentTask
            );
            console.log(tasksData,'tasksData')
            setTasks(tasksData );
            await deleteTask(currentTask);
        } catch (error) {
            console.log(error);
        }
    };
        const sortedData = [...tasks].sort((a, b) => b.id - a.id)
        const sortdata=sortedData.sort((a,b) => a.completed - b.completed);
        return (
        <div className="App flex">
            <RouteTask data={tasks}/>
            <Paper elevation={3} className="container app-todo">
                <div className="heading">TO-DO</div>
                <form
                    onSubmit={HandleSubmit}
                    className="flex"
                    style={{ margin: "15px 0" }}
                >
                    <TextField
                        variant="outlined"
                        size="small"
                        style={{ width: "40%" }}
                        required={true}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                    <TextField
                        variant="outlined"
                        size="small"
                        style={{ width: "40%" }}
                        required={false}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <Button
                        style={{ height: "40px" }}
                        color="primary"
                        variant="outlined"
                        type="submit"
                    >
                        Add task
                    </Button>
                </form>
                <div className="task_ready">
                    {sortdata.length
                    && sortdata.map((task) => (

                        <Paper
                            key={task.id}
                            className="flex task_container"
                        >
                            <Checkbox
                                checked={task.completed}
                                onClick={() => HandleUpdate(task)}
                                color="primary"
                            />
                                            <Link to={"/"+task.id}>
                            <div
                                className={
                                    task.completed
                                        ? "task line_through"
                                        : "task"
                                }
                            > 
                            <span className="task_id">{task.id} - </span>
                            <span className="task_name">{task.name}</span>
                            <span className="task_desc">{task.description}</span>
                            </div>
                            </Link>
                            <Button
                                onClick={() =>HandleDelete(task.name)}
                                color="secondary"
                            >
                                delete
                            </Button>
                        </Paper>
                    ))}
                </div>
            </Paper>
            </div>
        );
    }

export default App;
