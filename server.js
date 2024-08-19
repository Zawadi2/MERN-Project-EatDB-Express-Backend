const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

const PORT = process.env.PORT || 3000

const signinJWTRouter = require('./controllers/signin-jwt');
const userRouter = require('./controllers/users')
const profilesRouter = require('./controllers/profiles');
const restaurantRouter = require('./controllers/restaurants');
const foodRouter = require('./controllers/foods');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(cors())

// Routes go here
app.use('/signin-jwt', signinJWTRouter);
app.use('/users', userRouter)
app.use('/profiles', profilesRouter);
app.use('/restaurants', restaurantRouter);
// app.use('/restaurants/:restaurantId/foods', foodRouter);



app.listen(PORT, () => {
  console.log('The express app is ready!');
});
