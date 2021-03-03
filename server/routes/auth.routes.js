const Router = require('express')
const User = require('../models/User')
const FileService = require('../services/fileService')
const File = require('../models/File')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const JWT = require('jsonwebtoken')
const config = require('config')
const router = new Router()
const authMiddleware = require('../middlewares/auth.middleware')
const AuthController = require('../controllers/authController')


router.post('/registration',
  [
    check('email', 'This must be valid Email').isEmail(),
    check('password', 'Password must be 3 min and 12 max symbols').isLength({min: 3, max: 12})
  ], AuthController.registerUser)

router.post('/login', AuthController.loginUser)
router.get('/authorization', authMiddleware, AuthController.authorizationUser)

module.exports = router
