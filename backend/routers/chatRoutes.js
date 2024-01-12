const express = require('express');
const {accessChat, fetchChats, createGroupChat,renameGroup, addToGroup,removeFromGroup} = require('../controller/chatControllers');
const protect = require('../midddlewares/authMiddleware');

const router = express.Router();
router.use(protect);

router.route('/').post(accessChat);         // to access the logged in chat           
router.route('/').get(fetchChats);          // to fetch the all the chat for particular user
router.route('/group').post(createGroupChat); //for creating group chat
router.route('/rename').put(renameGroup);      // renaming the grp
router.route('/groupremove').put(removeFromGroup); // removing to the group
router.route('/groupadd').put(addToGroup);         // add to the group

module.exports = router; 