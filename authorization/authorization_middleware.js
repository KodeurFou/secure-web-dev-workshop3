function roleMiddleware (allowedRoles) {
    return function (req, res, next) {
        if (allowedRoles.includes(req.user?.role)) {
            console.log("c'est bon !")
            return next()
        }
        console.log("c'est pas bon !")
        return res.status(403).send()
    }
}

module.exports.roleMiddleware= roleMiddleware