const mongoose = require('mongoose')

const Schema = mongoose.Schema

var connectionSchema = new Schema({
	number : { 
		type : String, require : true
	},
	socketId : { 
		type : String, require : true
	 }
})

module.exports = mongoose.model('Connection', connectionSchema)