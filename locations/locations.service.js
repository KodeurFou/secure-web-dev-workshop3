// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return Location.find({}).limit(10).lean()

}

function FindOne (id){
	return Location.findById(id)
}

async function Create(body){
	const location = new Location(body)
	await location.save()
	return location
}

async function eraseOne(id){
	await Location.deleteOne({_id : id})
	return "erased !"
}

async function Patch(body){
	await Location.findByIdAndUpdate({_id : body}, body)
	return findOne(body._id)
}

module.exports.findAll = findAll
module.exports.FindOne = FindOne
module.exports.eraseOne = eraseOne
module.exports.Create = Create
module.exports.Patch = Patch