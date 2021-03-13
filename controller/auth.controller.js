const { errorMessageEnum } = require('../constants');
const User = require('../dataBase/models/User');
const { passwordHasher, tokenizer } = require('../helpers');

module.exports = {
    authUser: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new Error(errorMessageEnum.NO_USER);
            }

            await passwordHasher.compare(password, user.password);

            const tokens = tokenizer();

            res.json(tokens);
        } catch (e) {
            res.json(e.message);
        }
    }
};
