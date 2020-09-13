const mongoose = require('mongoose')

const Schema = mongoose.Schema

var messageSchema = new Schema({
	msg : {
		type : String, require : false
	},
	from : {
		type : String, require : true
	},
	to : { 
		type : String, require : true
	},
	seen : {
		type : Boolean , default : false
	},
	date : { 
		type : Date 
	},
})
module.exports = mongoose.model('Message' , messageSchema)