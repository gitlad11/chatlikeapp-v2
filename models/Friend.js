const mongoose = require('mongoose')
const Schema = mongoose.Schema

const friendSchema = new Schema({
	_id : {type : String},
	contact : {
		name : {type : String},
		number : {type : String},
		avatar : { type : String},
	}, 
	messages : []
})

module.exports = mongoose.model('Friend', friendSchema)