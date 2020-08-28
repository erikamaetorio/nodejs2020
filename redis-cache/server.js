const express = require('express');
const fetch = require('node-fetch'); //for github api
const redis = require('redis');
const app = express();

app.use(express.json());

app.get("/repos/:username", cache, getRepos);

//display template
function setResponse(username, repos) {
  return `<h2>${username} has ${repos} Github repos`;
}

//get data from github api
async function getRepos(req, res, next) {
  try {
    console.log('Fetching Data');
    const { username } = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`);

    const data = await response.json();

    const repos = data.public_repos;

    //set data or saves data to redis
    //setex(key, seconds, value)
    client.setex(username, 3600, repos);

    res.send(setResponse(username, repos));

  } catch(err) {
    console.error(err);
    res.status(500);
  }
}

//cache middleware using redis
function cache(req, res, next) {
  const { username } = req.params;

  client.get(username, (err, data) => {
    if(err) throw err;

    if(data !== null) {
      res.send(setResponse(username, data)); //gets data from redis cache
    } else {
      next(); //calls getRepos
    }
  });
}

const port = process.env.PORT || 3000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);
app.listen(port, () => console.log(`Listening to port ${port}...`));