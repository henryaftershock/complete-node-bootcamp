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
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.route('/').get(protect, getAllTours).post(addTour);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(monthlyPlan);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
