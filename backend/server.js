const express = require('express');
const dotenv = require('dotenv');
const goalRoutes = require('./routes/goalRoutes');
require('colors');
const { errorHandler } = require('./middleware/errorHandler');
const { connectDB } = require('./config/db');

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Goal Routes.....
app.use('/api/goals',goalRoutes);
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port,() => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`.white.underline))
