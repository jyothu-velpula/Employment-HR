const  express  = require('express')
const router = express.Router()
const user = require('../controllers/user.controller')

router.post('/Register/User',user.RegisterUser);
router.post('/Login/User',user.LoginUser);

module.exports = router

