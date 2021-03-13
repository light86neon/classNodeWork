const router = require('express').Router();

const userController = require('../controller/userController');
const { userMiddlewares } = require('../middleware');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddlewares.checkIsIdValid, userController.getSingleUser)

router.post('/', userMiddlewares.isUserValid , userController.createUser);
module.exports = router ;
