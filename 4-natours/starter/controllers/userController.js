const fs = require('fs');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.getAllUsers = catchAsync(async (req, res) => {
  // const features = new APIFeatures(User.find(), req.query);
  // .filter()
  // .limitFields()
  // .paginate()
  // .sort();
  const allUsers = await User.find();

  res.json({ status: 'success', results: allUsers.length, data: allUsers });
});

exports.addUser = (req, res) => {
  res.status(201).json({
    status: 'success',
  });
};

exports.getUser = (req, res) => {
  res.json({
    status: 'success',
  });
};

exports.updateUser = (req, res) => {
  res.json({
    status: 'success',
    message: 'Updated',
  });
};

exports.deleteUser = (req, res) => {
  res.json({
    status: 'success',
    message: 'Deleted',
  });
};

const filterObj = (obj, allowedFields) => {
  let filteredObj = {};
  Object.keys(obj).map((key) => {
    if (allowedFields.includes(key)) {
      filteredObj = { ...filteredObj, [key]: obj[key] };
    }
  });
  return filteredObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('You can not update this fields.', 400));
  }

  // const { name, email } = req.body;

  const filteredObj = filterObj(req.body, ['name', 'email']);

  // console.log('filteredObj :>> ', filteredObj);

  const user = await User.findByIdAndUpdate(req.user.id, filteredObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
