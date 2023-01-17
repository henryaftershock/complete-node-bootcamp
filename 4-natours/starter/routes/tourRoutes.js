const express = require('express');
const {
  getAllTours,
  addTour,
  getTour,
  updateTour,
  deleteTour,
  getTourStats,
  monthlyPlan,
} = require('../controllers/tourController');

const router = express.Router();

router.route('/').get(getAllTours).post(addTour);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(monthlyPlan);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
