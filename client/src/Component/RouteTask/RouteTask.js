import React from 'react'
import {Route, Routes } from 'react-router-dom';
import TaskDetails from "../TaskDetails/TaskDetails";
export default function RouteTask(tasks) {


  return (
    <>
            <Routes>
                <Route path="/:id" element={<TaskDetails details={tasks}/>} />
            </Routes>
    </>
  )
}