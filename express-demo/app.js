const Joi = require('joi'); //returns an Object
const express = require('express');
const app = express();
const rQueens = require('./routes/queens');

app.use(express.json()); //middleware for processing requests
app.use("/queens", rQueens);

//RETRIEVE
app.get('/', (req, res) => {
  res.send('Hello World');
});

//functions
function validateQueen(queen) {
  const schema = Joi.object({ //joi version 16
    name: Joi.string().min(2).required()
  });

  return schema.validate(queen); 
}

//ENVIRONMENT VARIABLES
//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));