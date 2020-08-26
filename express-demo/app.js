const Joi = require('joi'); //returns an Object
const express = require('express');
const app = express();

app.use(express.json()); //middleware for processing requests

const queens = [
  {id: 1, name: 'Gigi Goode'},
  {id: 2, name: 'Crystal Methyd'},
  {id: 3, name: 'Aquaria'}
];

//RETRIEVE
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/queens', (req, res) => {
  res.send(queens);
});

app.get('/api/queens/:id', (req, res) => {
  let queen = queens.find(q => q.id === parseInt(req.params.id));
  if(!queen) {
    res.status(404).send('Queen not found');
  }

  res.send(queen);
});

//ADD
app.post('/api/queens', (req, res) => {
  const { error } = validateQueen(req.body);

  if(error) {
    res.send(400).send(error.details[0].message);
    return; //so that the rest of this block of code will not be executed
  }

  // if(!req.body.name || req.body.name.length < 2) {
  //   res.send(400).send('Invalid input!');
  //   return; //so that the rest of this block of code will not be executed
  // }

  const queen = {
    id: queens.length + 1,
    name: req.body.name
  }
  queens.push(queen);
  res.send(queen);
});

//UPDATE
app.put('/api/queens/:id', (req, res) => {
  //look up
  let queen = queens.find(q => q.id === parseInt(req.params.id));
  if(!queen) {
    return res.status(404).send('Queen not found');
  }

  //validate
  //const result = validateQueen(req.body);
  const { error } = validateQueen(req.body);

  if(error) {
    res.send(400).send(error.details[0].message);
    return; //so that the rest of this block of code will not be executed
  }

  //update queen
  queen.name = req.body.name;
  res.send(queen);
});

//DELETE
app.delete('/api/queens/:id', (req, res) => {
  //look up
  let queen = queens.find(q => q.id === parseInt(req.params.id));
  if(!queen) {
    return res.status(404).send('Queen not found');
  }

  //delete
  let index = queens.indexOf(queen);
  queens.splice(index, 1);

  res.send(queen);
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