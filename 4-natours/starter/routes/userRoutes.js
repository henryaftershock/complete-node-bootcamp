const express = require('express');
const {
  getAllUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require('../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/forgotPassword', forgotPassword);

router.post('/resetPassword/:resetToken', resetPassword);

router.patch('/updatePassword', protect, updatePassword);

router.patch('/updateMe', protect, updateMe);

router.delete('/deleteMe', protect, deleteMe);

router.get('/', getAllUsers).post('/', addUser);

router
  .get('/:id', getUser)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser);

module.exports = router;
