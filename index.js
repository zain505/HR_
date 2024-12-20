const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors')

const userRoutes = require('./routes/user')
const candidateRoutes = require('./routes/candidate')
const dashboardRoutes = require('./routes/dashboard')
const employeeRoutes = require('./routes/employee')
const offerletterRoutes = require('./routes/offerLetter')
const preArrivalRoutes = require('./routes/preArrivalChecks')
const postArrivalRoutes = require('./routes/postArrivalChecks')
const workingHoursRoutes = require('./routes/workingHours')
const leaveRoutes = require('./routes/leaveApplication')


const app = express();

app.use(cors())

app.use(bodyParser.json({ limit: '50mb' }));

// app.use('/api/places', placesRoutes); // => /api/places...
app.use('/api/users', userRoutes);

app.use('/api/candidate', candidateRoutes);

app.use('/api/dashboard', dashboardRoutes);

app.use('/api/employee', employeeRoutes);

app.use('/api/offerLetter', offerletterRoutes)

app.use('/api/preArrival', preArrivalRoutes)

app.use('/api/postArrival', postArrivalRoutes)

app.use('/api/workingHour', workingHoursRoutes)

app.use('/api/Leave', leaveRoutes)

app.use('/', (req, res, next) => {

  res.json({ message: "server is listning  at 5000" });
});


app.use((req, res, next) => {
  //   const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error occurred!' });
});
(async function () {
  try {
    mongoose
      .connect('mongodb+srv://zainrehman155:mongodb123@cluster0.eelskns.mongodb.net/HR').then((res) => {
        app.listen(5000);
        console.log("database connected");
      })
      .catch(err => console.log(err))
  } catch (error) {
    console.log("database not connected connected");
  }
})()



