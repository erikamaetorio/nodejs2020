"use strict"
const express = require("express");
let router = express.Router();

const queens = [
  {id: 1, name: 'Gigi Goode'},
  {id: 2, name: 'Crystal Methyd'},
  {id: 3, name: 'Aquaria'}
];

router.use(function (req, res, next) {
  console.log(req.url, "@", Date.now());
  next();
});

router
  .route('/listQueens')
  .get((req, res) => {
    res.send(queens);
  })
  .post((req, res) => { //ADD
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

router
  .route('/:id')
  .get((req, res) => {
    let queen = queens.find(q => q.id === parseInt(req.params.id));
    if(!queen) {
      res.status(404).send('Queen not found');
    }

    res.send(queen);
  })
  .put((req, res) => { //UPDATE
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
  })
  .delete((req, res) => { //DELETE
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

module.exports = router;