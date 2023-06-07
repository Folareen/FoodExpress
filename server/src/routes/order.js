const {Router} = require('express')
const { getOrderHistory, order } = require('../controllers/order')

const router = Router()

router.get('/orders', getOrderHistory)
router.post('/orders', order)

module.exports = router