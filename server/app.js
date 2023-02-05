const express = require('express')
const fs = require('fs')
const app = express()
var cors = require('cors')

app.use(cors())
//this line is required to parse the request body
app.use(express.json())

//get the task data from json file
const getTaskData = () => {
    const jsonData = fs.readFileSync('tasks.json')
    return JSON.parse(jsonData)    
}
/* Read - GET method */
app.get('/task/list', (req, res) => {
    const tasks = getTaskData()
    res.send(tasks)
})
/* Create - POST method */
app.post('/task/add', (req, res) => {
    //get the existing task data
    const existTasks = getTaskData()
    
    //get the new task data from post request
    const taskData = req.body
    //check if the taskData fields are missing
    if (taskData.name == null) {
        return res.status(401).send({error: true, msg: 'task data missing'})
    }
    /* Update - Patch method */
app.patch('/task/update/:name', (req, res) => {
    //get the id from url
    const names = req.params.name
    //get the update data
    const taskData = req.body
    //get the existing task data
    const existTasks = getTaskData()

    //check if the task exist or not       
    const findExist = existTasks.filter( task => task.name !== names )
    //const findExist = existTasks.map( task => task.id === id )
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'task not exist'})
    }
    //filter the taskdata
    const updateTask = existTasks.filter( task => task.name !== names )
    //push the updated data
    updateTask.push(taskData)
    //finally save it
    saveTaskData(updateTask)
    res.send({success: true, msg: 'task data updated successfully'})
})
/* Delete - Delete method */
app.delete('/task/delete/:name', (req, res) => {
    const name = req.params.name
    //get the existing taskdata
    const existTasks = getTaskData()
    //filter the Taskdata to remove it
    const filterTask = existTasks.filter( task => task.name !== name )
    if ( existTasks.length === filterTask.length ) {
        return res.status(409).send({error: true, msg: 'task does not exist'})
    }
    //save the filtered data
    saveTaskData(filterTask)
    res.send({success: true, msg: 'task removed successfully'})
    
})
/* util functions */
//read the task data from json file
const saveTaskData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('tasks.json', stringifyData)
}
    //check if the task exist already
    const findExist = existTasks.find( task => task.name === taskData.name )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'task already exist'})
    }
    //append the task data
    existTasks.push(taskData)
    //save the new task data
    saveTaskData(existTasks);
    res.send({success: true, msg: 'Task data added successfully'})
})
/* util functions ends */
//configure the server port
app.listen(4000, () => {
    console.log('Server runs on port 4000')
})