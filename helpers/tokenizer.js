const jwt = require('jsonwebtoken');

module.exports = () => {
    const access_token = jwt.sign({}, 'JWT_SECRET', {expiresIn: "2d"});
    const refresh_token = jwt.sign({}, 'JWT_REFRESH', {expiresIn: "30d"});

    return {
        access_token,
        refresh_token
    };
};
