const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	username: String,
	password: String
})

userSchema.pre('save', async function (next){
	try{
		const salt = await bcrypt.genSalt(10)
		const hashPassword = await bcrypt.hash(this.password, salt)
		this.password = hashPassword
		next()
	}catch (error){
		next(error)
	}
})

const Users = mongoose.model('Users', userSchema)

module.exports = Users
