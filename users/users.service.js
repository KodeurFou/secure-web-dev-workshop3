// This file holds the Business-Logic layer, interacting with Data Layer

const Users = require('./users.model')

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


async function Register (body)
{
	let res = true
	const newUser = new Users(body)
	const test = await Users.findOne({username:newUser.username})
	if (test)
	{
		res = false
	}
	else{
		await newUser.save()
		return newUser
	}
	console.log(test)
	return res
}


async function TestMDP (username, password)
{
	let res = false

	const test = await Users.findOne({username:username})
	if (test) {

		const test2 = await bcrypt.compare(password, test.password)
		if(test2){
			res = true
		}
	}

	return res
}


async function generateJWT(username) {
	return jwt.sign({sub:username}, process.env.JWT_SECRET);
}


function findAll () {
	return Location.find({}).limit(10).lean()

}


function findUser(id){
	return Users.findById(id)
}

async function Create(body){
	const location = new Users(body)
	await location.save()
	return location
}

async function eraseOne(id){
	await Location.deleteOne({_id : id})
	return "erased !"
}

async function Patch(id, body){
	await Users.deleteOne({_id : id})
	await Register(body)

	return Users.findOne({username:body.username})
}

module.exports.findAll = findAll
module.exports.findUser = findUser
module.exports.eraseOne = eraseOne
module.exports.Create = Create
module.exports.Patch = Patch
module.exports.Register = Register
module.exports.TestMDP = TestMDP
module.exports.generateJWT = generateJWT