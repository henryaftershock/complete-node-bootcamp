const express = require('express');
const {
  getAllUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers).post('/', addUser);

router
  .get('/:id', getUser)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser);

module.exports = router;
