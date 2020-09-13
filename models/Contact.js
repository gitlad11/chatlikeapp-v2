const mongoose = require('mongoose')

const Schema = mongoose.Schema

var contactSchema = new Schema({
	name : {
		type : String, require: false, maxLength: 40
	},
	number : {
		type : String, require: true
	},
	avatar : {
		type : String
	},
	online : { 
		type : Boolean, default:false
	},
	friends : [{
			id : {type : String}, messages : [] 
		}]
})

module.exports = mongoose.model('Contact', contactSchema)