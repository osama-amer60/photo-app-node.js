const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

app.use(express.json());
app.use("/photos", require("./apis/photo.api"));
app.use('/users', require('./apis/user.api'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

mongoose.connect("mongodb://localhost:27017/photo-app")  
    .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
