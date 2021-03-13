const userService = require('../service/userService');

const { passwordHasher } = require('../helpers');

module.exports = {
    getAllUsers: async (req, res) => {
        try {

            const users = await userService.findUsers(req.query);

            res.json(users);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await userService.findUserById(userId);

        console.log(user);

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

            res.status(201).json('User is created');
        } catch (e) {
            res.json(e.message)
        }
    },

    deleteUser: (req, res) => {
        try {
            const { userId } = req.params;

            res.json(`${userId} is deleted`);
        } catch (e) {
            res.json(e.message);
        }
    },
};
