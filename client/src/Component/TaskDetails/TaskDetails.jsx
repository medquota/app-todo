import React from "react";
import { useParams, Link } from "react-router-dom";
import "./TaskDetails.scss";

export default function TaskDetails(props) {
  const { details } = props;
  const { id } = useParams(); //get the URL parameters
  const tasksData = details.data;
  let taskDetail;
  tasksData.map((key) => {
    if (key.id == id) {
      taskDetail = key;
    }
    return key;
  });
  return (
    <div className="details-todo">
      <div className="modal show">
        <div className="modal-content">
          <Link to={"/"}>
            <span className="close">&times;</span>
          </Link>
          <h1>Details</h1>
          <p>Ref: {taskDetail?.id ?? ""} </p>
          <p> Task : {taskDetail?.name ?? ""}</p>
          <p> Description : {taskDetail?.description ?? ""}</p>
          <p> Date : {taskDetail?.date ?? ""}</p>
        </div>
      </div>
    </div>
  );
}
