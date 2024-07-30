const express = require('express')
const GroupController = require('../controllers/GroupController')

const router = express.Router()

router.post('/', GroupController.createGroup)
router.get('/', GroupController.getGroups)
router.get('/:id', GroupController.getGroupById)
router.put('/:id', GroupController.updateGroup)
router.delete('/:id', GroupController.deleteGroup)
router.post('/:id/members', GroupController.addMember)
router.delete('/:groupId/members/:memberId', GroupController.removeMember)

module.exports = router
