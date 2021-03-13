const User = require('../dataBase/models/User');
const { createUser } = require("../controller/userController");

// require('../dataBase/models/Car');

module.exports = {
    findUsers: (filterObject) => User.find(filterObject),

    findUserById: (userId) => User.findById(userId),

    createUser: (userObject) => User.create(userObject)
};
