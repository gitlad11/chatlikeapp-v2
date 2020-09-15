const jwt = require('jsonwebtoken')

const Auth = (req, res, next) => {
	try {
		const token = req.header("x-auth-token")
		if(!token){
			return res.status(401).json({ message : "You are not authenticated"})
		}
		const verified = jwt.verify(token, "secret")
		if(!verified){
			return res.status(401).json({ message : "Your token is not valid" })
		}
		req.user = verified.id
		next() 
	} catch (error) {
		res.status(500).json({ error : error.message })
	}
}

module.exports = Auth;