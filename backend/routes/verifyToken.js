var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
	var token = req.headers['token'];
	if (!token) {
		return res.status(403).send({ auth: false, message: 'No token provided.' });
	}
	else {
		jwt.verify(token, 'Badshah', function (err, decoded) {
			if (err)
				return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
			// if everything good, save to request for use in other routes
			req.user_id = decoded.id;
			req.user_role = decoded.role;
			if (decoded.role == 'student') {
				req.user_discipline = decoded.discipline;
				req.user_session = decoded.session;
			}
			next();
		});
	}
}

module.exports = verifyToken;