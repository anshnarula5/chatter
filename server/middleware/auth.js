const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token")
    if (!token) {
        res.status(401).json({msg : "Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token, "secret")
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({msg : "token invalid"})
    }
}