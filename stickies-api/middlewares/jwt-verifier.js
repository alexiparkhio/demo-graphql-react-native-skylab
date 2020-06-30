const jwt = require('jsonwebtoken');
const { env: { SECRET } } = process;

module.exports = (req, _, next) => {
    const { headers: { authorization } } = req;
    if (!authorization) return next();

    const [, token] = authorization.split(' ');
    if (!token) throw new Error(`no token provided`);

    const { sub: id } = jwt.verify(token, SECRET);

    req.tokenId = id;

    next();
}