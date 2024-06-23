const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');

const userRoutes = require('./routes/user')

const app = express();

app.use(bodyParser.json({limit: '50mb'}));

// app.use('/api/places', placesRoutes); // => /api/places...
app.use('/api/users', userRoutes);
app.use('/', (req,res,next)=>{
  res.json({message:"server is listning  at 5000"});
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
  res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose
.connect('mongodb+srv://zainrehman155:mongodb123@cluster0.eelskns.mongodb.net/HR',{useNewUrlParser: true})
.then((res)=>{
  app.listen(5000);
  console.log("database connected");
})
.catch(err=>console.log(err))
