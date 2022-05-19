const express = require('express')
const router = express.Router()
const workout = require('../controllers/workout')

router
  .route('/workingout')
  .get(workout.findAll)
  .post(workout.create)
//   .delete(workout.delete)

router
  .route('/workingout/:id')
  .patch(workout.update)

module.exports = router