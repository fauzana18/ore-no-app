const express = require('express')
const router = express.Router()
const workout = require('../controllers/workout')

router
  .route('/workingout')
  .get(workout.findAll)
  .post(workout.create)

router
  .route('/workingout/:id')
  .patch(workout.update)

router.post('/deleteoneday', workout.delete)

module.exports = router