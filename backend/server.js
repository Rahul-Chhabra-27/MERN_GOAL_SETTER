const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const goalRoutes = require("./routes/goalRoutes");
require("colors");
const { errorHandler } = require("./middleware/errorHandler");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

// Goal Routes.....
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}`.white
      .underline
  )
);
