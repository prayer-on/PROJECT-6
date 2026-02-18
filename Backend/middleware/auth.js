const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
try {
const token = req.headers.authorization.split(' ')[1];
const decodedToken = jwt.verify(token, 'jbc4kjb24bhviu45b4bibov');
const userId = decodedToken.userId;
req.auth = { userId };
if (req.auth.userId && req.auth.userId !== userId) {
    throw ('Not authorized!')
} else {
    next();
}
}
catch(error) { console.log(error);
    res.status(401).json({
        error: new Error('Invalid request!')
    });
};
};