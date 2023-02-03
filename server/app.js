const express = require('express')
const fs = require('fs')
const app = express()
var cors = require('cors')

app.use(cors())
//this line is required to parse the request body
app.use(express.json())

//get the user data from json file
const getUserData = () => {
    const jsonData = fs.readFileSync('tasks.json')
    return JSON.parse(jsonData)    
}
/* Read - GET method */
app.get('/task/list', (req, res) => {
    const tasks = getUserData()
    res.send(tasks)
})
/* util functions ends */
//configure the server port
app.listen(4000, () => {
    console.log('Server runs on port 4000')
})