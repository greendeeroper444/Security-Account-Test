const express = require('express')
const { createList, getList, updateList, getUpdateList, deleteList, searchLists } = require('../controllers/listController')

const router = express.Router()

router.post('/create-list', createList);
router.get('/home', getList);
router.put('/update-list/:userId/:listId', updateList);
router.get('/home-update-list/:userId/:listId', getUpdateList);
router.delete('/delete-list/:userId/:listId', deleteList);
router.get('/search', searchLists);

module.exports = router