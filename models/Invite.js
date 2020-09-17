const mongoose = require('mongoose')
const Schema = mongoose.Schema

var inviteSchema = new Schema({
	from : { type : String },
	to : { type : String },
})
module.exports = mongoose.model('Invite', inviteSchema)