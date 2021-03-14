const userService = require('../service/userService');

const { passwordHasher } = require('../helpers');

const { errorMessage, errorCodeEnum } = require('../constants');


module.exports = {
    getAllUsers: async (req, res) => {
        try {

            const users = await userService.findUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(errorCodeEnum.NOT_FOUND).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await userService.findUserById(userId);

        console.log("****************************");
        console.log(user);
        console.log("****************************");

        res.json(user);
    } catch (e) {
        res.json(e.message);
    }
},

    createUser: async (req, res) => {
        try {
            const { password } = req.body;

            const hashPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            res.status(errorCodeEnum.USER_IS_CREATED).json(errorMessage.USER_CREATED);
        } catch (e) {
            res.json(e.message)
        }
    },

    deleteUser: (req, res) => {
        try {
            const { userId } = req.params;

            if (userId !== req.user.id) {
                throw new Error(errorCodeEnum.UNAUTHORIZED);
            }

            // userService.deleteUser(userId);
            res.json(`${userId} is deleted`);

            res.json(errorMessage.USER_IS_DELETED);
        } catch (e) {
            res.json(e.message);
        }
    },
};
