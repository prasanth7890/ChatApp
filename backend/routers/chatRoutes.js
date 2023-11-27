const express = require('express');
const {accessChat, fetchChats, createGroupChat,renameGroup, addToGroup,removeFromGroup} = require('../controller/chatControllers');
const protect = require('../midddlewares/authMiddleware');

const router = express.Router();

router.route('/').post(protect, accessChat);         // to access the logged in chat           
router.route('/').get(protect, fetchChats);          // to fetch the all the chat for particular user
router.route('/group').post(protect, createGroupChat); //for creating group chat
router.route('/rename').put(protect, renameGroup);      // renaming the grp
router.route('/groupremove').put(protect, removeFromGroup); // removing to the group
router.route('/groupadd').put(protect, addToGroup);         // add to the group

module.exports = router;