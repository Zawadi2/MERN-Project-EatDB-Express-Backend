const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userRouter = require('./controllers/users')
const restaurantRouter = require('./controllers/restaurants');
const foodRouter = require('./controllers/foods');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Routes go here
app.use(express.json());
app.use('/users', userRouter)
app.use('/restaurants', restaurantRouter);
app.use('/foods', foodRouter);


app.listen(3000, () => {
  console.log('The express app is ready!');
});
