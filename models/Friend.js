const mongoose = require('mongoose')
const Schema = mongoose.Schema

const friendSchema = new Schema({
	id : {
		type : String
	},
	messages : []
})

module.exports = mongoose.model('Friend', friendSchema)