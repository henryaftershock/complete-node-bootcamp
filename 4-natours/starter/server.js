const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

const port = process.env.PORT || 3000;

const DB = process.env.DATABASE;

mongoose.set('strictQuery', false);

mongoose.connect(DB).then((con) => {
  //   console.log('con :>> ', con);S
  console.log('DB connected');
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
