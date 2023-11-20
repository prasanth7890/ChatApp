const express = require("express");
const UploadMiddleware = require('../midddlewares/UploadMiddleware');
const protect = require("../midddlewares/authMiddleware");
const {registerUser, authUser, allUsers} = require('../controller/userControllers');

const router = express.Router();

router.route('/').post(UploadMiddleware.single('picture'),registerUser).get(protect, allUsers);
router.route('/login').post(authUser);

module.exports = router;