require('dotenv').config();
const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json()); //middleware

const posts = [{
    username: 'thegigigoode',
    title: 'Post 1'
  },
  {
    username: 'crystalmethyd',
    title: 'Post 2'
  }
];

app.get('/posts', authenticateToken, (req, res) => { //after validating token, access is given for posts
  res.json(posts.filter(post => post.username === req.user.name));
});

app.post('/login', (req, res) => { //generates a token for access
  //authenticate user
  const username = req.body.username;
  const user = {
    name: username
  };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
  res.json({
    accessToken: accessToken
  });
});

function authenticateToken(req, res, next) { //validates token generated
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(token == null) {
    return res.sendStatus(401); //no access
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403); //invalid token
    req.user = user;
    next();
  })
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));