import React from 'react'
import { useParams,Link } from 'react-router-dom'

export default function TaskDetails(props) {
    const {details} =props;
    const {id} = useParams(); //get the URL parameters
    const tasksData =details.data;
  let taskDetail;
    tasksData.map(key =>{
    if(key.id == id){
      taskDetail=key;
    }
  })
  return (
    <div className='container'>
        <Link className="btn-back" to={"/"}> Back </Link>
        <h1>Details</h1>
        <p> Task : {taskDetail?.name ?? ""}</p>
        <p> description : {taskDetail?.description ?? ""}</p>
        <p> Date : {taskDetail?.date ?? ""}</p>
    </div>
  )
}