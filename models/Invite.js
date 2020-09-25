const mongoose = require('mongoose')
const Schema = mongoose.Schema

var inviteSchema = new Schema({
	_id : { type : String }
})
module.exports = mongoose.model('Invite', inviteSchema)