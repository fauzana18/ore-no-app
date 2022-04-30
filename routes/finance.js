const express = require('express')
const router = express.Router()
const finance = require('../controllers/finance')

/* GET home page. */
router
  .route('/category')
  .get(finance.findAllCategory)
  .post(finance.createCategory)

router
  .route('/category/:id')
  .patch(finance.updateCategory)
  .delete(finance.deleteCategory)

router
  .route('/profile')
  .get(finance.findAllProfile)
  .post(finance.createProfile)

router
  .route('/profile/:id')
  .patch(finance.updateProfile)
  .delete(finance.deleteProfile)

router
  .route('/transaction')
  .get(finance.findAllTransaction)
  .post(finance.createTransaction)

router
  .route('/transaction/:id')
  .get(finance.findOneTransaction)
  .patch(finance.updateTransaction)
  .delete(finance.deleteTransaction)

router.post('/importtransaction', finance.createBulkTransaction)
router.get('/saldo', finance.getSaldo)
router.get('/saldoall', finance.getSaldoTotal)

module.exports = router
