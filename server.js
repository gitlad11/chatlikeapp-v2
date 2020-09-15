const http = require('http')
const express = require('express')
const io = require('socket.io')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()
const server = http.Server(app)
const socketio = io(server)

socketio.on('connection', client => {
	console.log('connected to io!')
})

var imgStorage = multer.diskStorage({
	destination : (req, file, callback) =>{
		callback(null , 'avatars')
	},
	filename : (req, file, callback) => {
		callback(null , file.fieldname + '-' + Date.now())
	}
})

var imgFilter = (req, file , callback) =>{
	if(file.mimetype === "image/png" ||
	 	file.mimetype === "image/jpg" || 
	 	file.mimetype === "image/jpeg"){
		callback(null, true)
	} else {
		callback(null , false)
	}
}
multer({
  limits: { fieldSize: 25 * 1024 * 1024 }
})

var imgHandler = multer({ storage : imgStorage, fileFilter : imgFilter })

const MongoURI = 'mongodb://localhost:27017'
const DB = 'test'
const PORT = 3004
mongoose.connect(`${MongoURI}/${DB}`,
			{useNewUrlParser: true, useUnifiedTopology : true}, (error) =>{
			mongoose.Promise = global.Promise
			mongoose.connection.on('error', error => {
				console.log(`error with mongodb :` + error)
			})
			console.log('connected to collection ' + DB)
			server.listen(PORT, console.log(`server is running on ${PORT}`))
			})
app.use(cors({
	origin : "http://localhost:3000",
	credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(express.Router())
const Contact = require('./models/Contact')
const Message = require('./models/Message')


//////////ROUTER
app.get('/', (req, res) => {
	res.send('Welcome to chat api!')
})

app.get('/contacts', (req, res) => {
	Contact.find({}).exec()
	.then((document) =>{
		const data = JSON.stringify(document)
		res.send(data)
	})
})

app.post('/registration', imgHandler.single('file'), async (req, res) => {
	if(!req.body.number == 0){
	var contact = new Contact({
		name : req.body.name,
		number : req.body.number,
		avatar : req.file.filename,
	}) 
	await contact.save().then((contact) =>{
		return res.status(201).json({'success' : true,'message' : 'Account created!', 'contact' : contact })
	}).catch(error => {
		return res.status(500).json({'success' : false , 'message' : error.message })
	})
} else {
	return res.json({'success' : false , 'message' : 'Phone number is required!'})
}
})

app.post('/login', (req, res) =>{
	if(!req.body.number == 0){
		Contact.findOne({ number : req.body.number }).then((contact) =>{
			if(!contact){
				return res.json({ 'success' : false, 'error' : true, 'message' : 'no contact with such number' })
			} else {
				const token = jwt.sign({ id : contact.id }, "secret", { expiresIn : 1000000 })
				return res.json({ 'success' : true , 'error' : false, 'token' : token })
			}
		})
	} else {
		return res.json({ 'success' : false, 'error' : true, 'message' : 'Phone number is required!' })
	}

})

app.post('/authenticate', async ( req, res) =>{
		const token = req.get("x-auth-token")
		console.log(token)
		if(!token){ 
			return res.status(401).json({ message : 'you are not authenticated' })
			} else {
				const verified = jwt.verify(token , "secret")
					if(!verified){ return res.json(false) }
				const contact = await Contact.findById(verified.id)
					if(!contact){ return res.json(false) }
				console.log(contact)	
				return res.json({ user : contact })	
		}	
})
