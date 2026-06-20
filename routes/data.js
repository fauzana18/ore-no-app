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
  // .get(data.findAllNotes)
  .post(data.createNotes)

router.get('/notes', async (req, res, next) => {
    res.set('Cache-Control', 'no-store')

    data.findAllNotes(req, res, next)
})

router
  .route('/notes/:id')
  .patch(data.updateNotes)
  .delete(data.deleteNotes)

router
  .route('/tasklist/:userid')
  .get(data.getTaskList)

router
  .route('/tasklist')
  .post(data.saveTaskList)
module.exports = router