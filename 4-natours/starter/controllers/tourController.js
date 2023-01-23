const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllTours = catchAsync(async (req, res, next) => {
  // const includedFields = Object.keys(Tour.schema.obj);

  // console.log('queryObj :>> ', queryObj);
  // console.log('includedFields :>> ', includedFields);
  // const acceptedQueryObj = Object.fromEntries(
  //   Object.entries(queryObj).filter(([key]) => includedFields.includes(key))
  // );

  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .limitFields()
    .paginate()
    .sort();
  const allTours = await features.query;

  res.json({ status: 'success', results: allTours.length, data: allTours });
});

exports.addTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID.', 404));
  }

  res.json({
    status: 'success',
    data: { tour },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError('No tour found with that ID.', 404));
  }

  res.json({
    status: 'success',
    data: { tour },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID.', 404));
  }

  res.json({
    status: 'success',
    data: null,
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: { $gte: 4.5 },
      },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
      },
    },
    {
      $sort: {
        numTours: 1,
      },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } },
    // },
  ]);
  res.json({
    status: 'success',
    data: { stats },
  });
});

exports.monthlyPlan = catchAsync(async (req, res, next) => {
  const year = +req.params.year;

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTours: { $sum: 1 },
        tours: {
          $push: '$name',
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $addFields: {
        month: '$_id',
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  res.json({
    status: 'success',
    results: plan.length,
    data: { plan },
  });
});
