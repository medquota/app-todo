import axios from "axios";
const apiUrl = "http://localhost:4000/task/";

export function getTasks() {
    
    return apiUrl+"list";
}

export function addTask(task) {
    return axios.post(apiUrl+"add", task);
}

export function updateTask(name, task) {
    return axios.patch(apiUrl + "update/" + name, task);
}

export function deleteTask(name) {
    return axios.delete(apiUrl + "delete/" + name);
}
