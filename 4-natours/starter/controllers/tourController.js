const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
const Tour = require('../models/tourModel');

exports.checkID = (req, res, next, val) => {
  const tour = tours.find((item) => item.id === +val);
  if (!tour) {
    return res.status(404).json({
      status: 'error',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  //   console.log('tours :>> ', tours);
  res.json({ status: 'success', results: tours.length, data: { tours } });
};

exports.addTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = {
    id: newId,
    ...req.body,
  };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  //   res.send('OK');
};

exports.getTour = (req, res) => {
  // console.log('req.params :>> ', req.params);
  const results = tours.find((item) => item.id === +req.params.id);

  res.json({
    status: 'success',
    results: tours.length,
    data: { tours: results },
  });
};

exports.updateTour = (req, res) => {
  res.json({
    status: 'success',
    message: 'Updated',
  });
};

exports.deleteTour = (req, res) => {
  res.json({
    status: 'success',
    message: 'Deleted',
  });
};
