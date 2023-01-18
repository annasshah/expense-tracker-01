const express = require('express')
const { add_category, get_category } = require('../controllers/category_controller')
const { admin_signUp, admin_login } = require('../controllers/admin_auth')
const { record_assets, update_user_assets, get_user_assets } = require('../controllers/assets_record')
const {signUp, login, fetch_user_details, logout_user} = require('../controllers/user_auth')
const {check_admin_auth} = require('../middlewares/check_admin_auth')
const {check_user_auth} = require('../middlewares/check_user_auth')
const { new_transaction, get_all_transactions, edit_transaction, delete_transaction } = require('../controllers/transaction_record_controller')
const router = express.Router()

// Admin - Basic Authentication Routes
router.post('/admin/signup', admin_signUp)
router.post('/admin/login', admin_login)

// Admin - Category Routes
router.post('/admin/category',check_admin_auth, add_category)
router.get('/admin/category',check_admin_auth, get_category)


// User - Basic Authentication Routes 
router.post('/user/signup', signUp)
router.post('/user/login', login)
router.get('/user/check-auth',check_user_auth, fetch_user_details )
router.post('/user/logout',check_user_auth, logout_user )

// User - Record Assets Routes
router.get('/user/assets',check_user_auth, get_user_assets )
router.post('/user/assets',check_user_auth, record_assets )
router.put('/user/assets',check_user_auth, update_user_assets )

// User - Category Routes
router.post('/user/category',check_user_auth, add_category )
router.get('/user/category',check_user_auth, get_category )

// User - Transaction Routes
router.post('/user/transaction',check_user_auth, new_transaction)
router.get('/user/transaction',check_user_auth, get_all_transactions)
router.put('/user/transaction/:id',check_user_auth, edit_transaction)
router.delete('/user/transaction/:id',check_user_auth, delete_transaction)






module.exports = router