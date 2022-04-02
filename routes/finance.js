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


module.exports = router
