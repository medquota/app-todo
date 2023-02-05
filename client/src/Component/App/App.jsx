import React, { useState, useEffect } from "react";
import RouteTask from "../RouteTask/RouteTask";
import {
  getTasks,
} from "../services/taskServices";
import "./App.scss";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(getTasks());
      const json = await res.json();
      setTasks(json);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <RouteTask data={tasks} />
    </div>
  );
}

export default App;
