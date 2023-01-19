const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../users/users.model');
const usersService = require('../users/users.service');

passport.use(new Strategy(
    function (username, password, done) {
        User.findOne({ username }, async function (err, user) {
            if (err)    return done(err)
            if (!user)  {
                console.log("username non enregistré");
                return done(null, false);
            }
            if (!await usersService.TestMDP(username, password)){
                console.log("mauvais mdp");
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

module.exports = passport