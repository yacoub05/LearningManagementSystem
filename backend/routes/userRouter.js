const router = require('express').Router()
const UserController = require('../controller/UserController')
const {protect} = require('../middleware/auth')

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.post('/forgotpassword', UserController.forgotPassword)

router.put('/resetpassword/:resetToken', UserController.resetPassword)

router.get('/logout', UserController.logout)

router.get('/refresh_token', UserController.refreshToken)

router.get('/userinfo', protect,  UserController.getUser)

router.patch('/addassignments', protect, UserController.addAssignment)

router.get('/history', protect, UserController.history)


module.exports = router