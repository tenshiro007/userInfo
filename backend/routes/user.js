const verifyForm=require('../middleware/verifyForm')
const auth=require('../middleware/auth')

const controller=require('../controllers/user')

const express=require('express')
const router=express.Router()
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
      },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() +'.jpg'
      cb(null, 'user' + '_' + uniqueSuffix)
    }
  })

const upload = multer({ storage: storage })

router.post('/register',[upload.single('image'),verifyForm.checkVerifyUser,verifyForm.checkDuplicateUser],controller.signup)
router.post('/login',verifyForm.checkVerifyLogin,controller.login)
router.get('/',auth,controller.getUser)
// router.put('/',[auth,verifyForm.checkUpdate],controller.updataUser)
// router.post('/image',[upload.single('image'),auth],controller.updateImageUser)
router.put('/update',[upload.single('image'),auth,verifyForm.checkUpdate],controller.updateUser2)

module.exports=router
