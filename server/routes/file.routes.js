const Router = require('express')
const config = require('config')
const authMiddleware = require('../middlewares/auth.middleware')
const FileController = require('../controllers/fileController')
const router = new Router



router.post('', authMiddleware, FileController.createDir)
router.get('', authMiddleware, FileController.getFiles)





module.exports = router
