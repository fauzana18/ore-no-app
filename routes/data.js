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


router
  .route('/notes')
  .get(data.findAllNotes)
  .post(data.createNotes)

router
  .route('/notes/:id')
  .patch(data.updateNotes)
  .delete(data.deleteNotes)
module.exports = router