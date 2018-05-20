const express = require('express');
const app = express();
const port = process.env.PORT || '3000';
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
const User = require('./app/models/user');

//connection configuration
mongoose.connect("mongodb://localhost/tutorial", (err) => {
  if(err){
    console.log(err);
  } else {
    console.log("Connection to MongoDB successful.");
  }
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/users", (req, res) => {
  let user = new User(req.body);
  user.password = bcrypt.hashSync(user.password, 14);
  user.save((err) => {
    if(err){
      res.send(err);
    } else {
      res.send("User Saved!");
    }
  });
});

app.listen(port,() => console.log(`listening on http://localhost:${port}`));
