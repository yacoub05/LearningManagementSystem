const router = require('express').Router()
const AssignmentController = require('../controller/AssignmentController')
const auth = require('../authentication/auth')
const {protect} = require('../middleware/auth')

router.post('/create-assignment', AssignmentController.createAssignment)
router.post('/:_id', AssignmentController.addQuestion)

router.get('/', protect, AssignmentController.getAllAssignments)
router.get('/:_id', AssignmentController.getAssignmentById)

router.patch('/update/:_id', protect, AssignmentController.updateAssignment)


// router.get('/:_id', protect, AssignmentController.getAssignmentById)

router.delete('/:id',protect, AssignmentController.deleteAssignment)
router.delete('/',protect, AssignmentController.deleteAssignments)
// router.get('/srefresh_token', AssignmentController.refreshToken)

// router.get('/infor', auth,  AssignmentController.getUser)

// router.patch('/update-assignment', auth, AssignmentController.addAssignment)

// router.get('/history', auth, AssignmentController.history)


module.exports = router