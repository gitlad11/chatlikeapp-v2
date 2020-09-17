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
//const server = http.Server(app)
//const socketio = io(server)



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
			app.listen(PORT, console.log(`server is running on ${PORT}`))
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
const Friend = require('./models/Friend')
const Invite = require('./models/Invite')

//////////ROUTER/////////////////////////
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
	if(req.body.number !== 0){
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
					if(!contact){ return res.json(false) }
				//console.log(contact)	
				return res.json({ user : contact })	
		}	
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
	if(req.body.from !== req.body.to){
		const fid = req.body.from
		const tid = req.body.to
		try {
			Invite.findOne({ $or : [ {'from' : fid, 'to' : tid }, { 'from' : tid, 'to' : fid } ] }).then((err, invite) =>{

			if(err){ console.log('Invite error :' + err) }	
			
			if(!invite || invite == null){ 
			const invite = new Invite({ 'from' : fid, 'to' : tid }).save()

			const friendf = new Friend({ id : fid }).save().then((friendf) => {
				Contact.findOneAndUpdate({ "_id" : tid } , { $push : { "friends" : friendf }},
										(err,result) => { 
											if(err){ console.log(err) }
											console.log(result) 
										})
			})
			const friendt = new Friend({ id : tid }).save().then((friendt) => {
				Contact.findOneAndUpdate({ "_id" : fid }, { $push : { "friends" : friendt }},
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
	} else { return res.json({ 'success' : false, 'error' : true, 'message' : 'you can not add yourself' }) }
})


///////////////SOCKET////////////////////
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
//socketio.sockets.on('connection', (socket) =>{
	//console.log(socket['id'] + " has connected")
	//socket.on("toServer", (token) =>{
		//console.log(token)
		//if(!token){
			//socket.emit("authFailed", { data : false })
		//}
		//const verified = jwt.verify(token, 'secret') 
		//console.log(verified.id)
		//const contact = Contact.findById(verified.id).then((contact) =>{
			//socket.emit("toClient", contact )
		//}
			//)
	//})
	//socket.on('disconnect', (socket) =>{
		//console.log(socket['id'] + " disconnected")
	//})
//})