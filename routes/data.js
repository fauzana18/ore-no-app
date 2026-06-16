const express = require('express')
const router = express.Router()
const data = require('../controllers/data')

router
  .route('/vault')
  .get(data.findAllVault)
  .post(data.createVault)

router
  .route('/vault/:id')
  .get(data.getVaultHistory)
  .patch(data.updateVault)
  .delete(data.deleteVault)

module.exports = router