const http = require('http')
const express = require('express')
const io = require('socket.io')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const server = http.Server(app)
const socketio = io(server)

socketio.on('connection', client => {
	console.log('connected to io!')
})

const MongoURI = 'mongodb://localhost:'
const MongoPort = '27017'
const DB = 'chat'
const PORT = 3004
mongoose.connect(`${MongoURI}:${MongoPort}/${DB}`,
			{useNewUrlParser: true, useUnifiedTopology : true}, (error) =>{
			mongoose.Promise = global.Promise
			mongoose.connection.on('error', error => {
				console.log(`error with mongodb :` + error)
			})
			console.log('connected to collection ' + DB)
			server.listen(PORT, console.log(`server is running on ${PORT}`))
			})

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

var Contact = require('./models/Contact')
var Message = require('./models/Message')

app.get('/', (req, res) => {
	res.send('Welcome to chat api!')
})


