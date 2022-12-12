const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const locationController = require('./locations/locations.controller')
const userController = require('./users/users.controller')
const app = express()
const port = 3000


app.use(bodyParser.json())
app.use(userController)

app.listen(port, async() => {
	await mongoose.connect(process.env.MONGO_URI)
	console.log("Connected")
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)

})


app.get('/', (req, res) => {
	return res.status(200).send("hello world")
})

