const express = require("express");
const UploadMiddleware = require('../midddlewares/UploadMiddleware');
const {registerUser, authUser} = require('../controller/userControllers');

const router = express.Router();

router.route('/').post(UploadMiddleware.single('picture'),registerUser);
router.route('/login').post(authUser);

module.exports = router;