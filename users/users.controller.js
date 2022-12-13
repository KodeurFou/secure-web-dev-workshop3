// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const userService = require('./users.service')
const passport = require("passport");
const authorization = require("../authorization/authorization_middleware")

require('../passport_Strategies/local.strategy');
require('../passport_Strategies/jwt.strategy');



router.get('/users', async (req, res) => {
	return res.status(200).send(await userService.findAll())
})


router.post('/users/register', async (req, res) => {
	console.log(req.body)
	const user = await userService.Register(req.body)

	if(user) {
		return res.status(200).send(user)
	}

	else{
		return res.status(400).send("username indisponible")
	}
})

/*
router.post('/users/login', async (req, res) => {
	console.log(req.body)
	const test = await userService.Login(req.body)
	if(test) {
		return res.status(200).send("succès !")
	}
	else {
		return res.status(400).send("échec !")
	}
})
*/


router.post('/users/login',
	passport.authenticate('local', {
		session: false,
	}),
	async (req, res) => {
		const id = req.user._id;
		const token = await userService.generateJWT(id);
		return res.status(200).send({token});
	});






router.get('/users/me',
	passport.authenticate('jwt', {
	session:false
	}),
	authorization.roleMiddleware(['admin']),
	async (req, res) => {
	return res.status(200).send(await userService.findUser(req.user._id))
})

router.patch('/users/me',
	passport.authenticate('jwt', {
		session:false
	}),
	async (req, res) => {
		return res.status(200).send(await userService.Patch(req.user._id, req.body))
	})




module.exports = router
