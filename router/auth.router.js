const router = require('express').Router();

const {errorMessageEnum} = require('../constants');
const User = require('../dataBase/models/User');
const {passwordHasher} = require('../helpers');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error(errorMessageEnum.NO_USER);
    }

    await passwordHasher.compare(password, user.password);

    res.json(errorMessageEnum.AUTH_IS_SUCCESS);
});

module.exports = router;
