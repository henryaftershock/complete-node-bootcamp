const fs = require('fs');
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  //   console.log('users :>> ', users);
  res.json({ status: 'success', results: users.length, data: { users } });
};

exports.addUser = (req, res) => {
  //   console.log(req.body);
  const newId = users[users.length - 1].id + 1;
  const newTour = {
    id: newId,
    ...req.body,
  };
  users.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
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

exports.getUser = (req, res) => {
  // console.log('req.params :>> ', req.params);
  const results = users.filter((item) => item._id === req.params.id);

  if (!results || results.length === 0) {
    return res.status(404).json({
      status: 'error',
      message: 'Invalid ID',
    });
  }

  res.json({
    status: 'success',
    results: users.length,
    data: { users: results },
  });
};

exports.updateUser = (req, res) => {
  const tour = users.find((item) => item.id === +req.params.id);
  if (!tour) {
    return res.status(404).json({
      status: 'error',
      message: 'Invalid ID',
    });
  }
  res.json({
    status: 'success',
    message: 'Updated',
  });
};

exports.deleteUser = (req, res) => {
  const tour = users.find((item) => item.id === +req.params.id);
  if (!tour) {
    return res.status(404).json({
      status: 'error',
      message: 'Invalid ID',
    });
  }
  res.json({
    status: 'success',
    message: 'Deleted',
  });
};
