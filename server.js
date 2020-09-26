const http = require('http')
const express = require('express')
const io = require('socket.io')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const faker = require('faker')
const moment = require('moment')
const config = require('./config')


const app = express()
const server = http.Server(app)
const socketio = io(server)


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

const MongoURI = config.DB_URI
const PORT = process.env.PORT || 3004

mongoose.connect(MongoURI,
			{useNewUrlParser: true, useUnifiedTopology : true}, (error) =>{
			mongoose.Promise = global.Promise
			mongoose.connection.on('error', error => {
				console.log(`error with mongodb :` + error)
			})
			console.log('connected to collection ')
			server.listen(PORT, console.log(`server is running on ${PORT}`))
			})

app.use(cors({
	origin : "http://localhost:3000",
	credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(express.Router())
app.use(express.static(__dirname + '/avatars'))
app.use(express.static(__dirname + '/public'))

const Contact = require('./models/Contact')
const Message = require('./models/Message')
const Friend = require('./models/Friend')
const Invite = require('./models/Invite')

//////////ROUTER/////////////////////////
app.get('/', (req, res) => {
	res.send('Welcome to chat api!')
})


app.post('/registration', imgHandler.single('file'), async (req, res) => {
	if(req.body.number.length !== 0){
	await Contact.findOne({ number : req.body.number }).then((contact) => {
	if(!contact || contact == null){

	if(req.file){	
		var contact = new Contact({
			name : req.body.name,
			number : req.body.number,
			avatar : req.file.filename,
			}) 
	} else {
		var contact = new Contact({
			name : req.body.name,
			number : req.body.number,
		})
	}
	    contact.save().then((contact) =>{
		return res.status(201).json({'success' : true,'message' : 'Account created!', 'contact' : contact })
		}).catch(error => {
		return res.status(500).json({'success' : false , 'message' : error.message })
		})

	} else { return res.json({ 'success' : false , 'message' : "Such contact alredy exists!" }) }
})	
} else {
	return res.json({'success' : false , 'message' : 'Phone number is required!'})
	}
})

app.post('/login', (req, res) =>{
	if(req.body.number !== 0){
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
		if(!token){ 
			return res.status(401).json({ message : 'you are not authenticated' })
			} else {
				const verified = jwt.verify(token , "secret")
					if(!verified){ return res.json(false) }
				const contact = await Contact.findById(verified.id)
					if(!contact){ return res.json({user : {}}) }
				console.log(contact)	
				return res.json({ user : contact })	
		}	
})

app.post('/friends', async ( req, res) => {
	const friends = req.body
	Friend.find({'_id' : { $in : friends }}).then((friends) => {
		//console.log(friends)
		res.json(friends)
	})
})

app.post('/contacts', async (req, res) =>{
		if(req.body){
			const query = req.body.query
		if(query.length > 0 || query !== null){	
			Contact.find({ $or : [ {'number' : new RegExp(query) }, {'name' : new RegExp(query) }]
						}).then((result) =>{
				return res.json(result)
						})
	} else { return res.json([]) }
}	
})

app.put('/add', (req, res) =>{
	if(req.body.from.number !== req.body.to.number){
		const from = req.body.from
		const to = req.body.to
		const friendf = from.number + to.number
		const friendt = to.number + from.number
		try {
			Invite.find({ '_id' : { $in : [friendf, friendt] } }).then((invite) =>{
			
			if(invite.length === 0){ 
			const invite = new Invite({ '_id' : friendf }).save()

			const friendF = new Friend({ '_id' : friendf, contact : { 'name' : from.name, 'number' : from.number, 'avatar' : from.avatar } }).save().then((friendf) => {
				Contact.findOneAndUpdate({ "_id" : to._id } , { $push : { "friends" : friendf._id }},
										(err,result) => { 
											if(err){ console.log(err) }
	 											console.log(result)
										})
			})
			const friendT = new Friend({ '_id' : friendt, contact : { 'name' : to.name, 'number' : to.number, 'avatar' : to.avatar} }).save().then((friendt) => {
				Contact.findOneAndUpdate({ "_id" : from._id }, { $push : { "friends" : friendt._id }},
										(err, result) =>{
											if(err){ console.log(err) }
											console.log(result)	
										})
			}) 
			res.json({ 'success': true, 'error' : false, 'message' : 'added' })
			} else { res.json({ 'success' : false, 'error' : false, 'message' : 'added' }) } 
		})
			 
		} catch(error){ 
			console.log(error); return; 
			} 	
	} else { return res.json({ 'success' : false, 'error' : true, 'message' : 'it`s you!' }) }
})



///////////////SOCKET////////////////////

socketio.on('connection', (socket) =>{
	console.log(socket['id'] + " has connected")

	socket.on('messageSend', (data) => {
		console.log(data)
		const from = data.from
		const to = data.to
		const friendfrm = from.number + to.contact.number
		const friendto = to.contact.number + from.number
		const message = new Message({
			'msg' : data.message,
			'from' : from.number,
			'to' : to.contact.number,
			'date' : moment().format('M D h:mm ')
		}).save().then((message) => {
			Friend.find({ '_id' : { $in : [friendfrm, friendto] } }).then((friends) => {
				friends.forEach((friend) => friend.update({ $push : { 'messages' : message } }, (err, result) => { 
					if(err){
						console.log(err)
					}
					console.log(result) 
					}))
			})
		})	
	})
	socket.on('messageSeen', (data) => {
		const friendfrm = data.from + data.to
		const friendto = data.to + data.from
		Friend.update({ '_id' : { $in : [ friendfrm, friendto ] }}, { $set : { "messages.$[].seen" : true }}, { multi : true }).then((result) => {
			socketio.emit('seen')
		})
	})

	socket.on('getDialog', (data) => {
		Friend.find({'_id' : { $in : data.contacts }}).then((friends) => {
		socketio.emit('dialogs',  friends)
	})
})
	socket.on('disconnect', (socket) =>{
		console.log("disconnect")
	})
})



//socketio.use(function(socket, next){
	//if (socket.handshake.query && socket.handshake.query.token){
		//jwt.verify(socket.handshake.query.token, 'secret',(error)=>{
			//if (error) return (new Error('Authentication error'))
			//socket.decoded = decoded
			//next()	
		//})
	//} else { next(new Error('Authentication failed!')) }
//})
//.on('connection', (socket) => {
	//console.log(socket['id'] + ' has connected!')

//})
